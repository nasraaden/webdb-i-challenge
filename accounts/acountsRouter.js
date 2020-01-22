const express = require("express");

const Accounts = require("../accounts/accountsDb.js");

const router = express.Router();

// get
router.get("/", (req, res) => {
    Accounts.get()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "There was an error getting the accounts."})
        })
})

// get by id
router.get("/:id", (req, res) => {
    const id = req.params.id
    Accounts.getById(id)
    .then(account => {
        if (account.length !== 0) {
            res.status(200).json(account)
        } else {
            res.status(404).json({message: "The account with the specified ID does not exist." })
          }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The account information could not be retrieved." })
      })
})

// post
router.post("/", (req, res) => {
    const accountData = req.body;
    if (!accountData.name || !accountData.budget){
        res.status(400).json( { errorMessage: "Please provide name and budget for the account." })
    } else {
        Accounts.insert(accountData)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the account to the database." })
        })
    }
})

// put by id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const accountData = req.body;
    if (!accountData.name || !accountData.budget){
        res.status(400).json( { errorMessage: "Please provide name and budget for the account." })
    } else {
        Accounts.update(id, accountData)
        .then(updated => {
            if (updated){
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: "The account with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The account information could not be modified." })
        })
    }
})

// delete by id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Accounts.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: "The account with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The account could not be removed." })
    })
})


module.exports = router;
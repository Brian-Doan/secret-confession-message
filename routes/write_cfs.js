var express = require('express');
var router = express.Router();

var Confession = require('../models/confession')

/*
* GET write confession page 
*/
router.get('/', (req,res) => {
    var username = ""
    var confession = ""

    res.render('write_cfs', {
        username: username,
        confession: confession,
    })

})

/* 
* POST write confession page 
*/
router.post('/', (req,res) => {
    var username = req.body.username
    var userID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7) + username 
    var confession = req.body.confession
    
    //if (typeof req.session.cfs == "undefined") {
        req.session.cfs = []
        req.session.cfs.push({
            username: username,
            userID: userID,
            confession: confession
        })
    //}
    console.log(typeof req.session.cfs.confession)
    
    var cfs = new Confession({
        username: username,
        userID: userID,
        confession: confession,
    })

    cfs.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Data added successfully')
        }
    })

    res.redirect('/share/confession')

})

/*
* GET share page 
*/
/* router.get('/share', (req,res) => {
    var cfsContent = req.session.cfs
    console.log(cfsContent)
    
    res.render('share_cfs', {
        confession: cfsContent.confession
    })
}) */

module.exports = router
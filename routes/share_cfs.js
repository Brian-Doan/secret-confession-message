var express = require('express');
var router = express.Router();

var Confession = require('../models/confession')

/*
* GET share page 
*/
router.get('/confession', (req,res) => {
    /* var cfsContent = req.session.cfs
    console.log(cfsContent) */

    
    var cfsSession = req.session.cfs
    //console.log(typeof cfsSession.confession)

    Confession.findOne({userID : cfsSession.userID}, (err) => {
        if (err) {
            console.log(err)
            res.render('share_cfs', {
                confession: '',
                userID: ''
            })
        } else {
            res.render('share_cfs', {
                confession: cfsSession,
                userID: cfsSession.userID
            })
        }
    })
})

/*
* GET index page 
*/
router.get('/:userID', (req,res) => {
    /* var cfsContent = req.session.cfs
    console.log(cfsContent) */

    var cfsSession = req.session.cfs
    //console.log(typeof cfsSession.confession)

    var userIdParam = req.params.userID
    
    //if (cfsSession.userID == userIdParam) {
        Confession.findOne({userID : userIdParam}, (err,cfs) => {
            if (err) {
                console.log(err)
                res.render('index', {
                    confession: ''
                })
            } else {
                res.render('index', {
                    confession: cfs.confession
                })
            }
        })
    //}
})


module.exports = router
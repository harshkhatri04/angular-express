const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//retriving data
router.get('/contact', (req, res) => {
    Contact.find(function(err, contacts) {
        res.json(contacts);
    })
});

//add contact
router.post('/contact', (req, res) => {

var newContact = new Contact();
    newContact.firstname=req.body.firstname;
    newContact.lastname=req.body.lastname;
    newContact.phone=req.body.phone;

    newContact.save((err, contact) => {
        if (err) {
            
            res.send('fail to add');
        } else {
            res.json(contact);
        }    
   });
});

//delete contact
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function(err, contacts) {
        if (err) {
            res.json(err);
        } else {
            res.json(contacts);
        }
    });
});

router.put('/contact/:id',(req, res) =>{
    Contact.update({_id: req.params.id},
        {$set:
        {firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone}},
        {upsert:true},
         function(err,newcontacts){
        if (err) {
            res.json(err);
        } else {
            res.json(newcontacts);
        }
    })
})

module.exports = router;


const express = require('express');
const router = express.Router();

const Weather = require('../models/contacts');

//retriving data
router.get('/contact', (req, res) => {
    Weather.find(function(err, weather) {
        res.json(weather);
    })
});

//add contact
router.post('/contact', (req, res) => {

var weatherData = new Weather();
    weatherData.name=req.body.name;
    weatherData.date=req.body.date;
    weatherData.maxtemp=req.body.maxtemp;
    weatherData.mintemp=req.body.mintemp;

    weatherData.save((err, weather) => {
        /*if (err) {
            
            res.send('fail to add');
        } else*/ {
            res.json(weather);
        }    
   });
});

//delete contact
router.delete('/contact/:id', (req, res, next) => {
    Weather.remove({_id: req.params.id }, function(err, weather) {
       /* if (err) {
            res.json(err);
        } else*/ {
            res.json(weather);
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
        /*if (err) {
            res.json(err);
        } else*/ {
            res.json(newcontacts);
        }
    })
})

module.exports = router;


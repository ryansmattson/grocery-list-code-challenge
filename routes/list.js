var router = require('express').Router();
var Item = require('../models/groceryItems.js');
var mongoose = require('mongoose');


router.get('/getList', function(req, res) {
    console.log('getlist');

    Item.find({}, function(err, items) {
        if (err) {
            console.log('Failed to fetch grocery items.', err);
        } else {
            // console.log('Items fetched! ', items);
            res.send(items);
        }
    })
});



router.post('/addToList', function(req, res) {
    var data = req.body;

    var createdItem = new Item({
        name: data.name,
        qty: data.qty
    });

    createdItem.save(function(err) {
        if (err) {
            console.log('Save error! ', err);
            res.sendStatus(500);
        }
    })

    res.sendStatus(200);
});


router.put('/updateList', function(req, res) {
    console.log('updateList');

    var id = req.body._id;
    var name = req.body.name;
    var qty = req.body.qty;

    Item.findByIdAndUpdate(id, { $set: { name: name, qty: qty }}, function (err) {
      if (err) return handleError(err);
    });

});



router.delete('/removeFromList/:id', function(req, res) {
    console.log('removeFromList');
    var id = req.params.id;
    Item.findByIdAndRemove(id, function(err) {
        if (err) {
            console.log('Problem with deleting!', err);
            res.sendStatus(500);
        } else {
            console.log('Item deleted.');
            res.sendStatus(200);
        }
    })
});

module.exports = router;

var express = require('express');
var router = express.Router();

var activitiesV1 = require('./activities/v1');
var activitiesV2 = require('./activities/v2');

var hiddenActivities = [];

// GET ACTIVITIES V1
router.get('/activities/v1', function (req, res) {
  res.send(activitiesV1)
})

// GET ACTIVITIES V2
router.get('/activities/v2', function (req, res) {
  res.send(activitiesV2)
})

// GET HIDDEN ACTIVITIES
router.get('/activities/hidden', function (req, res) {
  res.send(hiddenActivities)
})

// DELETE ACTIVITIES 
router.delete('/activities/:id', function (req, res) {
  if( !hiddenActivities.includes(req.params.id) ){
    hiddenActivities.push(req.params.id);
  }
  console.log(hiddenActivities);
  res.send({code: 401, succsess: true})
})

module.exports = router;
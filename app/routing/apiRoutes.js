// var path = require('path')
var friends = require('../data/friends.js')

module.exports = function (app) {
  app.get('/api/friends', function(req,res) {
    res.json(friends)
  })

  app.post('/api/friends', function(req,res) {
    console.log('in post')
    friends.push(req.body)
    res.json(true)
    console.log('req.body ', req.body)
    var arrayed = req.body.scores
    console.log('arrayed ', arrayed)
    var winner = {
      totalDiff: 1000
    }
    friends.forEach(function(friend) {
      console.log('friend ', friend)
      var diffs = []
      var i = 0
      friend.scores.forEach(function(score) {
        console.log('score ', score)
        var diff = Math.abs(arrayed[i] - score)
        console.log(diff)
        diffs.push(diff)
        i += 1
      })
      var user = {
        totalDiff: 0
      }
      for(var i in diffs){ user.totalDiff += diffs[i] }
      if (user.totalDiff < winner.totalDiff) {
        winner = friend
        console.log('winner ', winner)
      }
    })
    res = winner
    return res
  })
}

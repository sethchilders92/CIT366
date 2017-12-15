var express = require('express');
var router = express.Router();
var sequenceGenerator = require('../models/sequence');
var Message = require('../models/message');

router.get('/', function (req, res, next) {
  getMessages(res);
});

var getMessages = function(res) {
  Message.find()
    .exec(function (err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    });
}

router.post('/', function saveMessage(req, res, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });
  saveMessage(res, document);
});

var saveMessage = function(res, message) {
  message.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved message',
      obj: result
    });
    getMessages(res);
  });
}

router.patch('/:id', function (req, res, next) {
  Message.findOne({id: req.params.id}, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(res, message);
  });
});
//     message.save(function(err, result) {
//       if (err) {
//         return res.status(500).json({
//           title: 'An error occurred',
//           error: err
//         });
//       }
//       res.status(200).json({
//         message: 'Updated message',
//         obj: result
//       });
//     });
//   });
// });

router.delete('/:id', function deleteMessage(req, res, next) {
  var query = {id: req.params.id};

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {messageId: req.params.id}
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;


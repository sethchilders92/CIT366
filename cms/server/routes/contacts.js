var express = require('express');
var router = express.Router();
var sequenceGenerator = require('../models/sequence');

var Contact = require('../models/contact');

//done
router.get('/', function (req, res, next) {
  getContacts(res);
});

//done
var getContacts = function(res) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Success',
        obj: contacts
      });
    });
}

//done
router.post('/', function (req, res, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });
  saveContact(res, contact);
});

//done
var saveContact = function (res, contact) {

  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }

  contact.save(function(err, result) {
    res.setHeader('Content-Type','application/json');
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      contact: 'Saved contact',
      obj: result
    });
    getContacts(response);
  });
}

//done
router.patch('/:id', function (req, res, next) {
  Contact.findOne({id: req.params.id}, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No contact Found!',
        error: {contact: 'Contact not found'}
      });
    }

      contact.name = req.body.name,
      contact.email = req.body.email,
      contact.phone = req.body.phone,
      contact.imageUrl = req.body.imageUrl,
      contact.group = [{}]
    saveContact(res, contact);
  });
  // saveContact(res, contact);
});

//
//     contact.save(function(err, result) {
//       if (err) {
//         return res.status(500).json({
//           title: 'An error occurred',
//           error: err
//         });
//       }
//       res.status(200).json({
//         contact: 'Updated contact',
//         obj: result
//       });
//     });
//   });
// });

router.delete('/:id', function deleteContact(req, res, next) {
  var query = {id: req.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No contact Found!',
        error: {contactId: req.params.id}
      });
    }
    contact.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Deleted contact',
        obj: result
      });
    });
  });
});

module.exports = router;


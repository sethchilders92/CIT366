var express = require('express');
var router = express.Router();
var sequenceGenerator = require('../models/sequence');

var Document = require('../models/document');

router.get('/', function (req, res, next) {
  console.log('router.get');
  getDocuments(res);
});

var getDocuments = function(res) {
  console.log('getDocuments');

  Document.find()
    .exec(function (err, documents) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: documents
      });
    });
}

router.post('/', function (req, res, next) {
  console.log('router.post');

  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });
  saveDocument(res, document);
});

var saveDocument = function(res, document) {
  console.log('saveDocument');

  document.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved document',
      obj: result
    });
    getDocuments(res);
  });
}


router.patch('/:id', function (req, res, next) {
  console.log('router.patch');

  Document.findOne({id: req.params.id}, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {message: 'Document not found'}
      });
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document);
  });
});
//
//     document.save(function(err, result) {
//       if (err) {
//         return res.status(500).json({
//           title: 'An error occurred',
//           error: err
//         });
//       }
//       res.status(200).json({
//         message: 'Updated document',
//         obj: result
//       });
//     });
//   });
// });

router.delete('/:id', function deleteDocument(req, res, next) {
  console.log('router.delete');

  var query = {id: req.params.id};

  Document.findOne(query, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {documentId: req.params.id}
      });
    }
    document.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted document',
        obj: result
      });
    });
  });
});

module.exports = router;


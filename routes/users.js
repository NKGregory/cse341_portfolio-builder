const routes = require('express').Router();
const connect = require('../db/connect');
const OjectId = require('mongodb').ObjectId;


//Get all USers
routes.get('/', (_req, res) => {
  const results = connect.getCollection().find();

  results.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('Returned All Users');
  });
});

//Get One Contact
// routes.get('/:id', (_req, res) => {
//   const contactId = new OjectId(_req.params.id);
//   const results = connect.getCollection().find({ _id: contactId });

//   results.toArray().then((documents) => {
//     res.status(200).json(documents[0]);
//     console.log(`Returned Contact ${_req.params.id}`);
//   });
// });

//Post to Contacts
// routes.post('/', (_req, _res) => {
//     const contact = {
//         firstName: _req.body.firstName,
//         lastName: _req.body.lastName,
//         nickName: _req.body.nickName,
//         phone: _req.body.phone,
//         company: _req.body.company,
//         email: _req.body.email,
//         favoriteColor: _req.body.favoriteColor,
//         birthday: _req.body.birthday
//     };
//     const results = connect.getCollection().insertOne(contact);
//     results.then((documents) => {
//         _res.status(201).json(documents);
//     })
// });

//Put JSON to Contact by ID
// routes.put('/:id', (_req, _res) => {
//     const putId = new OjectId(_req.params.id);
//     const contact = {
//             firstName:_req.body.firstName,
//             lastName:_req.body.lastName,
//             nickName: _req.body.nickName,
//             phone: _req.body.phone,
//             company: _req.body.company,    
//             email:_req.body.email,
//             favoriteColor:_req.body.favoriteColor,
//             birthday:_req.body.birthday
//         };
//     const results = connect.getCollection().replaceOne({ _id: putId }, contact);
//     results.then((documents) => {
//         _res.status(202).json(documents);
//     });
// });

//Delete Contact by ID
// routes.delete('/:id', (_req, _res) => {
//     const deleteId = new OjectId(_req.params.id);
//     const results = connect.getCollection().remove({ _id: deleteId },true);
//     results.then((documents) => {
//         _res.status(203).json(documents);
//         console.log(`Deleted Contact ${deleteId}`);
//     });
// });

module.exports = routes;
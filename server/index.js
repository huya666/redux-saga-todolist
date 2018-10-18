const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('./config/mongoose');
const db = mongoose();


app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.json({"OPTIONS":"OPTIONS"});
  }
  else {
    next();
  }
});

app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

const List = require('./Mode/List');
app.get('/list', (req, res) => {
  List.find({}, (err, doc) => {
    if(doc){
      res.json({code: 1, data: doc})
    }else{
      res.json({code:0, err})
    }
  })
})

app.post('/list/add', (req, res) => {
  List.insertMany({...req.body}, (err,doc) => {
    if(doc){
      List.find({}, (err, doc) => {
        res.json({code: 1, data: doc})
      })
    }else{
      res.json({code:0, err})
    }
  });
})

app.post('/list/finished', (req, res) => {
  let { _id, finished } = req.body;
  List.updateMany({ _id }, {$set:{finished}}, (err, doc) => {
    if(doc){
      List.find({}, (err, doc) => {
        if(doc){
          res.json({code: 1, data: doc})
        }else{
          res.json({code:0, err})
        }
      })
    }else{
      res.json({code:0, err})
    }
  })
})

app.post('/list/remove', (req, res) => {
  let {_id} = req.body;
  List.deleteMany({_id}, (err, doc) => {
    if(doc){
      List.find({}, (err, doc) => {
        if(doc){
          res.json({code: 1, data: doc})
        }else{
          res.json({code: 0, errMsg: err.message})
        }
      })
    }else{
      res.json({code: 0, errMsg: err.message})
    }
  })
})

app.post('/list/edit', (req, res) => {
  let { _id , title } = req.body;
  List.updateMany({_id}, {$set:{title}}, (err, doc) => {
    if(doc){
      List.find({}, (err, doc) => {
        if(doc){
          res.json({code: 1, data: doc})
        }else{
          res.json({code:0, errMsg: err.message})
        }
      })
    }else{
      res.json({code:0, errMsg: err.message})
    }
  })
})

app.post('/list/clear', (req, res) => {
  List.deleteMany({}, (err, doc) => {
    if(doc){
      res.json({code: 1})
    }else{
      res.json({code: 0, errMsg: err.message})
    }
  })
})

app.listen('9999')
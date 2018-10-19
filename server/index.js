const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('./config/mongoose');
const db = mongoose();

let httpServer= require('http').Server(app);
let io = require('socket.io')(httpServer);

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.send(200);
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


io.on('connection',  (socket)=>{
  // console.log('client connect server, ok!');

  // // io.emit()方法用于向服务端发送消息，参数1表示自定义的数据名，参数2表示需要配合事件传入的参数
  // io.emit('server message', {msg:'client connect server success'});

  // // socket.broadcast.emmit()表示向除了自己以外的客户端发送消息
  // socket.broadcast.emit('server message', {msg:'broadcast'});


  // // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
  socket.on('disconnect', ()=>{
    console.log('connect disconnect');
  });
  
  // // 与客户端对应的接收指定的消息
  // socket.on('client message', (data)=>{
  //   console.log(data);// hi server
  // });

  socket.on('button', req => {
    console.log(req, '1111')
    socket.emit('button', req);
  })
 

  // socket.disconnect();


});


httpServer.listen('9999')
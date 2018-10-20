$ cd /todolist/sever

$ nodemon index.js

$ npm install

$ cd /todolist

$ npm install

$ npm start

must be install mongodb and node

email 597414767@qq.com

最近在开发一个聊天功能的模块，于是刚在在这里做了socket.io测试

cd /todolist/sever

npm install socket.is --save

cd /todolist

npm install socket.io-client --save

需要对server/index.js进行简单的修改

```
  + let httpServer= require('http').Server(app);
  + let io = require('socket.io')(httpServer);


  + io.sockets.on('connection', function (socket) { //只是为了测试
  +   socket.on('click1',function(data){
  +     console.log('监听点击事件');
  +     socket.emit('click2', {datas: data});
  +     socket.broadcast.emit('click2',  {datas: data});
  +   })
  + })


  + httpServer.listen('9999')
  - app.listen('9999')

```

react List.js

```
+ import io from 'socket.io-client';
+ const socket = io('http://localhost:9999');

+ componentDidMount(){  //只是为了测试
     this.props.getListItem();
+   socket.emit('click1');
+   socket.on('click2', data => {
+     console.log(data)
+   })
+ }

+ handleTestSocket(){
+   socket.emit('click1', '11'); // //只是为了测试
+ }
```

  随便位置加了一个button进行测试，开启几个窗口即可看到打印效果

  写这个我比较随意只是用于学习测试用，请不要介意！！！！

  eamil  597414767@qq.com
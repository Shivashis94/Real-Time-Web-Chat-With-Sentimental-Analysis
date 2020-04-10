const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app)
const socketio=require('socket.io')
const io=socketio(server)
const port=process.env.PORT || 3000
const path=require('path')
const {addUser,removeUser,getAllUsers,getCurrentUser}=require('../utils/usersvalidation')
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
app.use(express.static(path.join(__dirname,'../public')))

server.listen(port,()=>{
    console.log('listening on '+port);

})
io.on('connection',(socket)=>{

    socket.on('userconnection',({username},callback)=>{
        const {getUserData,error}=addUser(username,socket.id)
        const users=getAllUsers();

        if(error){

            return callback(error)

        }

        io.emit('message', {users,message:"joined the chat"});

        callback();


    })

    socket.on('conversation',(msg)=>{
        const getcurrentuser=getCurrentUser(socket.id)
        const score=sentiment.analyze(msg).score;
        if(score==0){
            

            emojis=String.fromCodePoint(0x1F610);
        }else if (score>0 && score<5){

            emojis=String.fromCodePoint(0x1F642);
  
        }else if (score>=5){

            emojis=String.fromCodePoint(0x1F600)
        }else{

            emojis=String.fromCodePoint(0x1F612)

        }


        socket.emit('senderchat',{msg:msg+' '+emojis,username:getcurrentuser.username,time:new Date().getTime()});
        socket.broadcast.emit('receiverchat',{msg:msg+' '+emojis,username:getcurrentuser.username,time:new Date().getTime()});
    })



    socket.on('disconnect', function(){

        const removeThisUser=removeUser(socket.id)
        if(removeThisUser){
            socket.broadcast.emit("removemessage",{username:removeThisUser.username,message:"is offline",id:socket.id})
    
        }
      });
});


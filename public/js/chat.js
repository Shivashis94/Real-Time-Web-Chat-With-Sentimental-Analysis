const socket=io()
const username=Qs.parse(location.search, { ignoreQueryPrefix: true })
socket.emit('userconnection',username,(error)=>{
if(error){
    location.href="/"

}

})

document.querySelector('#send_message').addEventListener('click',(e)=>{
    

    const messageData=document.getElementById("mytextarea").value

    socket.emit('conversation',messageData);

    document.getElementById("mytextarea").value=""

})

socket.on('senderchat',(chatData)=>{

    const template=document.querySelector('#sender-message').innerHTML;
    var rendered = Mustache.render(template, { msg:chatData.msg,username:chatData.username,time:moment(chatData.time).format('MMMM Do YYYY, h:mm a')});
    document.getElementById('sender').insertAdjacentHTML("beforeend",rendered)
})


socket.on('receiverchat',(chatData)=>{

    const template=document.querySelector('#receiver-message').innerHTML;
    var rendered = Mustache.render(template, { msg:chatData.msg,username:chatData.username,time:moment(chatData.time).format('MMMM Do YYYY, h:mm a')});
    document.getElementById('sender').insertAdjacentHTML("beforeend",rendered)
})

socket.on('message',(userStatus)=>{
    const template=document.querySelector('#online_users').innerHTML;
    var rendered = Mustache.render(template, { usersData:userStatus.users,message:userStatus.message });
    document.getElementById('contacts').innerHTML=rendered;  

})

socket.on('removemessage',(userStatus)=>{

    const template=document.querySelector('#online_users').innerHTML;
    document.getElementById(userStatus.id).remove();  

})
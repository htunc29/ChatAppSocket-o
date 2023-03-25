const socket=io.connect('http://localhost:5000')


const submitBtn=document.getElementById('submitBtn')
const sender=document.getElementById('sender')
const message=document.getElementById('message')
const output=document.getElementById('output')
const feedback=document.getElementById('feedback')
const form=document.getElementById('form')

submitBtn.addEventListener('click',(e)=>{
  socket.emit('chat',{
    sender:sender.value,
    message:message.value
  })
  e.preventDefault()
})


socket.on('chat',data=>{
  feedback.innerHTML=""
  output.innerHTML+=`<p><strong>${data.sender}:</strong>${data.message}</p>`;
  message.value=""
})


message.addEventListener('keyup',()=>{
  socket.emit('typing',sender.value)
})

sender.addEventListener('keyup',()=>{
  socket.emit('join',`${sender.value} chate katıldı`)
})
socket.on('typing',data=>{
  feedback.innerHTML=`<p>${data} yaziyor...</p>`
})
socket.on("join",data=>{
  feedback.innerHTML=`<p>${data}</p>`
})

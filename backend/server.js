require('dotenv').config()
const mongoose=require('mongoose')
const cors=require('cors')
const app = require('express')();
const express=require('express')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Comments=require('./models/commentModel')

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/commentRouter'));

 //socket 
 let users=[]
  io.on('connection', (socket) => {
    console.log(socket.id +'a user connected'); 

    socket.on('joinRoom',id=>{
      const user={userId:socket.id,room:id}
      const check=users.every(user=>user.userId!==socket.id)

      if(check){
        users.push(user)
        socket.join(user.room)
      }else{
        users.map(user=>{
          if(user.userId === socket.id){
            if(user.room !==id){
            socket.join(user.room)
            socket.leave(user.room)
            user.room=id
          }
        }})
      }
    })

    socket.on('createComment', async msg=>{
      console.log(msg)
      const {username,content,product_id,createdAt,rating,send}=msg

      const newComment= new Comments({
        username,content,product_id,createdAt,rating
      })

      if(send === 'replyComment'){
        const {_id,username,content,product_id,createdAt,rating}=newComment

        const comment = await Comments.findById(product_id)
        if(comment){
          comment.reply.push({_id,username,content,createdAt,rating})
          await comment.save()
          io.to(comment.product_id).emit('sendReplyCommentToClient',newComment)
        }
      }else{
        await newComment.save()

        io.to(newComment.product_id).emit('sendCommentToClient',newComment)

      }


    })

    socket.on('disconnect', ()=>{
      
      users=users.filter(user=>user.userId !==socket.id)
    })

  });


  
  http.listen(5000, () => {
    console.log('listening on *:5000');
  });

//connection db
  const URI=process.env.MONGODB_URL
    mongoose.connect(URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
        },err=>{
    if(err) throw err;
    console.log('connected to mongoDB!!')
    })
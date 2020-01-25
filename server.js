const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const items=require('./routes/api/items')


//Use Routes
app.use('/api/items',items)



//BodyParser Middleware



const mongoURI=process.env.MONGODB_URI||'mongodb://localhost/shopping-list'

mongoose.connect(mongoURI).then(()=>console.log('MongoDB connected'))
.catch(error=>console.log(error))

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
const port =process.env.PORT || 5000

app.listen(port,()=> console.log(`Server started on port ${port}`))
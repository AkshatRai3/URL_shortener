 const express = require('express')
 const path = require('path');
 const urlRouter = require('./routes/url')
 const app = express();  
  const URL = require('./models/url')
 const {connectMongoDB} = require('./connection/connect')
 const PORT = 3000;
 const StaticRoute = require('./routes/StaticRouter');
app.use(express.json());
app.use(express.urlencoded({extended:false}))
  

   connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>{
    console.log("mongoDB connected successfully");
    
   });

   app.set(' view engine', 'ejs');
   app.set('views',path.resolve('./views') )
  
   app.use( '/url', urlRouter);

   app.use('/', StaticRoute); 

   app.get('/url/:shortId', async(req, res)=>{
    const shortId = req.params.shortId; 
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {$push:  {
            visitHistory:{
                timestamp: Date.now()  
            }
        }} 
    );
    res.redirect(entry.redirectURL); 
   })
   
 app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
 })
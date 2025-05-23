 const express = require('express')
 const urlRouter = require('./routes/url')
 const app = express();  
  const URL = require('./models/url')
 const {connectMongoDB} = require('./connection/connect')
 const PORT = 3000;

app.use(express.json());
  

   connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>{
    console.log("mongoDB connected successfully");
    
   });

   app.get('/test', async (req, res) =>{
    const allUrls = await URL.find({});

    return res.end(`
        <html>
            <head></head>
            <body>
                <ol>
                    ${allUrls.map(url => `<li> ${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} </li>`).join('<br>')}
                </ol> 
            </body>    
        </html>
        `);
   })

   app.use( '/url', urlRouter);

   app.get('/:shortId', async(req, res)=>{
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
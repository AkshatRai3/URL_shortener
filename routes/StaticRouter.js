const express = require('express')
const URL = require('../models/url')

 const router = express.Router();

  router.get('/', async(req, res) =>{
   const allUrls = await URL.find({});
    res.render('home.ejs', {
        urls: allUrls, 
    })
  })


 module.exports = router;
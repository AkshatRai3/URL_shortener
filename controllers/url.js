const shortid = require('shortid'); 
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res){

    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error: "URL is required"
        })
    }
    const shortID = shortid(); 

     await URL.create({
        shortId: shortID,
        redirectURL: req.body.url,
        visitHistory: [] 
     })

     return res.json({ id: shortID});
}

async function handleGetAnalytics(req,res){

    const shortId = req.params.shortId;
     const analytics = await URL.findOne({shortId} )

     return res.json({
        totalVisits: analytics.visitHistory.length,
        firstVisit: analytics.visitHistory[0],
        latestVisit: analytics.visitHistory[analytics.visitHistory.length - 1], 
        redirectURL: analytics.redirectURL
     })
}

module.exports = {
    handleGenerateNewShortURL,   
    handleGetAnalytics
}
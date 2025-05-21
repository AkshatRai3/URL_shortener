#commit 1

Work flow:

*1. Completing the backend:*
 a. First made a model of our database query - (./models/url)
 b. Then made a connection with mongoDB and named it short-url - (./connection/connect.js)
 c. Then made a router(./routes/url) for 
        - making new short ids,
        - geting their analytics
 d. Made Controllers for above routers
 e. Then in index.js 
        - firstly connected mongodb with our url
        - given 'url' command to Routers to complete task c
 f. Created a function to redirect to the shorten link and update the number of clicks on the link



*2. Frontend part*

 a. Making UI in react
 b. Doing basic styling to keep it simple and basic
 c. Will try to first make the design on figma
 d. Then make the React part

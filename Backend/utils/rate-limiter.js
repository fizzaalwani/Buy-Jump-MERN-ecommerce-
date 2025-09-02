const rateLimit=require('express-rate-limit')

const limiter=rateLimit({
    windowMs:1*60*1000,
    max:15,
    message:"Limit reached .Please try again after some time",
    statusCode:429
})
module.exports = limiter;
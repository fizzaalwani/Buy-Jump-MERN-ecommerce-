const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 4000;
const db = require('./config/connection');
const subscribe = require('./routes/subscribers.route');
const cart=require('./routes/cart.route')
const product=require('./routes/product.route')
const review=require('./routes/review.route')
const user=require('./routes/user.route')
const voucher=require('./routes/voucher.route')


require('dotenv').config()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

app.use('/subscriber',subscribe)
app.use('/cart',cart)
app.use('/product',product)
app.use('/review',review)
app.use('/user',user)
app.use('/voucher',voucher)


// API Endpoints
app.get('/', (req, res) => {
    res.send("Hi from express");
});



app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`server is running on ${port}`);
});


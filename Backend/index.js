const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const port = 4000;
const db = require('./config/connection');
const productModel = require('./models/productmodel');
const usermodel = require('./models/usermodel');
const subsModel=require('./models/subscribers')
const bcrypt = require('bcrypt');
const sendEmail=require('./utils/emailService')
require('dotenv').config()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

// Multer config
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// API Endpoints
app.get('/', (req, res) => {
    res.send("Hi from express");
});

app.post('/upload', upload.array('product', 5), (req, res) => {
    const urls = req.files.map((file) => `http://localhost:4000/upload/images/${file.filename}`)
    res.send({
        success: true,
        filepath: urls
    });
});

// app.get('/upload/images/:filename', (req, res) => {
//     res.sendFile(path.join(__dirname, 'upload/images', req.params.filename));
// });



//product Routes
app.post('/addproduct', async (req, res) => {
    try {
        const { id, name, description, category, image, old_price, new_price, stock } = req.body

        if (!Array.isArray(image)) {
            image = [image];
        }

        if ([id, name, description, category, image, old_price, new_price, stock]
            .some(field =>
                field === null ||
                field === undefined ||
                (typeof field === "string" && field.trim() === "") ||
                (Array.isArray(field) && field.length === 0)
            )) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let existingProduct = await productModel.findOne({ id: id })
        if (existingProduct)
            return res.status(400).json({
                success: false,
                message: "Product already exists"
            })

        let newproduct = await productModel.create({
            id, name, description, category, image, old_price, new_price, stock
        })
        return res.status(201).json({
            success: true,
            message: "Product saved successfully",
            product: newproduct
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || "Error saving product"
        })
    }


})

app.delete('/removeproduct/:id', async (req, res) => {
    const id = req.params.id
    let deletedProduct = await productModel.findOneAndDelete({ id: id })
    if (!deletedProduct) {
        return res.status(400).json({
            success: false,
            message: "Product does not exist"
        })
    }
    if (deletedProduct.images && Array.isArray(deletedProduct.images)) {
        deletedProduct.images.forEach((imgUrl) => {
            const filePath = path.join(__dirname, imgUrl.replace(`http://localhost:4000/`, ''));
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Failed to delete ${filePath}:`, err);
            });
        });
    }
    return res.status(200).json({
        success: true,
        product: deletedProduct,
        message: "Product deleted successfully"
    })


})
// app.put('/updateProduct', async (req, res) => {
// })
app.delete('/deleteAllProducts', async (req, res) => {
    try {
        const result = await productModel.deleteMany({})

        if (result.deletedCount == 0) {
            return res.status(404).json({
                success: false,
                message: "No products available to delete"
            })
        }

        return res.status(200).json({
            success: true,
            deletedCount: result.deletedCount,
            message: "All products deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting all products"
        });
    }


})
app.get('/display', async (req, res) => {
    try {
        let products = await productModel.find()
        if (!products) {
            return res.status(402).json({
                success: true,
                message: "No products in the database"
            })
        }
        return res.status(200).json({
            success: true,
            products: products
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || "Error displaying product"
        })
    }

})
app.get('/newcollection', async (req, res) => {
    try {
        let products = await productModel.find({}).sort({ date: -1 }).skip(1).limit(8)
        //  let newCollection=products.slice(1).slice(-8)
        res.send(products)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

})
app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await productModel.find({}).sort({ _id: 1 }).limit(4)
        res.send(products)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

})
app.get('/relatedProducts/:category/:productId', async (req, res) => {
    try {
        // let products = await productModel.find({ category: req.params.category }).limit(4)
        let products=await productModel.aggregate([
            {$match:{category:req.params.category,_id:{$ne:req.params.productId}}},
            {$sample:{size:4}}
        ])
        res.json(products)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//add subscribers
app.post('/add/subscriber',async(req, res)=>{
    try{
     const email=req.body.email
      let existingSubscribor=await subsModel.findOne({email})
      if(existingSubscribor){
        return res.json({message:"user is already subscribed"})
      }

      await subsModel.create({email:email})

      return res.json({message:"Subscriber added"})
    }catch(err){
         res.status(500).json({
            success: false,
            message: err.message
        })
    }
     
})
app.post('/sendMail',async(req,res)=>{
    try{
   const {subject,message}=req.body

    const subscribers=await subsModel.find({},'email -_id')
    let recipients=subscribers.map(s=>s.email)

    sendEmail(recipients,"Subscriber alert from Buy-Jump","We are delighted to imform you of our latest summer collection that has been introduced with an exclusive discount of 15% for our new subscribers say hi to fizza")

    res.json({ success: true, message: 'Mail sent to all subscribers' });
    }catch(err){
          res.status(500).json({ success: false, message: err.message });
    }
   
    
})
//Endpoints for  users
app.post("/user/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body
        let check = await usermodel.findOne({ email: email })
        if (check) return res.status(400).json({ success: false, message: "User already exists" })

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await usermodel.create({
            username: username,
            email: email,
            password: hashedPassword,
            cartData: {}
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, "secret")

        res.status(201).json({
            success: true,
            token,
            message: "User registered successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || "Error registering user"
        })
    }

})
app.post('/user/login', async (req, res) => {

    let existingUser = await usermodel.findOne({ email: req.body.email })
    if (!existingUser) return res.status(401).json({ success: true, message: "User does not exist" })

    let isPasswordValid = bcrypt.compareSync(req.body.password, existingUser.password)
    if (isPasswordValid) {
        const data = {
            user: {
                id: existingUser.id
            }
        }
        const token = jwt.sign(data, "secret")

        res.json({
            success: true,
            token,
            message: "User loggedin successfully"
        })
    } else {
        res.json({
            success: false,
            message: "wrong password"
        })
    }
})
const verifyUser = (req, res, next) => {
    let token = req.header('auth-token')
    console.log("---------------------------------")
    console.log("Token from header:", req.header('auth-token'));
    if (!token) return res.status(401).send({ errors: "Please authenticate yourself" })

    try {
        let decoded = jwt.verify(token, "secret")
        console.log(decoded)
        req.user = decoded.user
        next();
    } catch (err) {
        return res.status(401).send({ errors: "Please authenticate yourself not decoded" })
    }
}
app.post('/addtocart', verifyUser, async (req, res) => {
    try {
        const { pId, quantity } = req.body

        let user = await usermodel.findOne({ _id: req.user.id })

        if (!user.cartData) user.cartData = {};
        user.cartData[pId] = Number((user.cartData[pId] || 0) + Number(quantity))

        
        user.markModified('cartData'); 
        console.log(user.cartData[pId])
        await user.save();

        res.json({ success: true, message: "Item added to cart" });
       
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || "Error adding to cart"
        })
    }

})
app.post('/removefromcart', verifyUser, async (req, res) => {
    try{
  const { pId, quantity } = req.body

    let user = await usermodel.findOne({ _id: req.user.id })

    if (user.cartData[pId] > 0) {
        user.cartData[pId] = Number(user.cartData[pId] - quantity)
    }
    user.markModified('cartData'); 

    await user.save();

    res.json({ success: true, message: "Item removed from the cart" });
    }catch(err){
         res.status(500).json({
            success: false,
            message: err.message || "Error removing cart Items"
        }) 
    }
  
})
app.get('/getCartItems', verifyUser, async (req, res) => {
    try {
        let products = await usermodel.findOne({ _id: req.user.id })
        res.json(products.cartData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || "Error displaying cart Items"
        })
    }

})
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`server is running on ${port}`);
});


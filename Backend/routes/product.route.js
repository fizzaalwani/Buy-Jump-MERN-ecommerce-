const express=require('express')
const { addProduct, removeProduct, deleteAllProducts, display, newCollection, popularInWomen, relatedProducts } = require('../controllers/product.controller')
const multer=require('multer')
const path = require('path');
const router=express.Router()


//product Routes

// Multer config
const storage = multer.diskStorage({
   destination: path.join(__dirname, '../upload/images'),
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// app.get('/upload/images/:filename', (req, res) => {
//     res.sendFile(path.join(__dirname, 'upload/images', req.params.filename));
// });


router.post('/upload', upload.array('product', 5), (req, res) => {
    const urls = req.files.map((file) => `http://localhost:4000/upload/images/${file.filename}`)
    res.send({
        success: true,
        filepath: urls
    });
});

router.post('/add', addProduct)
router.delete('/remove/:id', removeProduct)
router.delete('/deleteAll', deleteAllProducts)
router.get('/display', display)
router.get('/newcollection',newCollection)
router.get('/popularinwomen', popularInWomen)
router.get('/relatedProducts/:category/:productId', relatedProducts)
// app.put('/updateProduct', async (req, res) => {
// })


module.exports=router
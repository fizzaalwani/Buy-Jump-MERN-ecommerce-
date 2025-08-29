const productModel=require('../models/productmodel')
const path = require('path');

module.exports.addProduct=async (req, res) => {
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


}

module.exports.removeProduct=async (req, res) => {
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
            const filePath = path.join(__dirname,'..', imgUrl.replace(`http://localhost:4000/`, ''));
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


}

module.exports.deleteAllProducts=async (req, res) => {
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


}

module.exports.display=async (req, res) => {
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

}

module.exports.newCollection= async (req, res) => {
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

}

module.exports.popularInWomen=async (req, res) => {
    try {
        let products = await productModel.find({}).sort({ _id: 1 }).limit(4)
        res.send(products)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}
module.exports.relatedProducts=async (req, res) => {
    try {
        // let products = await productModel.find({ category: req.params.category }).limit(4)
        let products = await productModel.aggregate([
            { $match: { category: req.params.category, _id: { $ne: req.params.productId } } },
            { $sample: { size: 4 } }
        ])
        res.json(products)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
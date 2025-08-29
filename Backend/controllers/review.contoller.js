const productModel=require('../models/productmodel')
const reviewModel=require('../models/reviewmodel')

module.exports.getReview=async (req, res) => {
    try {
        const productId = req.params.productId
        let existingProduct = await productModel.findOne({ _id: productId })
        if (!existingProduct) return res.status(404).json({ success: false, message: "Product not found" })
        let reviews = await reviewModel.find({ productId: productId, approved: false })
        res.status(200).json({ success: true, reviews })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports.addReview= async (req, res) => {
    try {
        const { name, email, review, rating, productId } = req.body
        if (!email || !review) {
            return res.json({ message: "Please fill all the required fields" })
        }

        let newReview = await reviewModel.create({
            name: name || null,
            email,
            review,
            rating,
            productId
        })
        // console.log("_id : ",newReview._id)
        // console.log("id : ",newReview.id)
        if (newReview) return res.status(201).json({ success: true, message: "review added" })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports.approveReview=async (req, res) => {
    try {
        const reviewId = req.params.reviewId
        const existingReview = await reviewModel.findById(reviewId )
        if (!existingReview) return res.status(404).json({ success: false, message: "Review not found" })
        existingReview.approved = true
        await existingReview.save()
        res.json({success:true,messgae:"review approved"})
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
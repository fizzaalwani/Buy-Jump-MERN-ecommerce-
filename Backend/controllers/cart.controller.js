const usermodel=require('../models/usermodel')

module.exports.addToCart=async (req, res) => {
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

}

module.exports.removeFromCart=async (req, res) => {
    try {
        const { pId, quantity } = req.body

        let user = await usermodel.findOne({ _id: req.user.id })

        if (user.cartData[pId] > 0) {
            user.cartData[pId] = Number(user.cartData[pId] - quantity)
        }
        user.markModified('cartData');

        await user.save();

        res.json({ success: true, message: "Item removed from the cart" });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error removing cart Items"
        })
    }

}

module.exports.getCartItems=async (req, res) => {
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

}
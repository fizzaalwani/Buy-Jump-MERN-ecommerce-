const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    altPhoneNo: {
        type: Number,
        // required:true
    },
    instructions: {
        type: String
    },
    voucherCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voucher"
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"],
        default: "pending"
    },
    order: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "credit_card", "debit_card"],
        default: "cod"
    },
    paymentStatus: {
        type: Number,
        enum: ["paid", "unpaid", "refunded"],
        default: "unpaid"
    }
}, { timestamps: true })

module.exports = mongoose.model("order", orderSchema)
const vouchermodel = require("../models/vouchermodel")

module.exports.create = async (req, res) => {
    try {
         const { code, expiryDate, discount } = req.body

        if (!code || !discount || !expiryDate) return res.status(400).json({ success: false, message: "Please fill all required fields" })
        let existingVoucher = await vouchermodel.findOne({ code })
        if (existingVoucher) return res.status(400).json({ success: false, message: "voucher already exists" })

        let voucher = await vouchermodel.create({
            code,
            expiryDate,
            discount
        })
        res.status(201).json({ success: true, message: "voucher created successfully", voucher })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error creating voucher"
        })
    }
}

module.exports.update = async (req, res) => {
    try {
         const { code, discount, expiryDate } = req.body
        let existingVoucher = await vouchermodel.findOne({ code })

        if (!existingVoucher) return res.status(400).json({ success: false, message: "voucher does not exist" })

        existingVoucher.discount=discount
        existingVoucher.expiryDate=expiryDate

        await existingVoucher.save()
        res.status(200).json({success:true,message:"voucher updated successfully",existingVoucher})
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error creating voucher"
        })
    }
}

module.exports.get=async(req,res)=>{
    try{
    let vouchers=await vouchermodel.find({})
    res.status(200).json({success:true,vouchers})
    }catch(err){
         res.status(500).json({
            success: false,
            message: err.message || "Error creating voucher"
        })
    }
}

module.exports.valid=async(req,res)=>{
   try{
    let id=req.params.id
    const existingVoucher=await vouchermodel.findById(id)
    if(!existingVoucher) return res.status(400).json({success:false,message:"voucher does not exist"})
    
        let isValid=true
        if(existingVoucher.expiryDate < Date.now()){
            return res.status(400).json({success:false,message:"Invalid"})
        }else{
               return res.status(201).json({success:true,message:"valid"})
        }
   }catch(err){
      res.status(500).json({
            success: false,
            message: err.message || "Error creating voucher"
        })
   }
}
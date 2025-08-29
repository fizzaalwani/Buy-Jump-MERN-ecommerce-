const subsModel=require('../models/subscribers')
const sendEmail=require('../utils/emailService')

module.exports.addSubscriber= async (req, res) => {
    try {
        const email = req.body.email
        let existingSubscribor = await subsModel.findOne({ email })
        if (existingSubscribor) {
            return res.json({ message: "user is already subscribed" })
        }

        await subsModel.create({ email: email })

        return res.json({ message: "Subscriber added" })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

module.exports.sendEmail=async (req, res) => {
    try {
        const { subject, message } = req.body

        const subscribers = await subsModel.find({}, 'email -_id')
        let recipients = subscribers.map(s => s.email)

        sendEmail(recipients, "Subscriber alert from Buy-Jump", "We are delighted to imform you of our latest summer collection that has been introduced with an exclusive discount of 15% for our new subscribers say hi to fizza")

        res.json({ success: true, message: 'Mail sent to all subscribers' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
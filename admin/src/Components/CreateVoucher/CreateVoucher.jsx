import axios from 'axios'
import React, { useState } from 'react'
import './CreateVoucher.css'


const CreateVoucher = () => {
    const [formData, setFormData] = useState({
        code: "",
        discount: "",
        expiryDate: ""
    })
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const createVoucher = async (e) => {
        e.preventDefault()
        if (isSubmitting) return

        const { code, discount, expiryDate } = formData
        if (!code || !discount || !expiryDate) {
            setError("Please fill all the required fields")
            return
        }

        try {
            const code = formData.code;
            const discount = Number(formData.discount);
            const expiryDate = new Date(formData.expiryDate);

            const voucher = {
                code,
                discount,
                expiryDate,
            };
            setIsSubmitting(true)
            const response = await axios.post('http://localhost:4000/voucher/create', voucher)

            if (response.success !== true) {
                setError("Some error occurred")
            }

            setFormData({ code: "", discount: "", expiryDate: "" })
            alert("Voucher created successfully")
        } catch (err) {
            if (err.response) {
                console.log("Error from backend  :", err.response.data.message)
                alert(err.response.data.message)
            } else {
                console.log("Error: ", err.message || err)
            }
        } finally {
            setIsSubmitting(false)
            setError('')
        }
    }

    return (
        <div className="createVoucher-overlay">
            <div className="createVoucher-card">
                <h2>Create Voucher</h2>
                <form onSubmit={createVoucher}>
                    <input
                        type="text"
                        placeholder="Enter code"
                        name="code"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter discount"
                        name="discount"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Enter expiry date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create"}
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    )
}

export default CreateVoucher

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Voucher.css";
import CreateVoucher from "../CreateVoucher/CreateVoucher";

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [showCreateVoucher,setShowCreateVoucher]=useState(false)

  const getVouchers = async () => {
    try {
      let response = await axios.get("http://localhost:4000/voucher/get");
      setVouchers(response.data.vouchers);
    } catch (err) {
      console.log("Error: ", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getVouchers();
  }, []);

  const getRandomColor = () => {
    const colors = [
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
    //   "#F7CAC9",
      "#92A8D1",
      "#F4A261",
      "#2A9D8F",
      "#E76F51",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="voucher-page">
      <div className="voucher-header">
        <h1> Available Vouchers</h1>
        <button onClick={()=>setShowCreateVoucher(!showCreateVoucher)}>Create Voucher</button>
      </div>

      <div className="display-voucher">
        {vouchers.map((voucher) => (
          <div
            key={voucher._id}
            className="voucher"
            style={{ backgroundColor: getRandomColor() }}
          >
            <div className="v-left">{voucher.discount}%</div>

            <div className="v-right">
              <p>
                Created at:{" "}
                <strong>{new Date(voucher.createdAt).toLocaleDateString()}</strong>
              </p>
              <p>
                Code: <span className="voucher-code">{voucher.code}</span>
              </p>
              <p>
                Expiry:{" "}
                <strong>{new Date(voucher.expiryDate).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        ))}
        {
            showCreateVoucher && <CreateVoucher/>
        }
      </div>
    </div>
  );
};

export default Voucher;

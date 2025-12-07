import React, { useState } from 'react'
import upload_area from '../../assets/Admin_Assets/upload_area.svg'
import axios from 'axios'
import './AddProduct.css'

function AddProduct() {
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    old_price: '',
    new_price: '',
    description: '',
    category: '',
    stock: '' 
  })

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (images.length + selectedFiles.length > 5) {
      alert("You can only upload up to 5 images")
      return
    }
    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[indexToRemove].preview)
      return prev.filter((_, index) => index !== indexToRemove)
    })
  }

  const uploadImages = (images) => {
    return axios.post("http://localhost:4000/media/upload/v2", images, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }

  const saveProduct = (product) => {
    return axios.post("http://localhost:4000/product/add", product)
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert('Please upload at least 1 image.');
      return;
    }

    try {
      const imgFormData = new FormData();
      images.forEach((img) => {
        imgFormData.append("product", img.file);
      });

      // Upload images
      const uploadRes = await uploadImages(imgFormData);
      if (!uploadRes.data.success) {
        throw new Error("Error uploading images");
      }

      const imageDataURLs = uploadRes.data.filepath;

     
       const product = {
    id: productDetails.id, 
    name: productDetails.name,
    description: productDetails.description,
    category: productDetails.category,
    old_price: Number(productDetails.old_price), 
    new_price: Number(productDetails.new_price), 
    stock: Number(productDetails.stock), 
    image: imageDataURLs 
  };

      const saveRes = await saveProduct(product);

      if (saveRes.data.success) {
        console.log("Product saved successfully:", saveRes.data);
       

      setProductDetails(prev=>{
        let cleared={}
        for(let key in prev){
          cleared[key]=''
        }
        return cleared
      })
      setImages([]);
      } else {
        console.log(saveRes.data.message);
      }

    } catch (err) {
      if (err.response) {
        console.error("Error:", err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error("Error:", err.message || err);
      }
    }
  };

  return (
    <div className='add-product-container'>
      <div className='add-product-form'>
        <h1>Add Products</h1>
        <form onSubmit={handleSubmit}>

          {/* First Row - Product ID and Title */}
          <div className="form-row">
            <div className="form-group">
              <label>Product ID</label>
              <input type="text" placeholder="P-1001" name='id' value={productDetails.id} required onChange={changeHandler} />
            </div>

            <div className="form-group">
              <label>Product Title</label>
              <input type="text" placeholder="e.g., Cotton T-Shirt" name='name' value={productDetails.name} onChange={changeHandler} required />
            </div>
          </div>

          {/* Second Row - Prices */}
          <div className="form-row">
            <div className="form-group">
              <label>Old Price ($)</label>
              <input type="number" placeholder="29.99" name='old_price' onChange={changeHandler} value={productDetails.old_price} required />
            </div>

            <div className="form-group">
              <label>New Price ($)</label>
              <input type="number" placeholder="39.99" name='new_price' onChange={changeHandler} value={productDetails.new_price} required />
            </div>

            <div className="form-group">
              <label>Stock</label> 
              <input type="number" placeholder="100" name='stock' onChange={changeHandler} value={productDetails.stock} required />
            </div>
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label>Product Description</label>
            <textarea placeholder="Enter detailed product description..." name='description' onChange={changeHandler} value={productDetails.description} required></textarea>
          </div>

          {/* Category */}
          <div className="form-group full-width">
            <label>Category</label>
            <select name='category' onChange={changeHandler} value={productDetails.category} required>
              <option value="">Select category</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="form-group full-width">
            <label>Product Images</label>
            <div className="upload-area">
              <label htmlFor="p-image" className="upload-label">
                <img src={upload_area} alt="Upload icon" />
                <p>Click to upload product images (max 5)</p>
              </label>
              <input type="file" id="p-image" name='images' hidden multiple onChange={handleFileChange} />
            </div>
            <div className="preview-images">
              {images.map((img, index) => (
                <div className="preview-wrapper" key={index}>
                  <img src={img.preview} alt={`Preview ${index}`} className="preview-thumbnail" />
                  <button type="button" onClick={() => handleRemoveImage(index)}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group full-width">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct

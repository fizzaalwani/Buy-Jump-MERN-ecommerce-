import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import "./ListProduct.css";

function ListProduct() {


  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      let products = await axios.get("http://localhost:4000/product/display")
      if (products.data.success) {
        setProducts(products.data.products)
        console.log(products.data.products)
      }

    } catch (err) {
      if (err.response) {
        console.log("Error from backend  :", err.response.data.message)
        alert(err.response.data.message)
      } else {
        console.log("Error: ", err.message || err)
      }
    }

  }

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sue you want to delete all products"))
      return

    await axios.delete("http://localhost:4000/display/product/deleteAll").then((res) => {
      if (res.success) {
        setProducts([])
      } else {
        alert("Error deleting products.Try Again Later")
      }
    }).catch((err) => {
      if (err.response) {
        console.log("Error from backend : ", err.response.data.message)
        alert(err.response.data.message)
      } else {
        console.log("Error :", err.message || err)
      }
    })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/remove/${id}`).then((res) => {
        if (res.data.success) {
          let deletedProduct = res.data.product
         
          setProducts(prev=> prev.filter(p=>String(p.id)!==String(deletedProduct.id)))
          alert(res.data.message)
          
        }else{
          alert(res.data.message || "Error deleting product. Try again later.");
        }
      })
    } catch (err) {
      if(err.response){
        console.log("Error : ",err.response.data.message)
      }
     else{
        console.log("Error : ", err )
      alert("Error deleting product. Try again later.");
      }
      
    }

  }
  useEffect(() => {
    fetchProducts()
  }, [])
  // const [products, setProducts] = useState([]);
  // const [editingId, setEditingId] = useState(null);
  // const [editFormData, setEditFormData] = useState({
  //   name: "",
  //   old_price: "",
  //   new_price: "",
  //   description: "",
  //   category: ""
  // });

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = () => {
  //   axios
  //     .get("http://localhost:4000/display")
  //     .then((res) => setProducts(res.data.products))
  //     .catch((err) => console.error("Error fetching products:", err));
  // };

  // const handleDelete = (id) => {
  //   if (!window.confirm("Delete this product?")) return;
  //   axios
  //     .delete(`http://localhost:4000/removeproduct/${id}`)
  //     .then(() => setProducts(products.filter((p) => p.id !== id)))
  //     .catch((err) => console.error("Error deleting product:", err));
  // };

  // const handleDeleteAll = () => {
  //   if (!window.confirm("Delete ALL products? This cannot be undone.")) return;
  //   axios
  //     .delete("http://localhost:4000/products")
  //     .then(() => setProducts([]))
  //     .catch((err) => console.error("Error deleting all products:", err));
  // };

  // const handleEdit = (product) => {
  //   setEditingId(product.id);
  //   setEditFormData({
  //     name: product.name,
  //     old_price: product.old_price,
  //     new_price: product.new_price,
  //     description: product.description,
  //     category: product.category
  //   });
  // };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditFormData({ ...editFormData, [name]: value });
  // };

  // const handleCancelEdit = () => setEditingId(null);

  // const handleSaveEdit = (id) => {
  //   axios
  //     .put(`http://localhost:4000/updateproduct/${id}`, editFormData)
  //     .then(() => {
  //       fetchProducts();
  //       setEditingId(null);
  //     })
  //     .catch((err) => console.error("Error updating product:", err));
  // };

  return (
    <div className="list-product-container">
      <div className="list-header">
        <h2>Product List</h2>
        <div className="action-buttons">
          <button className="delete-all-btn"
            onClick={handleDeleteAll}
          >
            <FiTrash2 /> Delete All
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Pic</th>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Stock</th>
              <th>New Price</th>
              <th>Old Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image[0] || "https://via.placeholder.com/80"}
                      alt={product.name}
                      className="table-img"
                    />
                  </td>
                  <td>{product.id}</td>
                  <td>
                    {/* {editingId === product.id ? (
                      <input
                        type="text"
                        name="name"
                        // value={editFormData.name}
                        // onChange={handleEditChange}
                      />
                    ) : (
                      product.name
                    )} */}
                    {product.name}
                  </td>
                  <td>
                    {product.category}
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    {/* {editingId === product.id ? (
                      <input
                        type="number"
                        name="new_price"
                        // value={editFormData.new_price}
                        // onChange={handleEditChange}
                      />
                    ) : (
                      `$${product.new_price}`
                    )} */}
                    {product.new_price}
                  </td>
                  <td>
                    {/* {editingId === product.id ? (
                      <input
                        type="number"
                        name="old_price"
                        // value={editFormData.old_price}
                        // onChange={handleEditChange}
                      />
                    ) : (
                      `$${product.old_price}`
                    )} */}
                    {product.old_price}
                  </td>
                  <td>
                    {/* {editingId === product.id ? (
                      <button
                        className="save-btn"
                        // onClick={() => handleSaveEdit(product.id)}
                      >
                        <FiCheck />
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        // onClick={() => handleEdit(product)}
                      >
                        <FiEdit />
                      </button>
                    )} */}
                    <button
                      className="edit-btn"
                    // onClick={() => handleEdit(product)}
                    >
                      <FiEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListProduct;

import React, { useEffect, useState } from "react";
import "./Listitems.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../HomeBaker.css";

const ListItems = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:3000";

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/product/bakerProduct`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const token = localStorage.getItem("token");
      await fetchList();
      const response = await axios.post(
        `${url}/api/product/delete`,
        { productId: foodId },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Food item deleted successfully!");
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to delete food item.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the item.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h1>All Foods List</h1>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs.{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;

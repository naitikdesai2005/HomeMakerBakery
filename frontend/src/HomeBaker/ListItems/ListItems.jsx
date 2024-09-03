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

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
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
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs.{item.price}</p>
            <p className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;

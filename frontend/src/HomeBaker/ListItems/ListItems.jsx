import React, { useEffect, useState } from "react";
import "./Listitems.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../HomeBaker.css";

const ListItems = () => {
  // const url = "http://localhost:3000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    // const response = await axios.get(`${url}/api/product/list`);
    const response = await axios.get(
      `http://localhost:3000/api/product/bakerProduct`
    );
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>AllFoods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs.{item.price}</p>
              <p className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItems;

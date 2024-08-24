import React, { useEffect, useState } from "react";
import "./AddItems.css";
import { assets } from "../../../images/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddItems = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cake",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    // const response = await axios.post(`${url}/api/food/add`, formData);
    // if (response.data.success) {
    //   setData({
    //     name: "",
    //     description: "",
    //     price: "",
    //     category: "Cake",
    //   });
    //   setImage(false);
    //   toast.success("Product Added Succesfully");
    // } else {
    // toast.error("Product Not Added");
    // }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <br />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_image}
              alt=""
              height={"100px"}
              width={"100px"}
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="cake">Cake</option>
              <option value="cupcake">Cup Cake</option>
              <option value="donat">Donuts</option>
              <option value="macroon">Macaroons</option>
              <option value="waffel">Waffles</option>
              <option value="choclate">Chocolate</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="Rs.130"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItems;

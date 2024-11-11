import React, { useContext, useState } from "react";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";
import { Image } from "primereact/image";

const Product = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart } = useContext(StoreContext);
  const [showPreview, setShowPreview] = useState(false);
  const url = "http://localhost:3000";

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="flex flex-col w-full sm:w-64 md:w-72 lg:w-80 mx-auto rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
      <div className="relative">
        <img
          className="w-full h-64 object-cover rounded-t-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          src={`${url}/uploads/${image}`}
          alt={name}
          onClick={togglePreview}
        />
        {!cartItems[id] ? (
          <img
            className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full bg-white p-1 shadow"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="absolute bottom-4 right-4 p-1 rounded-full bg-green-500 text-white">
            ✅
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={togglePreview}
        >
          <Image
            src={`${url}/uploads/${image}`}
            alt={name}
            preview
            width="500"
            className="max-w-[90%] max-h-[80%] rounded-lg"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-700 mt-2 mb-4">{description}</p>
        <p className="text-xl font-bold text-primary">Rs.{price}</p>
      </div>
    </div>
  );
};

export default Product;

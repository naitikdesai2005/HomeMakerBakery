import React, { useEffect, useState } from "react";
import "./Listitems.css";
import axios from "axios";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ListItems = () => {
  const [list, setList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = "http://localhost:3000";

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/product/bakerProduct`, {
        headers: {
          token: token,
        },
      });
      if (response.data.success) {
        setList(response.data.data);
        setFilteredItems(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching products");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = list.filter(
      (item) => item.name.toLowerCase().indexOf(query) >= 0
    );
    setFilteredItems(filtered);
  };

  const removeFood = async (foodId) => {
    try {
      const token = localStorage.getItem("token");
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

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${url}/uploads/${rowData.image}`}
        alt={rowData.name}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return <p>Rs.{rowData.price}</p>;
  };

  const ratingBodyTemplate = (rowData) => {
    return <p>{rowData.rating} stars</p>;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Button
        label="Delete"
        icon="pi pi-times"
        className="p-button-danger"
        onClick={() => removeFood(rowData._id)}
      />
    );
  };

  const header = (
    <div className="table-header">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a food item"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );

  const footer = (
    <div className="table-footer">
      <span>Displaying {filteredItems.length} items</span>
    </div>
  );

  return (
    <div className="list-items-container">
      {/* <h1 className="title">All Foods List</h1> */}
      <DataTable
        value={filteredItems}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "70rem" }}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 15, 20]}
      >
        <Column field="name" header="Name"></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
        <Column field="category" header="Category"></Column>
        {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column> */}
        <Column header="Status" body={statusBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default ListItems;

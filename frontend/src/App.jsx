// import React from "react";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import BakerRegister from "./pages/BakerRegister/BakerRegister.jsx";
// import Cart from "./pages/Cart/Cart.jsx";
// import HomeUser from "../../frontend/src/HomeUser/HomeUser.jsx";
// import HomeBaker from "../../frontend/src/HomeBaker/HomeBaker.jsx";
// import HomeAdmin from "../../frontend/src/HomeAdmin/HomeAdmin.jsx";
// import PlaceOrder from "./pages/Order/Order.jsx";
// import ContactForm from "./pages/Contact/Contact.jsx";
// import Aboutus from "./pages/Aboutus/Aboutus.jsx";
// import Product from "./pages/Product/Product.jsx";
// import Menu from "./pages/menu/Menu.jsx";
// import ProductDisplay from "./pages/ProductDisplay/ProductDisplay.jsx";

// import AddItems from "./HomeBaker/AddItems/AddItems.jsx";
// import ListItems from "./HomeBaker/ListItems/ListItems.jsx";
// import Orders from "./HomeBaker/Orders/Orders.jsx";
// import Sidebar from "./HomeBaker/Sidebar/Sidebar.jsx";

// function App() {
//   return (
//     <>
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/bakerRegister" element={<BakerRegister />} />
//         <Route path="/homeuser" element={<HomeUser />} />
//         <Route path="/homebaker" element={<HomeBaker />} />

//         <Route path="/add" element={<AddItems />} />
//         <Route path="/list" element={<ListItems />} />
//         <Route path="/backerorder" element={<Orders />} />

//         <Route path="/homeadmin" element={<HomeAdmin />} />
//         <Route path="/order" element={<PlaceOrder />} />
//         <Route path="/contact" element={<ContactForm />} />
//         <Route path="/aboutus" element={<Aboutus />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/productdisplay" element={<ProductDisplay />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import BakerRegister from "./pages/BakerRegister/BakerRegister.jsx";
// import Cart from "./pages/Cart/Cart.jsx";
// import HomeUser from "../../frontend/src/HomeUser/HomeUser.jsx";
// import HomeBaker from "../../frontend/src/HomeBaker/HomeBaker.jsx";
// import HomeAdmin from "../../frontend/src/HomeAdmin/HomeAdmin.jsx";
// import PlaceOrder from "./pages/Order/Order.jsx";
// import ContactForm from "./pages/Contact/Contact.jsx";
// import Aboutus from "./pages/Aboutus/Aboutus.jsx";
// import Product from "./pages/Product/Product.jsx";
// import Menu from "./pages/menu/Menu.jsx";
// import ProductDisplay from "./pages/ProductDisplay/ProductDisplay.jsx";

// import AddItems from "./HomeBaker/AddItems/AddItems.jsx";
// import ListItems from "./HomeBaker/ListItems/ListItems.jsx";
// import Orders from "./HomeBaker/Orders/Orders.jsx";
// import Sidebar from "./HomeBaker/Sidebar/Sidebar.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <>
//       {isLoggedIn && <Sidebar />}
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/login"
//           element={<Login onLogin={() => setIsLoggedIn(true)} />}
//         />
//         <Route path="/bakerRegister" element={<BakerRegister />} />
//         <Route path="/homeuser" element={<HomeUser />} />
//         <Route path="/homebaker" element={<HomeBaker />} />
//         <Route path="/homeadmin" element={<HomeAdmin />} />
//         <Route path="/add" element={<AddItems />} />
//         <Route path="/list" element={<ListItems />} />
//         <Route path="/backerorder" element={<Orders />} />
//         <Route path="/order" element={<PlaceOrder />} />
//         <Route path="/contact" element={<ContactForm />} />
//         <Route path="/aboutus" element={<Aboutus />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/productdisplay" element={<ProductDisplay />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage.jsx";
import BakerRegister from "./pages/BakerRegister/BakerRegister.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import HomeUser from "../../frontend/src/HomeUser/HomeUser.jsx";
import HomeBaker from "../../frontend/src/HomeBaker/HomeBaker.jsx";
import HomeAdmin from "../../frontend/src/HomeAdmin/HomeAdmin.jsx";
import PlaceOrder from "./pages/Order/Order.jsx";
import ContactForm from "./pages/Contact/Contact.jsx";
import Aboutus from "./pages/Aboutus/Aboutus.jsx";
import Product from "./pages/Product/Product.jsx";
import Menu from "./pages/menu/Menu.jsx";
import ProductDisplay from "./pages/ProductDisplay/ProductDisplay.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/bakerRegister" element={<BakerRegister />} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route
          path="/homebaker"
          element={
            isLoggedIn ? (
              <Login onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <HomeBaker />
            )
          }
        />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/product" element={<Product />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/productdisplay" element={<ProductDisplay />} />
      </Routes>
    </>
  );
}

export default App;

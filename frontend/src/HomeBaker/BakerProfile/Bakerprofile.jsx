// import React, { useState } from 'react';
// import HeaderBaker from "../HeaderBaker/HeaderBaker.jsx";
// import './Bakerprofile.css';

// const Bakerprofile = () => {
//   const [bakerDetails, setBakerDetails] = useState({
//     name: "John Baker",
//     email: "john@example.com",
//     bio: "Passionate baker specializing in artisan breads and pastries.",
//     profilePic: "https://via.placeholder.com/150",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedDetails, setUpdatedDetails] = useState(bakerDetails);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedDetails({ ...updatedDetails, [name]: value });
//   };

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSave = () => {
//     setBakerDetails(updatedDetails);
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <HeaderBaker />
//       <div className="baker-profile-container">
//         <div className="profile-pic">
//           <img src="../../../../images/1.jpg"/>
//           {/* <img src={bakerDetails.profilePic} alt="Profile" /> */}
//         </div>

//         <div className="profile-details">
//           {isEditing ? (
//             <div className="edit-container">
//               <label>Name:</label>
//               <input 
//                 type="text" 
//                 name="name" 
//                 value={updatedDetails.name}
//                 onChange={handleInputChange} 
//               />
//               <label>Email:</label>
//               <input 
//                 type="email" 
//                 name="email" 
//                 value={updatedDetails.email}
//                 onChange={handleInputChange} 
//               />
//               <label>Bio:</label>
//               <textarea 
//                 name="bio" 
//                 value={updatedDetails.bio}
//                 onChange={handleInputChange} 
//               />
//               <button onClick={handleSave} className="save-button">
//                 Save
//               </button>
//             </div>
//           ) : (
//             <div>
//               <h2>{bakerDetails.name}</h2>
//               <p>Email: {bakerDetails.email}</p>
//               <p>{bakerDetails.bio}</p>
//               <button onClick={handleEditToggle} className="edit-button">
//                 Edit Profile
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Bakerprofile;

import React, { useState } from 'react';
import HeaderBaker from "../HeaderBaker/HeaderBaker.jsx";
import './Bakerprofile.css';

const Bakerprofile = () => {
  const [bakerDetails, setBakerDetails] = useState({
    name: "John Baker",
    email: "john@example.com",
    bio: "Passionate baker specializing in artisan breads and pastries.",
    phone: "123-456-7890",
    bakeryName: "John's Artisan Bakery",
    address: "123 Baker Street, Food Town",
    password: "password123", // this should be handled securely in a real application
    profilePic: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(bakerDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setBakerDetails(updatedDetails);
    setIsEditing(false);
  };

  return (
    <>
      <HeaderBaker />
      <div className="baker-profile-container">
        <div className="profile-pic">
          <img src="../../../../images/1.jpg" alt="Profile" />
          {/* <img src={bakerDetails.profilePic} alt="Profile" /> */}
        </div>

        <div className="profile-details">
          {isEditing ? (
            <div className="edit-container">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={updatedDetails.name}
                onChange={handleInputChange} 
              />
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={updatedDetails.email}
                onChange={handleInputChange} 
              />
              <label>Phone:</label>
              <input 
                type="text" 
                name="phone" 
                value={updatedDetails.phone}
                onChange={handleInputChange} 
              />
              <label>Bakery Name:</label>
              <input 
                type="text" 
                name="bakeryName" 
                value={updatedDetails.bakeryName}
                onChange={handleInputChange} 
              />
              <label>Address:</label>
              <input 
                type="text" 
                name="address" 
                value={updatedDetails.address}
                onChange={handleInputChange} 
              />
              <label>Password:</label>
              <input 
                type="password" 
                name="password" 
                value={updatedDetails.password}
                onChange={handleInputChange} 
              />
              <label>Bio:</label>
              <textarea 
                name="bio" 
                value={updatedDetails.bio}
                onChange={handleInputChange} 
              />
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2>{bakerDetails.name}</h2>
              <p>Email: {bakerDetails.email}</p>
              <p>Phone: {bakerDetails.phone}</p>
              <p>Bakery: {bakerDetails.bakeryName}</p>
              <p>Address: {bakerDetails.address}</p>
              <p>{bakerDetails.bio}</p>
              <button onClick={handleEditToggle} className="edit-button">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bakerprofile;
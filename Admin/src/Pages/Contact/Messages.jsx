// import React,{ useState,useEffect} from 'react'
// import Sidebar  from '../Sidebar/Sidebar'
// import axios from "axios";

// const Messages = () => {

//     const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//     const [contacts, setContacts] = useState([]);
//     const sendEmail = async (email) => {
//       try {
//         await axios.post("http://localhost:3000/api/user/send-email", { email });
//         alert(`Email sent to ${email}`);
//       } catch (error) {
//         console.log("Error sending email:", error);
//       }
//     };
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/user/contactus");
//         if (response.data.success) {
//           setContacts(response.data.contacts);
//         }
//       } catch (error) {
//         console.log("Error fetching contacts:", error);
//       }
//     };

//     fetchContacts();
//   }, []);


//   return (
//     <div>
//         <Sidebar visible={isSidebarVisible} />
//         <div className="admin-contacts-table">
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Message</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {contacts.map((contact) => (
//             <tr key={contact._id}>
//               <td>{contact.name}</td>
//               <td>{contact.email}</td>
//               <td>{contact.phone}</td>
//               <td>{contact.message}</td>
//               <td>
//                 <button onClick={() => sendEmail(contact.email)}>
//                   Send Email
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   )
// }

// export default Messages

import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

const Messages = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [contacts, setContacts] = useState([]);

  const sendEmail = async (email) => {
    try {
      await axios.post("http://localhost:3000/api/user/send-email", { email });
      alert(`Email sent to ${email}`);
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/contactus");
        if (response.data.success) {
          setContacts(response.data.contacts);
        }
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar visible={isSidebarVisible} />
      <div className="flex-grow p-6 bg-white rounded-lg shadow-md mx-4 my-8">
        <h2 className="text-2xl font-semibold text-brown-700 mb-6 text-center">User Messages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-brown-100 text-brown-700">
                <th className="py-3 px-4 font-semibold border-b">Name</th>
                <th className="py-3 px-4 font-semibold border-b">Email</th>
                <th className="py-3 px-4 font-semibold border-b">Phone</th>
                <th className="py-3 px-4 font-semibold border-b">Message</th>
                <th className="py-3 px-4 font-semibold border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="even:bg-brown-50">
                  <td className="py-3 px-4 border-b text-gray-700">{contact.name}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{contact.email}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{contact.phone}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{contact.message}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => sendEmail(contact.email)}
                      className="bg-brown-600 text-black py-2 px-4 rounded-lg hover:bg-brown-800 transition duration-300"
                    >
                      Send Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;


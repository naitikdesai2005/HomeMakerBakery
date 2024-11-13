import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

const Messages = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);

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

  const sendEmail = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/send-email", {
        email: selectedEmail,
        message: emailMessage,
      });
      alert(`Email sent to ${selectedEmail}`);
      setShowEmailModal(false);
      setEmailMessage("");
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  const openEmailModal = (email) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  return (
    <div className="flex bg-pastel-cream min-h-screen">
      <Sidebar visible={isSidebarVisible} />
      <div className="flex-grow p-6 bg-pastel-peach rounded-lg shadow-lg mx-4 my-8">
        <h2 className="text-2xl font-bold text-brown-700 mb-6 text-center">User Messages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
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
                <tr key={contact._id} className="even:bg-pastel-cream hover:bg-brown-50 transition duration-150">
                  <td className="py-3 px-4 border-b text-gray-800">{contact.name}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{contact.email}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{contact.phone}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{contact.message}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openEmailModal(contact.email)}
                      className="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition duration-300"
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

      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-brown-700 mb-4">Send Custom Email</h3>
            <textarea
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 border border-brown-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowEmailModal(false)}
                className="mr-4 px-4 py-2 bg-gray-200 text-brown-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={sendEmail}
                className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition duration-300"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

import React, { useRef } from 'react';
import { useStateValue } from '../../context';
import { Navigate } from 'react-router-dom';

const BOT_TOKEN = "7892311984:AAH1hvBE0gnjaorGiggwN4RTNPmYTMi9oVQ";

const CHAT_ID = "-1002499076161"; 

const Checkout = () => {
  const { cart } = useStateValue();

  if (!cart || cart.length === 0) {
    return <Navigate replace to="/cart" />;
  }

  console.log("Cart Content:", cart);

  const fname = useRef(null);
  const lname = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = fname.current.value.trim();
    const lastName = lname.current.value.trim();

    if (!firstName || !lastName) {
      alert("Please fill in both First Name and Last Name.");
      return;
    }

    const message = `First Name: ${firstName}, Last Name: ${lastName}, Cart Items: ${cart.map(
      (item) => `${item.title} (x${item.amount}) ${item.price}`
    ).join(", ")}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        alert("Message sent successfully!");
      } else {
        alert(`Failed to send message: ${data.description}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container min-h-[80vh]">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={fname}
          type="text"
          placeholder="First Name"
          className="border"
        />
        <input
          ref={lname}
          type="text"
          placeholder="Last Name"
          className="border"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Checkout;

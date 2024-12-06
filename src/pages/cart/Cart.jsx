import React, { useState } from "react";
import Empty from "../../components/empty/Empty";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
import Promocode from "../../components/promocode/Promocode";

const Cart = () => {
  const navigate = useNavigate();
  const [promo, Setpromo] =useState({msg:"", error:false, success:true})
  const { cart, setCart } = useStateValue();
  const IncreasePrice = (product) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const DecreasePrice = (product) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, amount: item.amount > 0 ? item.amount - 1 : 0 }
            : item
        )
        .filter((item) => item.amount > 0)
    );
  };
  const handleDelete = (product) => {
    setCart((prev) => {
      return prev.filter((item) => item.id !== product.id);
    });
  };

  const totalp = cart
    ?.reduce((total, item) => total + item.price * item.amount, 0)
    .brm();

  return (
    <div className="min-h-[80vh] bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Your Cart
      </h2>
      {cart.length ? (
        <div className="flex container gap-4">
          <div className="space-y-4 flex-1">
            {cart?.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 bg-white shadow-md rounded-lg border border-gray-200"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    ${(item.price * item.amount).brm()}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => DecreasePrice(item)}
                      className="w-8 h-8 text-lg font-bold bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      -
                    </button>
                    <span className="text-gray-700 font-medium">
                      {item.amount}
                    </span>
                    <button
                      onClick={() => IncreasePrice(item)}
                      className="w-8 h-8 text-lg font-bold bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      +
                    </button>
                    <button
                      className="w-16 h-8 text-lg font-bold bg-red-400 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(item)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-md border border-gray-200 p-6 h-80 sticky top-[40%] rounded-lg shadow-lg bg-white">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Total Price: <span className="text-blue-500">${totalp}</span>
            </p>
            <Promocode />
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <Empty
          title="Savatingiz hozircha bo‘sh"
          url="https://uzum.uz/static/img/shopocat.490a4a1.png"
        />
      )}
    </div>
  );
};

export default Cart;

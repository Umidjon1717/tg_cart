import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingCart, HiMiniShoppingCart } from "react-icons/hi2";
import { useStateValue } from '../../context';
import { Swiper, SwiperSlide } from 'swiper/react';


const Products = ({ data, title }) => {
  const { setWishlist, wishlist, cart, setCart } = useStateValue();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLike = (product) => {
    const index = wishlist.findIndex(item => item.id === product.id);
    if (index < 0) {
      setWishlist(prev => [...prev, product]);
    } else {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
    }
  };

  const handleAddToCart = (product) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index < 0) {
      setCart(prev => [...prev, { ...product, amount: 1 }]);
    } else {
      setCart(prev => prev.filter(item => item.id !== product.id));
    }
  };

  const productItems = data?.map(product => (
    <div key={product.id} className="shadow p-3 rounded-lg border border-gray-200">
      <div className="w-full h-64 relative">
        <img
          className="w-full h-full object-contain cursor-pointer"
          src={product.thumbnail}
          alt={product.title}
          onClick={() => setSelectedProduct(product)} // Open modal with selected product
        />
        <button
          onClick={() => handleLike(product)}
          className="absolute top-3 right-3 text-xl text-red-500 hover:text-red-700"
        >
          {
            wishlist?.some(item => item.id === product.id)
              ? <FaHeart />
              : <FaRegHeart />
          }
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="absolute top-10 right-3 text-xl text-gray-600 hover:text-gray-800"
        >
          {
            cart?.some(item => item.id === product.id)
              ? <HiMiniShoppingCart />
              : <HiOutlineShoppingCart />
          }
        </button>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-lg text-gray-800">{product.title}</h3>
      </div>
    </div>
  ));

  return (
    <div className="container mx-auto px-4">
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productItems}
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)} // Close modal on backdrop click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-900"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>

            {/* Swiper for Product Gallery */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {/* Loop through additional images */}
              {selectedProduct.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`product image ${index + 1}`}
                    className="w-full h-64 object-contain rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Product Details */}
            <h3 className="text-xl font-semibold text-gray-900 mt-4">{selectedProduct.title}</h3>
            <p className="text-gray-700 mt-3">{selectedProduct.description}</p>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-5">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => handleLike(selectedProduct)}
              >
                {wishlist?.some(item => item.id === selectedProduct.id) ? 'Unlike' : 'Like'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

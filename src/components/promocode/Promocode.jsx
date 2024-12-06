import React, { memo, useRef } from "react";
import { PROMOCODES } from "../../static";

const Promocode = () => {
    const code = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (PROMOCODES.includes(code.current.value.toUpperCase())) {
            console.log('Congrats');
        } else {
            console.log('Eski ekan');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md"
        >
            <input
                ref={code}
                type="text"
                placeholder="Enter promo"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Send
            </button>
        </form>
    );
};

export default memo(Promocode);

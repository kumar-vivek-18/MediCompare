import React from "react";

const MedicineCard = ({ medicine }) => {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl cursor-pointer">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-t-lg">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 poppins-semibold">
            {medicine.name}
          </h2>
          <p className="text-sm text-gray-600 poppins-regular">
            {medicine.primary_use}
          </p>
        </div>
        <img
          className="h-16 w-16 object-cover rounded-md shadow-sm"
          src={medicine.image_url[0]}
          alt={medicine.name}
        />
      </div>

      {/* Content Section */}
      <div className="px-4 py-4">
        {/* Manufacturer Info */}
        <p className="text-sm text-gray-700 poppins-regular">
          <strong className="poppins-semibold">Manufacturer:</strong> {medicine.manufacturers}
        </p>
        {/* Price Info */}
        <p className="mt-2 text-lg font-semibold text-green-600 poppins-semibold">
          Rs. {medicine.price}
        </p>
        {/* Pack Info */}
        <p className="text-sm text-gray-700 poppins-regular">
          <strong className="poppins-semibold">Pack:</strong> {medicine.package_type}
        </p>

        {/* CTA Section */}
        <div className="mt-4 flex justify-center">
          <button className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 poppins-regular transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;

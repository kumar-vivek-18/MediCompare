import React, { useEffect, useState } from "react";

import Netmeds from "../../assets/netmeds.png";
import Pharmeasy from "../../assets/pharmeasy.png";
import TataMg from "../../assets/tata-1mg.png";
import axios from "axios";

const MedicineDetails = ({
  medicineData,
  pharmeasyPrice,
  netmedsPrice,
  tataMgPrice,
}) => {
  console.log(medicineData);
  const medicineName = medicineData?.name;
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // const fetchPharmeasyPrice = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://culturtap.com/test/puppetter/get-pharmeasy?uri=https://pharmeasy.in/search/all?name=${medicineName}`
  //     );
  //     console.log(response.data);
  //     setPharmeasyPrice(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPharmeasyPrice();
  // }, []);
  return (
    <div className="  bg-[#F1FAFE] w-screen flex items-center justify-center">
      <div className="w-screen max-w-[1200px] max-md:px-[20px] max-xl:px-[30px]">
        {/* Medicine Image */}
        <div className="flex flex-col  gap-[20px] justify-between items-center  bg-[#FDF7E8] pt-[20px] px-[20px]  md:px-[40px] rounded-[16px] shadow-lg">
          <img
            src={medicineData.image_url[0]}
            alt="Medicine"
            className="max-w-[200px] rounded-md shadow-lg"
          />
        </div>

        <div className="flex flex-col  gap-[20px] justify-between items-center pt-[20px] pb-[10px] mb-[10px] bg-[#FDF7E8] md:px-[40px] rounded-[16px] px-[20px] shadow-lg">
          <h1 className=" text-2xl md:text-3xl  poppins-bold">
            {medicineData.name}
          </h1>
          <div className="flex flex-row gap-[20px] justify-between items-center">
            <div className="flex flex-row gap-2">
              <p className="text-[14px] poppins-bold">Price:</p>
              <p className="text-[14px] poppins-semibold text-green-500">
                Rs. {medicineData.price}
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-[14px] poppins-bold">Form:</p>
              <p className="text-[14px] poppins-regular ">
                {medicineData.product_form}
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-[14px] poppins-bold">Quantity:</p>
              <p className="text-[14px] poppins-regular">
                {medicineData.quantity}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full   gap-[20px] justify-between items-center mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
         {netmedsPrice &&  <div className="flex flex-col gap-4 justify-center items-center">
            <img
              src={Netmeds}
              alt="Netmeds"
              className="w-[80px] md:w-[100px] h-[30px] md:h-[40px] object-cover "
            />
            <div className="flex flex-row gap-2">
              <p className="text-[14px] poppins-bold">Price:</p>
              <p className="text-[14px] poppins-bold text-green-500">
                Rs. {netmedsPrice}
              </p>
            </div>
          </div>
}
         {pharmeasyPrice && <div className="flex flex-col gap-4 justify-center items-center">
            <img
              src={Pharmeasy}
              alt="Pharmeasy"
              className="w-[80px] md:w-[100px] h-[30px] md:h-[40px] object-cover "
            />
            <div className="flex flex-row gap-2">
              <p className="text-[14px] poppins-bold">Price:</p>
              <p className="text-[14px] poppins-bold text-green-500">
                Rs. {pharmeasyPrice}
              </p>
            </div>
          </div>
}
          { tataMgPrice && <div className="flex flex-col gap-4 justify-center items-center">
            <img
              src={TataMg}
              alt="Tata1Mg"
              className="w-[80px] md:w-[100px] h-[30px] md:h-[40px] object-cover "
            />
            <div className="flex flex-row gap-1">
              <p className="text-[14px] poppins-bold">Price:</p>
              <p className="text-[14px] poppins-bold text-green-500">
                Rs. {tataMgPrice}
              </p>
            </div>
          </div>
}
        </div>
        <div className="flex flex-col gap-[20px] mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          {/* Manufacturer Section */}
          <div className="bg-[#F8ECFE] px-[20px] py-[15px] rounded-md border-l-[5px] border-[#9B59B6] shadow-md">
            <h1 className="text-[18px] poppins-semibold text-[#4A4A4A] mb-[8px]">
              Manufacturer
            </h1>
            <p className="text-[16px] poppins-regular text-gray-700 leading-[1.6]">
              {medicineData.manufacturers}
            </p>
          </div>

          {/* Primary Use Section */}
          <div className="bg-[#FFF4D1] px-[20px] py-[15px] rounded-md border-l-[5px] border-[#F39C12] shadow-md">
            <h1 className="text-[18px] poppins-semibold text-[#4A4A4A] mb-[8px]">
              Primary Use
            </h1>
            <p className="text-[16px] poppins-regular text-gray-700 leading-[1.6]">
              {medicineData.primary_use}
            </p>
          </div>

          <p className="text-gray-600 mb-4 text-[14px] poppins-regular">
            {medicineData.description}
          </p>
        </div>
        {/* Main Medicine Details */}

        {/* Introduction Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Introduction</h2>
          <p className="text-[14px] text-gray-800 poppins-regular">
            {medicineData.introduction}
          </p>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">How It Works</h2>
          <p className="text-[14px] text-gray-800 poppins-regular">
            {medicineData.how_it_works}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Benefits</h2>
          <p className="text-[14px] text-gray-800 poppins-regular">
            {medicineData.benefits}
          </p>
        </div>

        {/* Side Effects Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Common Side Effects</h2>
          <ul className="text-gray-800 list-disc pl-5">
            {medicineData.common_side_effect
              ?.split(" | ")
              .map((effect, index) => (
                <li
                  className="text-[14px] text-gray-800 poppins-regular"
                  key={index}
                >
                  {effect}
                </li>
              ))}
          </ul>
        </div>

        {/* Safety Advise Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Safety Advice</h2>
          <div className="text-gray-800">
            {medicineData.safety_advise.split(" | ").map((advice, index) => {
              const [title, description] = advice.split(": ");

              // Split the description into words and check if the first word is uppercase
              const modifiedDescription = description
                .split("  ")
                .map((part, index) => {
                  // Make uppercase starting words bold and add space
                  if (part.trim().toUpperCase() === part.trim()) {
                    return (
                      <span key={index}>
                        <strong
                          className="text-[14px] text-gray-800 poppins-regular"
                          style={{ marginRight: "8px" }}
                        >
                          {part.trim()} :
                        </strong>
                      </span>
                    );
                  }
                  return <span key={index}>{part.trim()} </span>;
                });

              return (
                <div key={index} className="mb-4">
                  <h3 className="text-[16px] poppins-semibold">
                    {title.trim()}
                  </h3>
                  <p className="text-[12px] text-gray-800 poppins-regular">
                    {modifiedDescription}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactions Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Interactions</h2>
          <ul className="text-[14px] text-gray-800 poppins-regular">
            <li>
              <strong>Alcohol:</strong> {medicineData.alcohol_interaction}
            </li>
            <li>
              <strong>Driving:</strong> {medicineData.driving_interaction}
            </li>
            <li>
              <strong>Kidney:</strong> {medicineData.kidney_interaction}
            </li>
            <li>
              <strong>Liver:</strong> {medicineData.liver_interaction}
            </li>
            <li>
              <strong>Lactation:</strong> {medicineData.lactation_interaction}
            </li>
          </ul>
        </div>

        {/* How To Use Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">How To Use</h2>
          <p className="text-[14px] text-gray-800 poppins-regular">
            {medicineData.how_to_use}
          </p>
        </div>

        {/* If Missed Dose Section */}
        <div className="flex flex-col   gap-[20px] justify-between  mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">If You Miss A Dose</h2>
          <p className="text-[14px] text-gray-800 poppins-regular">
            {medicineData.if_miss}
          </p>
        </div>

        {/* Fact Box Section */}
        <div className="flex flex-col gap-[20px] justify-between mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Fact Box</h2>

          {/* Key-Value Data Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {medicineData.fact_box.split("|").map((item, index) => {
              const [key, value] = item.split("::").map((str) => str.trim());
              return (
                <div
                  key={index}
                  className="flex flex-col bg-white p-[16px] rounded-[12px] shadow-md"
                >
                  <h3 className="text-[14px] text-gray-600 poppins-semibold">
                    {key}
                  </h3>
                  <p className="text-[16px] text-gray-900 poppins-medium">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Storage Section */}
        <div className="flex flex-col gap-[20px] justify-between mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">Storage</h2>
          <p className="text-[14px] text-gray-600 poppins-regular">
            {medicineData.storage}
          </p>
        </div>

        {/* Reference Section */}
        <div className="flex flex-col gap-[20px] justify-between mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">References</h2>

          {/* List of References */}
          <ul className="list-disc list-inside text-gray-800">
            {medicineData.reference.split("|").map((item, index) => (
              <li key={index} className="mb-2">
                <span className="text-[14px] text-gray-600 poppins-regular">
                  {item.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Section */}

        <div className="flex flex-col gap-[20px] justify-between mb-[10px] bg-[#E8FFE7] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
          <h2 className="text-[18px] poppins-semibold">
            Frequently Asked Questions
          </h2>
          <div className="text-gray-800">
            {medicineData.qa.split("|").map((qa, index) => {
              const [question, answer] = qa.split(":::");

              return (
                <div key={index} className="mb-4">
                  <div
                    className="cursor-pointer poppins-medium text-[14px] bg-gray-200 p-2 rounded-lg"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    } // Toggle the selected FAQ
                  >
                    <p className="poppins-medium text-[14px]">{question}</p>
                  </div>
                  {openIndex === index && (
                    <div className="p-4 mt-2 bg-gray-50 rounded-lg shadow-md">
                      <p className="text-[14px] text-gray-600 poppins-regular">
                        {answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;

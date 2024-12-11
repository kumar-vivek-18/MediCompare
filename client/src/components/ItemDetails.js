import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import MedicineDetails from "./utils/MedicineDetails";
import axios from "axios";

const ItemDetails = () => {
  const location = useLocation();
  const { medicineData} = location.state || {}; // Retrieve the data

  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const navigate=useNavigate();
  // console.log("medicine",medicineData,pharmeasyPrice,netmedsPrice,tataMgPrice)
  const medicineName=medicineData?.name;
  const [openIndex, setOpenIndex] = useState(null);
  const [pharmeasyPrice, setPharmeasyPrice] = useState("");
  const [netmedsPrice, setNetmedsPrice] = useState("");
  const [tataMgPrice, setTataMgPrice] = useState("");
  
  
  const fetchPharmeasyPrice = async (medicineName) => {
    try {
      const response = await axios.get(
        `http://localhost:6000/puppetter/get-pharmeasy?uri=https://pharmeasy.in/search/all?name=${medicineName} `
      );
      console.log("pharmeasy", response.data[0].price);
      return response.data[0].price; // Return the price directly
    } catch (error) {
      console.error(error);
      return null; // Return null if there's an error
    }
  };
  

  const fetchNetmedsPrice = async (medicineName) => {

    
    try {
      const response=await axios.get(
        `http://localhost:6000/puppetter/get-netmeds?uri=https://m.netmeds.com/catalogsearch/result/${medicineName}`
      )
      console.log("netmeds", response.data);
      return response.data;
     
      
 
      // return response.data[0].price
    } catch (error) {
      
      console.error(error);
      return null
    
    }
  };

  const fetchTataMgPrice=async(medicineName)=>{
    try{
      const response=await axios.get(
        `http://localhost:6000/puppetter/get-get1mg?uri=https://www.1mg.com/search/all?name=${medicineName}`
      )
      console.log("tataMg", response.data);
      return response.data;
      
    }catch(error){
      console.error("Error fetching tataMg price:", error);
      return null;
    }
  }

 

  const fetchItemDetails = async (itemId) => {
    try {
      const response = await fetch(`https://api.example.com/item/${itemId}`);
      const data = await response.json();
      setItem(data.item); // Assuming API returns item details in "item"
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const fetchRelatedItems = async (itemId) => {
    try {
      const response = await fetch(
        `https://api.example.com/related-items?itemId=${itemId}`
      );
      const data = await response.json();
      setRelatedItems(data.relatedItems); // Assuming API returns related items in "relatedItems"
    } catch (error) {
      console.error("Error fetching related items:", error);
    }
  };


  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pharmeasy = await fetchPharmeasyPrice(medicineName);
        const netmeds = await fetchNetmedsPrice(medicineName);
        const tataMg = await fetchTataMgPrice(medicineName);
        console.log("pharmeasyPrice", pharmeasy);
        setPharmeasyPrice(pharmeasy);
        setNetmedsPrice(netmeds)
        setTataMgPrice(tataMg);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
  
    fetchPrices();
  }, [medicineName]); 
  



  if (!medicineData) {
    return <p>No medicine data found!</p>; 
  }

  return (
    <div className="max-md:mt-[120px] mt-[80px] w-screen flex items-center justify-center">
      <div className="w-screen max-w-[1200px] max-md:px-[20px] max-xl:px-[30px]">
        
          
            <div className="flex items-center justify-center">
                <MedicineDetails medicineData={medicineData} pharmeasyPrice={pharmeasyPrice} netmedsPrice={netmedsPrice} tataMgPrice={tataMgPrice}/>
            </div>
            <div className="flex flex-col gap-[20px] justify-between mb-[10px] bg-[#F8ECFE] px-[20px] md:px-[80px] py-[40px] rounded-[16px] shadow-lg">
              <h2 className="text-xl font-semibold">Related Items</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
                {relatedItems?.map((relatedItem) => (
                  <li
                    key={relatedItem.id}
                    className="border p-4 rounded shadow hover:shadow-lg transition "
                    onClick={() => navigate(`/item/${relatedItem.id}`)} // Navigate to related item details
                  >
                    <h3 className="text-lg font-semibold">{relatedItem.name}</h3>
                    <p className="text-gray-600">{relatedItem.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          

      </div>
      
    </div>
  );
};

export default ItemDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MedicineCard from "./utils/MedicineCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  //   const { query } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const navigate = useNavigate();

  // const [pharmeasyPrice, setPharmeasyPrice] = useState("");
  // const [netmedsPrice, setNetmedsPrice] = useState("");
  // const [tataMgPrice, setTataMgPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    try {
      // console.log("searchQuery",searchQuery);
      await axios.get(
        `http://localhost:5000/medicine/search?searchQuery=${searchQuery}`
      ).then(response => {
        const data = response.data;
        // console.log("medicine data",data);
        setResults(data);
        setLoading(false);

      })

    } catch (error) {
      setLoading(false);
      console.error("Error fetching search results:", error);
    }
  };




  const handleNext = async (item) => {

    setIsLoading(true);
    try {


      navigate(`/item/${item._id}`, {
        state: {
          medicineData: item,
        },
      });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };


  //   const demoresults = [
  //     {
  //       id: 1,
  //       name: "Result 1",
  //       description:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit id metus rutrum pulvinar vel id nisi. Sed bibendum justo a purus lobortis, vel pharetra neque ornare.",
  //     },
  //     {
  //       id: 2,
  //       name: "Result 2",
  //       description:
  //         "Proin ut velit vel est dignissim consectetur. Nulla facilisi. Donec vel justo id metus rutrum pulvinar vel id nisi. Sed bibendum justo a purus lobortis, vel pharetra neque ornare.",
  //     },
  //     {
  //       id: 3,
  //       name: "Result 3",
  //       description:
  //         "Mauris et justo eu arcu luctus congue. Donec vel justo id metus rutrum pulvinar vel id nisi. Sed bibendum justo a purus lobortis, vel pharetra neque ornare.",
  //     },
  //     {
  //       id: 4,
  //       name: "Result 4",
  //       description:
  //         "Cras nec libero vel mauris semper tempus. Donec vel justo id metus rutrum pulvinar vel id nisi. Sed bibendum justo a purus lobortis, vel pharetra neque ornare.",
  //     },
  //   ];

  return (
    <div className="max-md:mt-[120px] mt-[80px] w-screen flex items-center justify-center">


      {!loading ? (<div className="w-screen max-w-[1200px] max-md:px-[20px] max-xl:px-[30px]">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Search Results for "{query}"
        </h1>
        {results && results?.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              //   <li
              //     key={item.id}
              //     className="border p-4 rounded shadow hover:shadow-lg transition"
              //     onClick={() => navigate(`/item/${item.id}`)}
              //   >
              //     <h2 className="text-lg font-semibold">{item.name}</h2>
              //     <p className="text-gray-600">{item.description}</p>
              //   </li>
              <li key={item._id} onClick={() => { handleNext(item) }} >
                <MedicineCard medicine={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 flex flex-col justify-center items-center gap-4">

            <p className="text-gray-700 text-center text-[16px] poppins-regular">No results found.</p>
            <Link to="/" className="bg-[#28A745]  py-4 px-8 rounded-md text-center text-white poppins-semibold" >Go Back to Home</Link>
          </div>
        )}
      </div>)
        : (
          <div className="flex flex-col items-center justify-center mt-[100px] gap-4">
            {/* Loader Animation */}
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#28A745] rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700">
              Loading search results...
            </p>
          </div>
        )
      }


    </div>
  );
};

export default SearchResults;

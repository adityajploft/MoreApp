// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setData, setLoading  ,saveProperty } from "../fetures/ProfileSlice/PropertySilce";
// import axios from "../utils/api";
// import { useNavigate } from "react-router-dom";

// const Property = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate
//   const { data, loading } = useSelector((state) => state.property);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/propertyList");
//       const data = response.data;
//       console.log("API response:", data);

//       dispatch(setData(data));
//       dispatch(setLoading(false));

//       const accessToken = data.accessToken;

//   //     if (accessToken) {
//   //       sessionStorage.setItem("accessToken", accessToken);
//   //     } else {
//   //       console.error("Access token not found in the response.");
//   //     }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const savePropertyDetails = async (propertyId) => {
//     try {
//       const url = "/saveProperty";

//       const accessToken = sessionStorage.getItem("accessToken");
//       console.log(accessToken, "hiiii");
//       if (accessToken) {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//         const response = await axios.post(url, { id: propertyId }, config);
//         const savedData = response.data; 
//         console.log('Property details saved:', savedData);
//         dispatch(saveProperty(savedData));
      
//       } else {
//         console.error('Access token not found.');
//       }
//     } catch (error) {
//       console.error('Error saving property details:', error);
//     }
//   };

//   if (loading || !data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <h2>Property Form</h2>
//       {data?.data?.map((property) => (
//         <div className="card mb-3" key={property.id}>
//           <div className="card-body">
//             <h3 className="card-title">Address: {property.address}</h3>
//             <h3 className="card-text">
//               Basement_sq_ft: {property.basement_sq_ft}
//             </h3>
//             <h3 className="card-text">Description:</h3>
//             <p className="card-text">{property.description}</p>
//             <p className="card-text">Price: {property.price}</p>
//             <p className="card-text">SellerEmail: {property.seller_email}</p>
//             <p className="card-text">SellerPhoneNo: {property.seller_phone}</p>
//             {selectedProperty === property ? (
//               <button onClick={() => savePropertyDetails(property.id)}>
//                 Save Details
//               </button>
//             ) : (
//               <button onClick={() => setSelectedProperty(property)}>
//                 Select Property
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


// export default Property;

// import axios from "../utils/api";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Logo from "../../src/assets/img/logo.png";
// import { Link } from "react-router-dom";

// import {
//   setUserData,
//   setUpdatedData,
//   setIsProfileUpdated,
//   setIsProfileShow,
//   isdeleteUserProfile,
// } from "../fetures/ProfileSlice/ProfileSlice.js";

// const Profile = () => {
//   const dispatch = useDispatch();
//   // const selector = useSelector()
//   const UserData = useSelector((state) => state.profile.userData);
//   //  console.log("hloooooooooo", UserData)
//   const updatedData = useSelector((state) => state.profile.updatedData);
//   const isProfileShow = useSelector((state) => state.profile.isProfileShow);
//   const isProfileUpdated = useSelector(
//     (state) => state.profile.isProfileUpdated
//   );
//   const isdelet = useSelector((state) => state.profile.isdelet);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const url = "/profile";
//         const accessToken = sessionStorage.getItem("accessToken");

//         if (accessToken) {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           };

//           const response = await axios.get(url, config);
//           console.log("gdfkshgkdsgkhg", response);
//           const data = response.data;
//           // console.log(data);

//           dispatch(setUserData(data));
//           console.log(data);

//           // automatically
//           dispatch(
//             setUpdatedData({
//               first_name: data?.data?.first_name || "",
//               last_name: data?.data?.last_name || "",
//               email: data?.data?.email || "",
//               mobile: data?.data?.mobile || "",
//             })
//           );
//           // dispatch(setIsProfileUpdated(true));
//         }
//       } catch (error) {
//         console.error(error, "Unable to access data");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const updateUserProfile = async () => {
//     try {
//       const url = "/profileUpdate";
//       const accessToken = sessionStorage.getItem("accessToken");

//       if (accessToken) {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };

//         const response = await axios.post(url, updatedData, config);
//         const data = response.data;

//         dispatch(setUserData(data));
//         dispatch(
//           setUpdatedData({
//             first_name: "",
//             last_name: "",
//             email: "",
//             mobile: "",
//           })
//         );
//         dispatch(setIsProfileUpdated(true));
//       }
//     } catch (error) {
//       console.error(error, "Unable to update user profile");
//     }
//   };

//   const deleteUserProfile = async () => {
//     try {
//       const url = "/deleteAccount";
//       const accessToken = sessionStorage.getItem("accessToken");

//       if (accessToken) {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };

//         await axios.get(url, config);
//         setUserData(null);

//         alert(
//           "item is delete successful Please generted a new token for login!!!"
//         );
//       }
//     } catch (error) {
//       console.error(error, "Unable to delete user profile");
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     dispatch(setUpdatedData({ ...updatedData, [name]: value }));
//   };

//   if (!UserData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//             <img src={Logo} alt="Logo" className="logo"  height={"100px"} width={"326px"}/>
//       {/* getting data like coming when OTP is verifie */}
//       <h2>Welcome, {UserData?.data?.first_name}</h2>
//       <h3>{UserData?.data?.last_name}</h3>
//       <h4>Email: {UserData?.data?.email}</h4>
//       <h5>Mobile Number: {UserData?.data?.mobile}</h5>
//       <button
//         className="btn btn-primary"
//         onClick={() => dispatch(setIsProfileShow(true))}
//       >
//         Show
//       </button>
//       <br />
//       {isProfileShow && (
//         <Link className="btn btn-primary" to="/property">Go To propertyList</Link>

//       ) } 

//       {/* Update Profile form */}
//       {isProfileShow && (
//         <form>
//           <h2>Update Form</h2>
//           <div className="form-group">
//             <label htmlFor="first_name">First Name:</label>
//             <input
//               className="form-control"
//               type="text"
//               id="first_name"
//               name="first_name"
//               value={updatedData.first_name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="last_name">Last Name:</label>
//             <input
//               className="form-control"
//               type="text"
//               id="last_name"
//               name="last_name"
//               value={updatedData.last_name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               className="form-control"
//               type="email"
//               id="email"
//               name="email"
//               value={updatedData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="mobile">Mobile Number:</label>
//             <input
//               className="form-control"
//               type="text"
//               id="mobile"
//               name="mobile"
//               value={updatedData.mobile}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button
//             className="btn btn-primary"
//             type="button"
//             onClick={updateUserProfile}
//           >
//             Update
//           </button>
//         </form>
//       )}

//       {/* Delete Profile button */}
//       {isProfileUpdated && (
//         <button
//           className="btn btn-danger mt-3"
//           type="button"
//           onClick={deleteUserProfile}
//         >
//           Delete Profile
//         </button>
//       )}
//     </div>
//   );
// };

// export default Profile;

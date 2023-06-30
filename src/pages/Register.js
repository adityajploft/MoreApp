// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Button } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import Iconify from '../components/iconify';
// import Logo from '../../src/assets/img/logo.png';
// import axios from '../utils/api';

// const Register = () => {
//   const navigate = useNavigate();
//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [registrationError, setRegistrationError] = useState(null);
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const [formCompleted, setFormCompleted] = useState(false);

//   useEffect(() => {
//     const isFormCompleted =
//       first_name !== '' &&
//       last_name !== '' &&
//       email !== '' &&
//       mobile !== '';

//     setFormCompleted(isFormCompleted);
//   }, [first_name, last_name, email, mobile]);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const user = {
//       first_name,
//       last_name,
//       email,
//       mobile,
//     };

//     try {
//       const response = await axios.post('/register', user);

//       if (response.status === 200) {
//         setRegistrationSuccess(true);
//         navigate('/otp');
//         setRegistrationError(null);
//         // Reset form
//         setFirstName('');
//         setLastName('');
//         setEmail('');
//         setMobile('');
//       } else {
//         setRegistrationError(response.data.message);
//         setRegistrationSuccess(false);
//       }
//     } catch (error) {
//       setRegistrationError('error');
//       setRegistrationSuccess(false);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <img src={Logo} alt="Logo" className="logo" width={'326px'} height={'100px'} />
//         <h1>Registration Page</h1>
//         <form onSubmit={handleRegister}>
//           <TextField
//             name="first_name"
//             label="First Name"
//             fullWidth
//             value={first_name}
//             onChange={(e) => setFirstName(e.target.value)}
//           />

//           <TextField
//             name="last_name"
//             label="Last Name"
//             fullWidth
//             value={last_name}
//             onChange={(e) => setLastName(e.target.value)}
//           />

//           <TextField
//             name="email"
//             label="Email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <TextField
//             name="mobile"
//             label="Mobile"
//             fullWidth
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />

//           <Button variant="contained" type="submit" disabled={!formCompleted}>
//             Register
//           </Button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Register;

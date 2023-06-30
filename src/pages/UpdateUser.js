import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';
import { Link, Stack, IconButton, InputAdornment, Checkbox } from '@mui/material';
import Logo from '../../src/assets/img/logo.png';
import useResponsive from '../hooks/useResponsive';
import "./updateUser.css"
import {
  setUserData,
  setUpdatedData,
  setIsProfileUpdated,
  fetchUserData,
} from '../fetures/ProfileSlice/ProfileSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

function UpdateProfile() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);
  const updatedData = useSelector((state) => state.profile.updatedData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = '/profile';
        const accessToken = sessionStorage.getItem('accessToken');

        if (accessToken) {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };

          const response = await axios.get(url, config);
          const data = response.data;

          dispatch(setUserData(data));
          dispatch(
            setUpdatedData({
              first_name: data?.data?.first_name || '',
              last_name: data?.data?.last_name || '',
              email: data?.data?.email || '',
              mobile: data?.data?.mobile || '',
            })
          );
        }
      } catch (error) {
        console.error('Unable to access data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setUpdatedData({ ...updatedData, [name]: value }));
  };

  const handleUpdateProfile = async () => {

    try {
      const url = '/profileUpdate';
      const accessToken = sessionStorage.getItem('accessToken');

      if (accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.post(url, updatedData, config);
        const data = response?.data;
        console.log(data,"hlooooooii")

        dispatch(setUserData(data));
        toast.success('Profile updated successfully');
       
        dispatch(
          setUpdatedData({
            first_name: '',
            last_name: '',
            email: '',
            mobile: '',
          })
        );
     
      
        dispatch(setIsProfileUpdated(true));
      
      
    

        navigate('/dashboard/user');
      }
    } catch (error) {
      console.error(error, 'Unable to update user profile');
      // Show error toast notification
      toast.error('Failed to update profile');
    }
  };

  return (
    <StyledRoot>
      {mdUp && (
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
             <h3>Welcome,{userData?.data?.first_name}</h3>  Can You Upadte Your Profile ?
          </Typography>
          <img src="/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>
      )}
      <StyledContent>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-right">
                <img src={Logo} alt="Logo" className="logo" height={'100px'} width={'326px'} />
                {/* getting data like coming when OTP is verified */}
               
              </div>
            </div>
            <div className='main'>
            <div className="col-md-12">
              {/* Update Profile form */}
              <form className="form">
                <h2>Update Form</h2>
                <Stack spacing={3}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    name="first_name"
                    value={updatedData.first_name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    name="last_name"
                    value={updatedData.last_name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={updatedData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    name="mobile"
                    value={updatedData.mobile}
                    onChange={handleInputChange}
                  />
                  <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                    Update
                  </Button>
                </Stack>
              </form>
            </div>
            </div>
           
          </div>
          <ToastContainer />
        </div>
      </StyledContent>
    </StyledRoot>
  );
}

export default UpdateProfile;

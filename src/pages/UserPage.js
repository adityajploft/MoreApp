import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';


import 'react-toastify/dist/ReactToastify.css'

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// Sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// Mock data
import USERLIST from '../_mock/user';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setUserData,
  setUpdatedData,
} from '../fetures/ProfileSlice/ProfileSlice.js';
import { Navigate, useNavigate } from 'react-router-dom';

const TABLE_HEAD = [
  { id: 'first_name', label: 'FirstName' },
  { id: 'last_name', label: 'LastName' },
  { id: 'mobile', label: 'MobileNumber' },
  { id: 'email', label: 'Email' },
  { id: 'role_id', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'updated_at', label: 'UpdatedAt' },
  { id: '' },
];

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state.profile.userData);
  const isProfileShow = useSelector((state) => state.profile.isProfileShow);
  const updatedData = useSelector((state) => state.profile.updatedData);
  const isProfileUpdated = useSelector((state) => state.profile.isProfileUpdated);



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

          setUserData(data);
          setShowUpdateMessage(true);
          toast.success('Profile updated successfully');
        

          dispatch(setUserData(data));
          // toast.success('Profile updated successfully');
          
          dispatch(
            setUpdatedData({
              first_name: data?.data?.first_name || '',
              last_name: data?.data?.last_name || '',
              email: data?.data?.email || '',
              mobile: data?.data?.mobile || '',
              profile_image: data?.data?.profile_image || null,
            })
          );
        }
        // toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Unable to access data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [showOptions, setShowOptions] = useState(false);

  const handleIconButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setUpdatedData({
        ...updatedData,
        [name]: value,
      })
    );
  };

  const deleteUserProfile = () => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const url = '/deleteAccount';
              const accessToken = sessionStorage.getItem('accessToken');

              if (accessToken) {
                const config = {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                };

                await axios.get(url, config);
                
                toast.success('Item deleted successfully. Please generate a new token for login!');
                setUserData(null);
                Navigate('/redirect-page');
              }
            } catch (error) {
              console.error('Unable to delete user profile:', error);
              toast.error('Failed to delete item.');
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
          },
        },
      ],
    });
  };

  const handleUpdateButtonClick = () => {


    Navigate('/updateProfile');
  };

  return (
    <>
      <Helmet>
        <title>User Profile | My App</title>
      </Helmet>

      {showUpdateMessage && userData && (
        <div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <ToastContainer />
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
          </Stack>

          <Card>
            <Stack spacing={2} p={4}>
            <ToastContainer />
              <Avatar alt={userData?.data?.first_name} src={userData?.data?.profile_image} />
              <Typography variant="h6" gutterBottom>
                {userData?.data?.first_name} {userData?.data?.last_name}
              </Typography>
              <Typography variant="body1">Email: {userData?.data?.email}</Typography>
              <Typography variant="body1">Mobile Number: {userData?.data?.mobile}</Typography>
              </Stack>
          
          </Card>
          <br/>

          <Card>
          <Stack spacing={8} p={8}>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {userData && (
                      <TableRow>
                        {TABLE_HEAD.map((headItem) => (
                          <TableCell key={headItem.id}>
                            {headItem.id === 'name' ? (
                              <>
                                <Typography variant="h2" gutterBottom>
                                  {userData?.data?.first_name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                  {userData?.data?.last_name}
                                </Typography>
                                <Typography variant="body1">Email: {userData?.data?.email}</Typography>
                                <Typography variant="body1">Mobile Number: {userData?.data?.mobile}</Typography>
                              </>
                            ) : (
                              <Label alignRight={headItem.alignRight}>
                                {userData?.data?.[headItem.id]}
                              </Label>
                            )}
                          </TableCell>
                        ))}
                        <TableCell align="right">
                          <IconButton onClick={handleIconButtonClick}>
                            <Iconify icon="eva:more-vertical-fill" />
                          </IconButton>
                          {showOptions && (
                            <div>
                              <Button onClick={handleUpdateButtonClick}>Update</Button>
                              <Button onClick={deleteUserProfile}>Delete</Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
            </Stack>
          </Card>
        </div>
      )}

      <ToastContainer /> {/* Toast container to display toast messages */}
    </>
  );
}

export default UserProfile;

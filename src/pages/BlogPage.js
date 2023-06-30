import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

// import './BlogPage.css'; // Import your custom CSS file

export default function BlogPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/propertyList');
      const data = response.data;
      console.log('API response:', data);

      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const savePropertyDetails = async (propertyId) => {
    try {
      const url = '/saveProperty';
      const accessToken = sessionStorage.getItem('accessToken');
      console.log(accessToken, 'hiiii');

      if (accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.post(url, { id: propertyId }, config);
        const savedData = response.data;
        console.log('Property details saved:', savedData);
        toast.success('Property details saved successfully.');
      } else {
        console.error('Access token not found.');
      }
    } catch (error) {
      console.error('Error saving property details:', error);
      toast.error('Failed to save property details.');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedData = Array.from(data);
    const [movedItem] = updatedData.splice(result.source.index, 1); 
    updatedData.splice(result.destination.index, 0, movedItem);

    setData(updatedData); 
  };

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Blog Page</title>
      </Helmet>

      <div className="container">
        <h2>Property Lists</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="propertyList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Card className="property-card">
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="table-header">SR. NO.</TableCell>
                          <TableCell className="table-header">USER</TableCell>
                          <TableCell className="table-header">PROPERTY DESCRIPTION</TableCell>
                          <TableCell className="table-header">ADDRESS</TableCell>
                          <TableCell className="table-header">STATUS</TableCell>
                          <TableCell className="table-header">PRICE</TableCell>
                          <TableCell className="table-header">HOME TYPE</TableCell>
                          <TableCell className="table-header">STRUCTURAL REMODEL YEAR</TableCell>
                          <TableCell className="table-header">ACTIONS</TableCell>
                        </TableRow>
                        {data?.data?.map((property, index) => (
                          <Draggable key={property.id} draggableId={property.id} index={index}>
                            {(provided) => (
                              <TableRow
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{property.user_id}</TableCell>
                                <TableCell>
                                  <p className="property-description">{property.description}</p>
                                </TableCell>
                                <TableCell>
                                  <p className="property-address">{property?.address}</p>
                                  {/* Other property details */}
                                </TableCell>
                                <TableCell>{property?.status}</TableCell>
                                <TableCell>{property?.price}</TableCell>
                                <TableCell>{property?.home_type}</TableCell>
                                <TableCell>{property?.structural_remodel_year}</TableCell>
                                <TableCell>
                                  <Button variant="primary" 
                                    className="save-button"
                                    onClick={() => savePropertyDetails(property.id)}
                                  >
                                    Save
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <ToastContainer />
    </>
  );
}

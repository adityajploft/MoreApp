import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Iconify from '../components/iconify';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  useEffect(() => {
    // toast.success('Otp successfully');
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome To Dashboard ,
          Login <ToastContainer /> Times
          {/* {/* {toast.success('Otp successfully')} */}
        {/* {toast.success('Otp successfully')} */}
  
          {/* {toast.success('Otp successfully')} Successful Times */}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active User" total={10} icon={'ant-design:android-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Inactive Users" total={5} color="info" icon={'ant-design:inactive-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Property" total={100} color="warning" icon={'ant-design:property-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Sliders" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

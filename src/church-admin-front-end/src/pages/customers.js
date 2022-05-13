import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useEffect, useState} from 'react';
import axios from "axios";

const Customers = function () {

  const [membros, setMembro] = useState([])

  async function getMembros() {
    const baseURL = "https://localhost:5001/v1/ListarMembros"
    await axios.get(baseURL).then((response) => {
        console.log(response.data)
        setMembro(response.data)
      });
  }

  useEffect(() => {
    getMembros()
  }, []); 

  return (
    <>
      <Head>
        <title>
          Customers
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={membros} />
          </Box>
        </Container>
      </Box>
    </>
  );
} 
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;

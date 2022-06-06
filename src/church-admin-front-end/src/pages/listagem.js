import Head from 'next/head';
import { Box, Container, Backdrop, CircularProgress } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useEffect, useState} from 'react';
import axios from "axios";

const Listagem = function () {

  const [membros, setMembro] = useState([])
  const [loading, setLoading] = useState(true)

  async function getMembros() {
    const baseURL = "https://localhost:5001/v1/ListarMembros"
    await axios.get(baseURL).then((response) => {
        console.log(response.data)
        setTimeout(() => setMembro(response.data), 300)
      });
    setLoading(false)
  }

  useEffect(() => {
    getMembros()
  }, []); 

  return (
    <>
    {!loading ? (
      <>
        <Head>
          <title>
            Listagem | Church Admin
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
    ) : (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
} 
Listagem.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Listagem;

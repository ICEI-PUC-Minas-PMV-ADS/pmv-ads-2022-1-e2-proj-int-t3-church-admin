import Head from 'next/head';
import { Box, Container, Grid, Backdrop, CircularProgress } from '@mui/material';
import { TotalDeIgrejas } from '../components/dashboard/total-de-igrejas';
import { Recentes } from '../components/dashboard/recentes';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalMembros } from '../components/dashboard/total-membros';
import { TotalBatismo } from 'src/components/dashboard/total-batismo';
import { NaoBatizados } from '../components/dashboard/nao-batizados';
import { DadosDeBatismo } from '../components/dashboard/dados-de-batismo';
import { DashboardLayout } from '../components/dashboard-layout';
import {useEffect, useState} from 'react';
import axios from "axios";

const Dashboard = function () {

  const [loading, setLoading] = useState(true)

  const [membros, setMembro] = useState([])
  const [igrejas, setIgrejas] = useState([])
  const [percent, setPercent] = useState({})
  const [batizados, setBatizados] = useState("")
  const [naoBatizados, setNaoBatizados] = useState("")

  async function getData() {
    const baseURL = "https://localhost:5001/v1/ListarMembros"
    const urlIgrejas = "https://localhost:5001/v1/ListarIgrejas"
    await axios.get(baseURL).then((response) => {
        setTimeout(() => {
          const data = response.data
          const totalMembros =  data.length 
          const totalBatizados = calcTotalBatizados(data)
          const naoBatizados = totalMembros - totalBatizados
          const percentBatismo = calcPercentBatizados(totalMembros, totalBatizados)

          console.log(membros)
          setBatizados(totalBatizados)
          setNaoBatizados(naoBatizados)
          setPercent(percentBatismo)
          setMembro(data)
        }, 300)
      });
    await axios.get(urlIgrejas).then((response) => {
      setTimeout(() => setIgrejas(response.data), 300)
    });

    setLoading(false)
  }

  function calcTotalBatizados(membros) {
    
    let total = membros.map(membro => {
        if(membro.dataBatismoAguas) {
          return membro.dataBatismoAguas
        }
     })
     return total.length;
  }

  function calcPercentBatizados(totalMembros, TotalBatizados) {
      return  {
        batizados: (TotalBatizados / totalMembros) * 100,
        naoBatizados:  ((TotalBatizados / totalMembros) * 100) - 100
      }
  }

  useEffect(() => {
    getData()
  }, []); 

  return (
    <>
    {loading ? (
      <>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    ): (
      <>
       <Head>
        <title>
          Dashboard
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
             <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalMembros values={membros} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalDeIgrejas values={igrejas} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalBatismo values={batizados} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <NaoBatizados values={naoBatizados} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Recentes values={membros} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <DadosDeBatismo values={percent} sx={{ height: '100%' }} />
            </Grid>
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <LatestProducts sx={{ height: '100%' }} />
            </Grid> */}
            {/* <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestOrders />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
      </>
    )}
    </>
  );
} 

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;

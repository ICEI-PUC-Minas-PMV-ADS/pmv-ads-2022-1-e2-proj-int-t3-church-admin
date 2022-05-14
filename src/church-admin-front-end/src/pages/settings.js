import Head from 'next/head';
import { Box, Container, Typography, Grid, TextField, Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsNotifications } from '../components/settings/settings-notifications';
import { SettingsPassword } from '../components/settings/settings-password';
import {useEffect, useState} from 'react';

const data = {
  "matricula": 23,
  "cpf": "00000000000",
  "nome": "Pedro da Silva Souza",
  "cep": "275800000",
  "endereco": "Rua 2",
  "numero": 43,
  "complemento": "Apartamento",
  "bairro": "Campo Alegre",
  "municipio": "Itatiaia",
  "estado": "RJ",
  "email": "pedro@gmail.com",
  "fone": "21975120394",
  "sexo": "M",
  "nascimento": "21031996",
  "naturalidade": "brasileiro",
  "estadoCivil": "solteiro",
  "profissao": "médico",
  "dataBatismoAguas": "03052006",
  "cargoIgreja": "membro",
  "igrejaID": 2,
  "status": true
}

const Settings = () => {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)

  async function getStorageInformations() {
   let membro = JSON.parse(await localStorage.getItem("selected"))
  //  JSON.parse(await localStorage.getItem("current"))
  setUserData({
    nome: membro.nome,
    email: membro.email,
    fone: membro.fone,
    nascimento: membro.nascimento,
    profissao: membro.profissao,
    sexo: membro.sexo,
    estadoCivil: membro.estadoCivil,
    cpf: membro.cpf,
    naturalidade: membro.naturalidade,
    cep: membro.cep,
    endereco: membro.endereco,
    numero: membro.numero,
    complemento: membro.complemento,
    bairro: membro.bairro,
    municipio: membro.municipio,
    batismo: membro.batismo,
    estado: membro.estado,
    igrejaID: membro.igrejaID,
    cargoIgreja: membro.cargoIgreja,
    dataBatismoAguas: membro.dataBatismoAguas,
    })
    setTimeout(() => setLoading(false), 500)
  }

useEffect(() => {
    getStorageInformations()
  }, []); 

  return (
    <>
    {loading ? (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      <>
        <Head>
        <title>
          Products | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
          <Container maxWidth={true}>
              <h1 style={{marginBottom: 30}}>{userData.nome}</h1>

              <Grid container spacing={2} >
                <Grid item xs={6} style={{borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5}}>
                    <h2 style={{marginBottom: 25}}>Informações Pessoais</h2>
                    <TextField 
                      fullWidth
                      id="outlined-basic"
                      label="Nome Completo"
                      variant="outlined" 
                      style={{marginBottom: 25}}
                      name="nome"
                      value={userData.nome || ""}
                      ReadOnly
                      // disabled={true}
                      // value={formValue.nome}
                      // onChange={handleChange}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="email"
                        value={userData.email || ""}
                        ReadOnly
                        // disabled={true}
                        // value={formValue.nome}
                        // onChange={handleChange}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Telefone"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="fone"
                        value={userData.fone || ""}
                        ReadOnly
                        // disabled={true}
                        // value={formValue.nome}
                        // onChange={handleChange}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Data de Nascimento"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="nascimento"
                        value={userData.nascimento || ""}
                        ReadOnly
                        // disabled={true}
                        // value={formValue.nome}
                        // onChange={handleChange}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Profissão"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="profissao"
                        value={userData.profissao || ""}
                        ReadOnly
                        // disabled={true}
                        // value={formValue.nome}
                        // onChange={handleChange}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Sexo"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="sexo"
                        value={userData.sexo === "M" ? "Masculino" : "Feminino"}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Status de batismo"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="batismo"
                        value={userData.dataBatismoAguas ? "Batizado" : "Não Batizado"}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Estado Civil"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="estadoCivil"
                        value={userData.estadoCivil || ""}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="CPF"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="cpf"
                        value={userData.cpf || ""}
                      />
                      <TextField 
                        fullWidth
                        id="outlined-basic"
                        label="Naturalidade"
                        variant="outlined" 
                        style={{marginBottom: 25}}
                        name="naturalidade"
                        value={userData.naturalidade || ""}
                      />
                </Grid>
                <Grid item xs={6} style={{borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5}}>
                              <h2 style={{marginBottom: 25}}>Localização</h2>
                              <TextField 
                                fullWidth
                                id="outlined-basic"
                                label="CEP"
                                variant="outlined" 
                                style={{marginBottom: 25}}
                                name="cep"
                                value={userData.cep || ""}
                              />
                              <TextField 
                                fullWidth
                                id="outlined-basic"
                                label="Endereço"
                                variant="outlined" 
                                style={{marginBottom: 25}}
                                name="endereco"
                                value={userData.endereco || ""}
                              />
                              <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                                  <TextField id="outlined-basic" label="Número" variant="outlined" name="numero" style={{width: "48%"}} value={userData.numero || ""} />
                                  <TextField id="outlined-basic" label="Complemento" variant="outlined" name="complemento" style={{width: "48%"}} value={userData.complemento || ""} />
                              </Grid>
                              <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                                  <TextField id="outlined-basic" label="Bairro" variant="outlined" name="bairro" style={{width: "48%"}} value={userData.bairro || ""} />
                                  <TextField id="outlined-basic" label="Município" variant="outlined" name="municipio" style={{width: "48%"}} value={userData.municipio || ""} />
                              </Grid>
                              <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                                  <TextField id="outlined-basic" label="Estado" variant="outlined" name="estado" style={{width: "48%"}} value={userData.estado || ""} />
                                  <TextField id="outlined-basic" label="Congregação" variant="outlined" name="igrejaID" style={{width: "48%"}} value={"Filial"} />
                              </Grid>

                              <Grid item xs={12} style={{borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5}}>
                                <h2 style={{marginTop: 25, marginBottom: 25}}>Dados Eclesiásticos</h2>
                                <TextField fullWidth id="outlined-basic" label="Cargo Ministerial" variant="outlined" name="cargoIgreja" style={{marginBottom: 25}} value={userData.cargoIgreja || ""}/>
                                <TextField fullWidth id="outlined-basic" label="Data de Batismo" variant="outlined" name="dataBatismoAguas" value={userData.dataBatismoAguas || ""}/>
                              </Grid> 
                  </Grid>
              </Grid>
          </Container>
      </Box>
      </>
    )}
  </>
  );
}

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;

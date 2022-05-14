import * as React from 'react';
import {useEffect, useState} from 'react';
import Head from 'next/head';
import { Box, Container, OutlinedInput, Grid, TextField, Item, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, InputLabel, Select, MenuItem, Button, Backdrop, CircularProgress} from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';

import axios from "axios";

const Products = function () {

    const [membro, setMembro] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updateMode, setUpdateMode] = useState(false)
    const [formValue, setFormValue] = useState({
        nome: "",
        email: "",
        fone: "",
        nascimento: "",
        profissao: "",
        sexo: "",
        estadoCivil: "",
        cpf: "",
        naturalidade: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        municipio: "",
        batismo: "",
        estado: "",
        igrejaID: 2,
        cargoIgreja: "",
        dataBatismoAguas: "",
        status: true
      });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
            ...prevState,
            [name]: value,
            };
        });
    };

    async function getStorageInformations() {
       let membro = JSON.parse(await localStorage.getItem("current"))
       if(membro) {
        setFormValue({
            matricula: membro.matricula,
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
        setUpdateMode(true)
        localStorage.removeItem("current");
       }
       setTimeout(() => setLoading(false), 500)
    }

    useEffect(() => {
        getStorageInformations()
      }, []); 
    
    async function save() {
        setLoading(true)
        const baseURL = "https://localhost:5001/v1/CadastrarMembro"
        const baseURL_UPDATE = "https://localhost:5001/v1/AtualizarMembro"
        const headers =  {
            "access-control-allow-credentials": true, 
            "access-control-allow-headers": "*" ,
            "access-control-allow-methods": "*", 
            "access-control-allow-origin": "https://localhost:5001",
            "access-control-expose-headers": "*" ,
            "content-type": "application/problem+json"   
        };

        if(updateMode) {
            await axios.put(baseURL_UPDATE, formValue, {headers})
            .then(response => {console.log(response.data)});
            document.location.reload(true)
        } else {
            await axios.post(baseURL, formValue, {headers})
            .then((response) => {console.log(response.data)});
            setTimeout(() => setLoading(false), 500)
            document.location.reload(true)
        }
    }

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
              <Container maxWidth={false}>
                  <h1 onClick={() =>  console.log(">>>>> updateMode: ", updateMode)} style={{marginBottom: 30}}>Cadastrar</h1>
      
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
                            value={formValue.nome}
                            onChange={handleChange}
                            />
                            <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="E-mail"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                            />
                             <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="fone"
                            value={formValue.fone}
                            onChange={handleChange}
                            />
                             <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="Data de Nascimento"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="nascimento"
                            value={formValue.nascimento}
                            onChange={handleChange}
                            />
                             <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="Profissão"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="profissao"
                            value={formValue.profissao}
                            onChange={handleChange}
                            />
      
                          <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                              <FormControl>
                                  <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
                                  <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        row
                                        value={formValue.sexo}
                                  >
                                      <FormControlLabel value="F" control={<Radio />} label="Feminino"  onChange={handleChange} name="sexo" />
                                      <FormControlLabel value="M" control={<Radio />} label="Masculino" onChange={handleChange} name="sexo" />
                                  </RadioGroup>
                              </FormControl>
      
                              <FormControl style={{width: '55%'}}>
                                  <InputLabel id="demo-simple-select-autowidth-label">Status de Batismo</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-autowidth-label"
                                      id="demo-simple-select-autowidth"
                                      value={updateMode ? formValue.dataBatismoAguas ? "sim" : "nao" : formValue.batismo}
                                      input={<OutlinedInput label="Status de Batismo" />}
                                      label="Age"
                                      onChange={handleChange}
                                      name="batismo"
                                  >
                                      <MenuItem value={"sim"}>Batizado</MenuItem>
                                      <MenuItem value={"nao"}>Não batizado</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
      
                          <FormControl fullWidth style={{marginBottom: 25}}>
                              <InputLabel id="demo-simple-select-label">Estado Civil</InputLabel>
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={formValue.estadoCivil}
                                  input={<OutlinedInput label="Estado Civil" />}
                                  label="Age"
                                  name="estadoCivil"
                                  onChange={handleChange}
                              >
                                  <MenuItem value={"solteiro"}>Solteiro</MenuItem>
                                  <MenuItem value={"casado"}>Casado</MenuItem>
                                  <MenuItem value={"divorciado"}>Divorciado</MenuItem>
                                  <MenuItem value={"viuvo"}>Viúvo</MenuItem>
                              </Select>
                          </FormControl>
      
                          <TextField fullWidth id="outlined-basic" label="CPF" variant="outlined" name="cpf" onChange={handleChange} style={{marginBottom: 25}} value={formValue.cpf}/>
                          <TextField fullWidth id="outlined-basic" label="Naturalidade" variant="outlined" name="naturalidade" onChange={handleChange} value={formValue.naturalidade} />
                      </Grid>
                      <Grid item xs={6} style={{borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5}}>
                          <h2 style={{marginBottom: 25}}>Localização</h2>
                          <TextField fullWidth id="outlined-basic" label="CEP" variant="outlined" name="cep" onChange={handleChange} style={{marginBottom: 25}} value={formValue.cep} />
                          <TextField fullWidth id="outlined-basic" label="Endereço" variant="outlined" name="endereco" onChange={handleChange} style={{marginBottom: 25}} value={formValue.endereco}/>
      
                          <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                              <TextField id="outlined-basic" label="Número" variant="outlined" name="numero" onChange={handleChange} style={{width: "48%"}} value={formValue.numero} />
                              <TextField id="outlined-basic" label="Complemento" variant="outlined" name="complemento" onChange={handleChange} style={{width: "48%"}} value={formValue.complemento} />
                          </Grid>
                          <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                              <TextField id="outlined-basic" label="Bairro" variant="outlined" name="bairro" onChange={handleChange} style={{width: "48%"}} value={formValue.bairro} />
                              <TextField id="outlined-basic" label="Município" variant="outlined" name="municipio" onChange={handleChange} style={{width: "48%"}} value={formValue.municipio} />
                          </Grid>
                          <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                              <FormControl style={{width: "48%"}}>
                                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={formValue.estado}
                                      input={<OutlinedInput label="Estado" />}
                                      label="Age"
                                      name="estado"
                                      onChange={handleChange}
                                  >
                                      <MenuItem value={"RJ"}>RJ</MenuItem>
                                      <MenuItem value={"SP"}>SP</MenuItem>
                                      <MenuItem value={"MG"}>MG</MenuItem>
                                  </Select>
                              </FormControl>
                              
                              <FormControl style={{width: "48%"}}>
                                  <InputLabel id="demo-simple-select-label">Congregação</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={formValue.igrejaID}
                                      input={<OutlinedInput label="Congregação" />}
                                      label="Age"
                                      name="igrejaID"
                                      onChange={handleChange}
                                  >
                                      <MenuItem value={2}>Matriz</MenuItem>
                                      <MenuItem value={2}>Filial</MenuItem>
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12} style={{borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5}}>
                             <h2 style={{marginTop: 25, marginBottom: 25}}>Dados Eclesiásticos</h2>
                             <TextField fullWidth id="outlined-basic" label="Cargo Ministerial" variant="outlined" name="cargoIgreja" onChange={handleChange} style={{marginBottom: 25}} value={formValue.cargoIgreja}/>
                             <TextField fullWidth id="outlined-basic" label="Data de Batismo" variant="outlined" name="dataBatismoAguas" onChange={handleChange} value={formValue.dataBatismoAguas}/>
                             <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", marginTop: 20}}>
                                <Button onClick={save} variant="contained">Salvar</Button>
                             </Grid>
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

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;

import * as React from 'react';
import {useEffect, useState} from 'react';
import Head from 'next/head';
import { Box, Container, OutlinedInput, Grid, TextField, Item, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, InputLabel, Select, MenuItem, Button} from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';

import axios from "axios";

const Products = function () {

    async function test() {
        const { name, email, sexo } = formValue;
        console.log(">>>>>> ", formValue)
    }

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

    //   "cpf": "126.728.420-00",
    //   "nome": "Kaio",
    //   "cep": "49026-209",
    //   "endereco": "Rua Y",
    //   "numero": 20,
    //   "complemento": "-",
    //   "bairro": "Jardins",
    //   "municipio": "Aracaju",
    //   "estado": "SP",
    //   "email": "kaio@email",
    //   "fone": "3333-3333",
    //   "sexo": "M",
    //   "nascimento": "05/05/05",
    //   "naturalidade": "Aracaju",
    //   "estadoCivil": "Casado",
    //   "profissao": "Músico",
    //   "dataBatismoAguas": "02/01/2022",
    //   "cargoIgreja": "Músico",
    //   "igrejaID": 2,
    //   "status": true
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
            ...prevState,
            [name]: value,
            };
        });
    };
    
    async function save() {
        const baseURL = "https://localhost:5001/v1/CadastrarMembro"
        const headers =  {
            "access-control-allow-credentials": true, 
            "access-control-allow-headers": "*" ,
            "access-control-allow-methods": "*", 
            "access-control-allow-origin": "https://localhost:5001",
            "access-control-expose-headers": "*" ,
            "content-type": "application/problem+json"   
        };
        console.log(formValue)
        await axios.post(baseURL, formValue, {headers})
        .then((response) => {console.log(response.data)});
    }

    return (
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
                  <h1 onClick={test} style={{marginBottom: 30}}>Cadastrar</h1>
      
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
                            onChange={handleChange}
                            />
                            <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="E-mail"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="email"
                            onChange={handleChange}
                            />
                             <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="fone"
                            onChange={handleChange}
                            />
                             <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="Data de Nascimento"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="nascimento"
                            onChange={handleChange}
                            />
                             <TextField 
                            fullWidth
                            id="outlined-basic"
                            label="Profissão"
                            variant="outlined" 
                            style={{marginBottom: 25}}
                            name="profissao"
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
                                      value={formValue.batismo}
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
      
                          <TextField fullWidth id="outlined-basic" label="CPF" variant="outlined" name="cpf" onChange={handleChange} style={{marginBottom: 25}} />
                          <TextField fullWidth id="outlined-basic" label="Naturalidade" variant="outlined" name="naturalidade" onChange={handleChange} />
                      </Grid>
                      <Grid item xs={6} style={{borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5}}>
                          <h2 style={{marginBottom: 25}}>Localização</h2>
                          <TextField fullWidth id="outlined-basic" label="CEP" variant="outlined" name="cep" onChange={handleChange} style={{marginBottom: 25}} />
                          <TextField fullWidth id="outlined-basic" label="Endereço" variant="outlined" name="endereco" onChange={handleChange} style={{marginBottom: 25}}/>
      
                          <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                              <TextField id="outlined-basic" label="Número" variant="outlined" name="numero" onChange={handleChange} style={{marginBottom: 25, width: "48%"}} />
                              <TextField id="outlined-basic" label="Complemento" variant="outlined" name="complemento" onChange={handleChange} style={{marginBottom: 25, width: "48%"}} />
                          </Grid>
                          <Grid item xs={12} style={{display: "flex", justifyContent: "space-between", marginBottom: 25}}>
                              <TextField id="outlined-basic" label="Bairro" variant="outlined" name="bairro" onChange={handleChange} style={{marginBottom: 25, width: "48%"}} />
                              <TextField id="outlined-basic" label="Município" variant="outlined" name="municipio" onChange={handleChange} style={{marginBottom: 25, width: "48%"}} />
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
                             <TextField fullWidth id="outlined-basic" label="Cargo Ministerial" variant="outlined" name="cargoIgreja" onChange={handleChange} style={{marginBottom: 25}}/>
                             <TextField fullWidth id="outlined-basic" label="Data de Batismo" variant="outlined" name="dataBatismoAguas" onChange={handleChange} />
                             <Grid xs={12} style={{display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", marginTop: 20}}>
                                <Button onClick={save} variant="contained">Salvar</Button>
                             </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Container>
          </Box>
        </>
      );
}

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;

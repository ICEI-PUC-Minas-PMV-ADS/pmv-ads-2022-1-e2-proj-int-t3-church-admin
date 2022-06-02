import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, OutlinedInput, Grid, TextField, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, InputLabel, Select, MenuItem, Button, Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from "axios";

const Cadastro = function () {
    const [loading, setLoading] = useState(true)
    const [updateMode, setUpdateMode] = useState(false)
    const [formValue, setFormValue] = useState({
        nome: null,
        email: null,
        fone: null,
        nascimento: null,
        profissao: null,
        sexo: null,
        estadoCivil: null,
        cpf: null,
        naturalidade: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        municipio: null,
        batismo: null,
        estado: null,
        igrejaID: null,
        cargoIgreja: null,
        dataBatismoAguas: null
        //status: true
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
        if (membro) {
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
        const headers = {
            "access-control-allow-credentials": true,
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "*",
            "access-control-allow-origin": "https://localhost:5001",
            "access-control-expose-headers": "*",
            "content-type": "application/problem+json"
        };

        try {
            if (updateMode) {
                await axios.put(baseURL_UPDATE, formValue, { headers })
                    .then(response => { console.log(response.data) });
                document.location.reload(true)
                alert('Atualização realizada com sucesso!')

            } else {
                await axios.post(baseURL, formValue, { headers })
                    .then((response) => { console.log(response.data) });
                setTimeout(() => setLoading(false), 500)
                document.location.reload(true)
                alert('Cadastro realizado com sucesso!')
            }

        } catch (e) {
            alert('Preencha todos os campos.')
            console.log("ERRO: ", e)
            setLoading(false)
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
                            Cadastro | Church Admin
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
                            <h1 onClick={() => console.log(">>>>> updateMode: ", updateMode)} style={{ marginBottom: 30 }}>Cadastro de Igreja</h1>

                            <Grid container spacing={2} >
                                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                    <h2 style={{ marginBottom: 25 }}>Dados da instituição</h2>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        label="Nome da igreja"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="nome"
                                        value={formValue.nome}
                                        onChange={handleChange}
                                        error={formValue.nome === ""}
                                        helperText={formValue.nome === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        label="Razão Social"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="nome"
                                        value={formValue.nome}
                                        onChange={handleChange}
                                        error={formValue.nome === ""}
                                        helperText={formValue.nome === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="CNPJ"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="cnpj"
                                        value={formValue.cnpj}
                                        onChange={handleChange}
                                        error={formValue.cnpj === ""}
                                        helperText={formValue.cnpj === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="E-mail"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="email"
                                        value={formValue.email}
                                        onChange={handleChange}
                                        error={formValue.email === ""}
                                        helperText={formValue.email === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Telefone 1"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="fone"
                                        value={formValue.fone}
                                        onChange={handleChange}
                                        error={formValue.fone === ""}
                                        helperText={formValue.fone === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Telefone 2"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="fone"
                                        value={formValue.fone}
                                        onChange={handleChange}
                                        error={formValue.fone === ""}
                                        helperText={formValue.fone === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Data do Cadastro"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="cadastro"
                                        value={formValue.cadastro}
                                        onChange={handleChange}
                                        error={formValue.cadastro === ""}
                                        helperText={formValue.cadastro === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Data da Fundação"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="fundacao"
                                        value={formValue.fundacao}
                                        onChange={handleChange}
                                        error={formValue.fundacao === ""}
                                        helperText={formValue.fundacao === "" ? "Por favor, preencha este campo." : " "}
                                    />
  
                                </Grid>
                                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                    <h2 style={{ marginBottom: 25 }}>Localização</h2>
                                    <TextField fullWidth id="outlined-basic" label="CEP" variant="outlined" name="cep" onChange={handleChange} style={{ marginBottom: 25 }} value={formValue.cep} error={formValue.cep === ""} helperText={formValue.cep === "" ? "Por favor, preencha este campo." : " "} />
                                    <TextField fullWidth id="outlined-basic" label="Endereço" variant="outlined" name="endereco" onChange={handleChange} style={{ marginBottom: 25 }} value={formValue.endereco} error={formValue.endereco === ""} helperText={formValue.endereco === "" ? "Por favor, preencha este campo." : " "} />

                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
                                        <TextField id="outlined-basic" label="Número" variant="outlined" name="numero" onChange={handleChange} style={{ width: "48%" }} value={formValue.numero} error={formValue.numero === ""} helperText={formValue.numero === "" ? "Por favor, preencha este campo." : " "} />
                                        <TextField id="outlined-basic" label="Complemento" variant="outlined" name="complemento" onChange={handleChange} style={{ width: "48%" }} value={formValue.complemento} error={formValue.complemento === ""} helperText={formValue.complemento === "" ? "Por favor, preencha este campo." : " "} />
                                    </Grid>
                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
                                        <TextField id="outlined-basic" label="Bairro" variant="outlined" name="bairro" onChange={handleChange} style={{ width: "48%" }} value={formValue.bairro} error={formValue.bairro === ""} helperText={formValue.bairro === "" ? "Por favor, preencha este campo." : " "} />
                                        <TextField id="outlined-basic" label="Município" variant="outlined" name="municipio" onChange={handleChange} style={{ width: "48%" }} value={formValue.municipio} error={formValue.municipio === ""} helperText={formValue.municipio === "" ? "Por favor, preencha este campo." : " "} />
                                    </Grid>
                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
                                        <FormControl style={{ width: "48%" }}>
                                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formValue.estado}
                                                input={<OutlinedInput label="Estado" />}
                                                label="Estado"
                                                name="estado"
                                                onChange={handleChange}
                                                error={formValue.estado === ""} 
                                            >
                                                <MenuItem value={"RJ"}>RJ</MenuItem>
                                                <MenuItem value={"SP"}>SP</MenuItem>
                                                <MenuItem value={"MG"}>MG</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl style={{ width: "48%" }}>
                                            <InputLabel id="demo-simple-select-label">Categoria</ InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formValue.igrejaID}
                                                input={<OutlinedInput label="Congregação" />}
                                                label="Congregação"
                                                name="igrejaID"
                                                onChange={handleChange}
                                                error={formValue.igrejaID === ""} 
                                            >
                                                <MenuItem value={2}>Matriz</MenuItem>
                                                <MenuItem value={2}>Filial</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                        
                                        <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", marginTop: 20 }}>
                                           <Button onClick={save} variant="contained"> Cadastrar </Button>
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

Cadastro.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Cadastro;

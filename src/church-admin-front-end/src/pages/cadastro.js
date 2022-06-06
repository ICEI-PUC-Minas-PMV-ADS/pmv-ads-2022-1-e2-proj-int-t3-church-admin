import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, OutlinedInput, Grid, TextField, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, InputLabel, Select, MenuItem, Button, Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import InputMask from "react-input-mask";
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
        dataBatismoAguas: null,
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
                            <h1 onClick={() => console.log(">>>>> updateMode: ", updateMode)} style={{ marginBottom: 30 }}>Cadastrar</h1>

                            <Grid container spacing={2} >
                                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                    <h2 style={{ marginBottom: 25 }}>Informações Pessoais</h2>
                                    <TextField
                                        fullWidth
                                        id="outlined-required"
                                        label="Nome Completo"
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
                                        label="E-mail"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="email"
                                        value={formValue.email}
                                        onChange={handleChange}
                                        error={formValue.email === ""}
                                        helperText={formValue.email === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <InputMask
                                        mask="(99) 9 9999-9999"
                                        value={formValue.fone}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="Telefone"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="fone"
                                                error={formValue.fone === ""}
                                                helperText={formValue.fone === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <TextField
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        id="outlined-basic"
                                        label="Data de Nascimento"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="nascimento"
                                        value={formValue.nascimento}
                                        onChange={handleChange}
                                        error={formValue.nascimento === ""}
                                        helperText={formValue.nascimento === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Profissão"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="profissao"
                                        value={formValue.profissao}
                                        onChange={handleChange}
                                        error={formValue.profissao === ""}
                                        helperText={formValue.profissao === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                row
                                                value={formValue.sexo}
                                                error={formValue.sexo === ""}
                                            >
                                                <FormControlLabel value="F" control={<Radio />} label="Feminino" onChange={handleChange} name="sexo" />
                                                <FormControlLabel value="M" control={<Radio />} label="Masculino" onChange={handleChange} name="sexo" />
                                            </RadioGroup>
                                        </FormControl>

                                        <FormControl style={{ width: '55%' }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Status de Batismo</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={formValue.batismo}
                                                input={<OutlinedInput label="Status de Batismo" />}
                                                label="batismo"
                                                onChange={handleChange}
                                                name="batismo"
                                                error={formValue.batismo === ""}
                                                helperText={formValue.batismo === "" ? "Por favor, preencha este campo." : " "}
                                            >
                                                <MenuItem value={"sim"}>Batizado</MenuItem>
                                                <MenuItem value={"nao"}>Não batizado</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <FormControl fullWidth style={{ marginBottom: 25 }}>
                                        <InputLabel id="demo-simple-select-label">Estado Civil</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formValue.estadoCivil}
                                            input={<OutlinedInput label="Estado Civil" />}
                                            label="Estado Civil"
                                            name="estadoCivil"
                                            onChange={handleChange}
                                            error={formValue.estadoCivil === ""}
                                        >
                                            <MenuItem value={"solteiro"}>Solteiro</MenuItem>
                                            <MenuItem value={"casado"}>Casado</MenuItem>
                                            <MenuItem value={"divorciado"}>Divorciado</MenuItem>
                                            <MenuItem value={"viuvo"}>Viúvo</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <InputMask
                                        mask="999.999.999-99"
                                        value={formValue.cpf}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="CPF"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="cpf"
                                                error={formValue.cpf === ""}
                                                helperText={formValue.cpf === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <TextField fullWidth id="outlined-basic" label="Naturalidade" variant="outlined" name="naturalidade" onChange={handleChange} value={formValue.naturalidade} error={formValue.naturalidade === ""} helperText={formValue.naturalidade === "" ? "Por favor, preencha este campo." : " "} />
                                </Grid>
                                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                    <h2 style={{ marginBottom: 25 }}>Localização</h2>

                                    <InputMask
                                        mask="99999-999"
                                        value={formValue.cep}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="CEP"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="cep"
                                                error={formValue.cep === ""}
                                                helperText={formValue.cep === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <TextField fullWidth id="outlined-basic" label="Endereço" variant="outlined" name="endereco" onChange={handleChange} style={{ marginBottom: 25 }} value={formValue.endereco} error={formValue.endereco === ""} helperText={formValue.endereco === "" ? "Por favor, preencha este campo." : " "} />

                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
                                        <InputMask
                                            mask="9999999999"
                                            value={formValue.numero}
                                            disabled={false}
                                            maskChar=" "
                                            onChange={handleChange}
                                        >
                                            {() =>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Número"
                                                    variant="outlined"
                                                    style={{ marginBottom: 25 }}
                                                    name="numero"
                                                    error={formValue.numero === ""}
                                                    helperText={formValue.numero === "" ? "Por favor, preencha este campo." : " "}
                                                />
                                            }
                                        </InputMask>

                                        <TextField
                                            id="outlined-basic"
                                            label="Complemento"
                                            variant="outlined"
                                            name="complemento"
                                            onChange={handleChange}
                                            style={{ width: "48%" }}
                                            value={formValue.complemento}
                                        />
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
                                            <InputLabel id="demo-simple-select-label">Congregação</InputLabel>
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
                                        <h2 style={{ marginTop: 25, marginBottom: 25 }}>Dados Eclesiásticos</h2>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Cargo Ministerial"
                                            variant="outlined"
                                            name="cargoIgreja"
                                            onChange={handleChange}
                                            style={{ marginBottom: 25 }}
                                            value={formValue.cargoIgreja}
                                            error={formValue.cargoIgreja === ""}
                                            helperText={formValue.cargoIgreja === "" ? "Por favor, preencha este campo." : " "}
                                        />
                                        {formValue.batismo === 'nao' ?
                                            null
                                            :
                                            <TextField
                                                fullWidth
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                id="outlined-basic"
                                                label="Data de Batismo"
                                                variant="outlined"
                                                name="dataBatismoAguas"
                                                onChange={handleChange}
                                                value={formValue.dataBatismoAguas}
                                                error={formValue.dataBatismoAguas === ""}
                                                helperText={formValue.dataBatismoAguas === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }

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

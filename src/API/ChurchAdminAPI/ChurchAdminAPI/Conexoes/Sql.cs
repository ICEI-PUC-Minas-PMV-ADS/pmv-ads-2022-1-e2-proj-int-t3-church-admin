using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace ChurchAdminAPI.Conexoes
{
    public class Sql
    {
        private readonly SqlConnection _conexao;

        public Sql()
        {
            string conexao = System.IO.File.ReadAllText(@"C:\ADS\stringConexao.txt");
            this._conexao = new SqlConnection(conexao);
        }


        // MEMBRO
        public void CadastrarMembro(Models.Membro membro)
        {
            try
            {
                _conexao.Open();

                string sql = @"INSERT INTO Membro
                               (Cpf,
                                Nome,
                                Cep,
                                Endereco,
                                Numero,
                                Complemento,
                                Bairro,
                                Municipio,
                                Estado,
                                Email,
                                Fone,
                                Sexo,
                                Nascimento,
                                Naturalidade,
                                EstadoCivil,
                                Profissao,
                                DataBatismoAguas,
                                CargoIgreja,
                                IgrejaID,
                                Status)
                               VALUES
                                (@Cpf,
                                @Nome,
                                @Cep,
                                @Endereco,
                                @Numero,
                                @Complemento,
                                @Bairro,
                                @Municipio,
                                @Estado,
                                @Email,
                                @Fone,
                                @Sexo,
                                @Nascimento,
                                @Naturalidade,
                                @EstadoCivil,
                                @Profissao,
                                @DataBatismoAguas,
                                @CargoIgreja,
                                @IgrejaID,
                                @Status);";

                using (SqlCommand cmd = new SqlCommand(sql, _conexao))
                {
                    cmd.Parameters.AddWithValue("Cpf", membro.Cpf);
                    cmd.Parameters.AddWithValue("Nome", membro.Nome);
                    cmd.Parameters.AddWithValue("Cep", membro.Cep);
                    cmd.Parameters.AddWithValue("Endereco", membro.Endereco);
                    cmd.Parameters.AddWithValue("Numero", membro.Numero);
                    cmd.Parameters.AddWithValue("Complemento", membro.Complemento);
                    cmd.Parameters.AddWithValue("Bairro", membro.Bairro);
                    cmd.Parameters.AddWithValue("Municipio", membro.Municipio);
                    cmd.Parameters.AddWithValue("Estado", membro.Estado);
                    cmd.Parameters.AddWithValue("Email", membro.Email);
                    cmd.Parameters.AddWithValue("Fone", membro.Fone);
                    cmd.Parameters.AddWithValue("Sexo", membro.Sexo);
                    cmd.Parameters.AddWithValue("Nascimento", membro.Nascimento);
                    cmd.Parameters.AddWithValue("Naturalidade", membro.Naturalidade);
                    cmd.Parameters.AddWithValue("EstadoCivil", membro.EstadoCivil);
                    cmd.Parameters.AddWithValue("Profissao", membro.Profissao);
                    cmd.Parameters.AddWithValue("DataBatismoAguas", membro.DataBatismoAguas);
                    cmd.Parameters.AddWithValue("CargoIgreja", membro.CargoIgreja);
                    cmd.Parameters.AddWithValue("IgrejaID", membro.IgrejaID);
                    cmd.Parameters.AddWithValue("Status", membro.Status);
                    cmd.ExecuteNonQuery();
                }
                 
            }
            finally
            {
                _conexao.Close();
            }
        }

        public void AtualizarMembro(Models.Membro membro)
        {
            try
            {
                _conexao.Open();

                string sql = @"UPDATE Membro
                                SET 
                                Cpf = @Cpf,
                                Nome = @Nome,
                                Cep = @Cep ,
                                Endereco = @Endereco,
                                Numero = @Numero,
                                Complemento = @Complemento,
                                Bairro = @Bairro,
                                Municipio = @Municipio,
                                Estado = @Estado,
                                Email = @Email,
                                Fone = @Fone,
                                Sexo = @Sexo,
                                Nascimento = @Nascimento,
                                Naturalidade = @Naturalidade,
                                EstadoCivil = @EstadoCivil,
                                Profissao = @Profissao,
                                DataBatismoAguas = @DataBatismoAguas,
                                CargoIgreja = @CargoIgreja,
                                IgrejaID = @IgrejaID,
                                Status = @Status
                                WHERE Matricula = @Matricula";

                using (SqlCommand cmd = new SqlCommand(sql, _conexao))
                {
                    cmd.Parameters.AddWithValue("Matricula", membro.Matricula);
                    cmd.Parameters.AddWithValue("Cpf", membro.Cpf);
                    cmd.Parameters.AddWithValue("Nome", membro.Nome);
                    cmd.Parameters.AddWithValue("Cep", membro.Cep);
                    cmd.Parameters.AddWithValue("Endereco", membro.Endereco);
                    cmd.Parameters.AddWithValue("Numero", membro.Numero);
                    cmd.Parameters.AddWithValue("Complemento", membro.Complemento);
                    cmd.Parameters.AddWithValue("Bairro", membro.Bairro);
                    cmd.Parameters.AddWithValue("Municipio", membro.Municipio);
                    cmd.Parameters.AddWithValue("Estado", membro.Estado);
                    cmd.Parameters.AddWithValue("Email", membro.Email);
                    cmd.Parameters.AddWithValue("Fone", membro.Fone);
                    cmd.Parameters.AddWithValue("Sexo", membro.Sexo);
                    cmd.Parameters.AddWithValue("Nascimento", membro.Nascimento);
                    cmd.Parameters.AddWithValue("Naturalidade", membro.Naturalidade);
                    cmd.Parameters.AddWithValue("EstadoCivil", membro.EstadoCivil);
                    cmd.Parameters.AddWithValue("Profissao", membro.Profissao);
                    cmd.Parameters.AddWithValue("DataBatismoAguas", membro.DataBatismoAguas);
                    cmd.Parameters.AddWithValue("CargoIgreja", membro.CargoIgreja);
                    cmd.Parameters.AddWithValue("IgrejaID", membro.IgrejaID);
                    cmd.Parameters.AddWithValue("Status", membro.Status);
                    cmd.ExecuteNonQuery();

                    if (cmd.ExecuteNonQuery() == 0)
                    {
                        throw new InvalidOperationException("O membro não foi atualizado!");
                    }

                }
            }
            finally
            {
                _conexao.Close();

            }
        }

        public void DeletarMembro(Models.Membro membro)
        {
            try
            {
                _conexao.Open();

                string sql = @"DELETE FROM Membro 
                               WHERE  Matricula = @Matricula";

                using (var cmd = new SqlCommand(sql, _conexao))
                {
                    cmd.Parameters.AddWithValue("@Matricula", membro.Matricula);
                    cmd.ExecuteNonQuery();
                    
                }

            }
            finally
            {
                _conexao.Close();
            }

        }

        public List<Models.Membro> ListarMembros()
        {
            var membros = new List<Models.Membro>();
            try
            {
                _conexao.Open();

                string sql = @"Select * FROM Membro";

                using (var cmd = new SqlCommand(sql, _conexao))
                {
                    var rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        var membro = new Models.Membro();
                        membro.Matricula = Convert.ToInt32(rdr["Matricula"]);
                        membro.Cpf = rdr["Cpf"].ToString();
                        membro.Nome = rdr["Nome"].ToString();
                        membro.Cep = rdr["Cep"].ToString();
                        membro.Endereco = rdr["Endereco"].ToString();
                        membro.Numero = Convert.ToInt32(rdr["Numero"]);
                        membro.Complemento = rdr["Complemento"].ToString();
                        membro.Bairro = rdr["Bairro"].ToString();
                        membro.Municipio = rdr["Municipio"].ToString();
                        membro.Estado = rdr["Estado"].ToString();
                        membro.Email = rdr["Email"].ToString();
                        membro.Fone = rdr["Fone"].ToString();
                        membro.Sexo = Convert.ToChar(rdr["Sexo"]);
                        membro.Nascimento = rdr["Nascimento"].ToString();
                        membro.Naturalidade = rdr["Naturalidade"].ToString();
                        membro.EstadoCivil = rdr["EstadoCivil"].ToString();
                        membro.Profissao = rdr["Profissao"].ToString();
                        membro.DataBatismoAguas = rdr["DataBatismoAguas"].ToString();
                        membro.CargoIgreja = rdr["CargoIgreja"].ToString();
                        membro.IgrejaID = Convert.ToInt32(rdr["IgrejaID"]);
                        membro.Status = Convert.ToBoolean(rdr["Status"]);
      
                        membros.Add(membro);
                    }

                }
            }
            finally
            {
                _conexao.Close();
            }

            return membros;
        }


        // IGREJA
        public void CadastrarIgreja(Models.Igreja igreja)
        {
            try
            {
                _conexao.Open();

                string sql = @"INSERT INTO Igreja
                               (NomeIgreja, 
                                RazaoSocial, 
                                Cnpj, 
                                Cep, 
                                Endereco,
                                Numero, 
                                Complemento, 
                                Bairro, 
                                Municipio, 
                                Estado, 
                                Fone1, 
                                Fone2, 
                                Categoria, 
                                DataCadastro, 
                                DataFundacao, 
                                Email)
                               VALUES
                                (@NomeIgreja, 
                                @RazaoSocial, 
                                @Cnpj, 
                                @Cep, 
                                @Endereco, 
                                @Numero, 
                                @Complemento, 
                                @Bairro, 
                                @Municipio, 
                                @Estado, 
                                @Fone1, 
                                @Fone2, 
                                @Categoria, 
                                @DataCadastro, 
                                @DataFundacao, 
                                @Email);";

                using (SqlCommand cmd = new SqlCommand(sql, _conexao))
                {
                    cmd.Parameters.AddWithValue("NomeIgreja", igreja.NomeIgreja);
                    cmd.Parameters.AddWithValue("RazaoSocial", igreja.RazaoSocial);
                    cmd.Parameters.AddWithValue("Cnpj", igreja.Cnpj);
                    cmd.Parameters.AddWithValue("Cep", igreja.Cep);
                    cmd.Parameters.AddWithValue("Endereco", igreja.Endereco);
                    cmd.Parameters.AddWithValue("Numero", igreja.Numero);
                    cmd.Parameters.AddWithValue("Complemento", igreja.Complemento);
                    cmd.Parameters.AddWithValue("Bairro", igreja.Bairro);
                    cmd.Parameters.AddWithValue("Municipio", igreja.Municipio);
                    cmd.Parameters.AddWithValue("Estado", igreja.Estado);
                    cmd.Parameters.AddWithValue("Fone1", igreja.Fone1);
                    cmd.Parameters.AddWithValue("Fone2", igreja.Fone2);
                    cmd.Parameters.AddWithValue("Categoria", igreja.Categoria);
                    cmd.Parameters.AddWithValue("DataCadastro", igreja.DataCadastro);
                    cmd.Parameters.AddWithValue("DataFundacao", igreja.DataFundacao);
                    cmd.Parameters.AddWithValue("Email", igreja.Email);

                    cmd.ExecuteNonQuery();
                }
            }

            finally
            {
                _conexao.Close();
            }
        }

        public void AtualizarIgreja(Models.Igreja igreja)
        {
            try
            {
                _conexao.Open();

                string sql = @" UPDATE Igreja
                                SET NomeIgreja = @NomeIgreja,
                                RazaoSocial = @RazaoSocial,
                                Cnpj = @Cnpj,
                                Cep = @Cep,
                                Endereco = @Endereco,
                                Numero = @Numero,
                                Complemento = @Complemento,
                                Bairro = @Bairro,
                                Municipio = @Municipio,
                                Estado = @Estado,
                                Fone1 = @Fone1,
                                Fone2 = @Fone2,
                                Categoria = @Categoria,
                                DataCadastro = @DataCadastro,
                                DataFundacao = @DataFundacao,
                                Email = @Email
                                WHERE Id = @Id";

                using (SqlCommand cmd = new SqlCommand(sql, _conexao))
                {

                    cmd.Parameters.AddWithValue("Id", igreja.Id);
                    cmd.Parameters.AddWithValue("NomeIgreja", igreja.NomeIgreja);
                    cmd.Parameters.AddWithValue("RazaoSocial", igreja.RazaoSocial);
                    cmd.Parameters.AddWithValue("Cnpj", igreja.Cnpj);
                    cmd.Parameters.AddWithValue("Cep", igreja.Cep);
                    cmd.Parameters.AddWithValue("Endereco", igreja.Endereco);
                    cmd.Parameters.AddWithValue("Numero", igreja.Numero);
                    cmd.Parameters.AddWithValue("Complemento", igreja.Complemento);
                    cmd.Parameters.AddWithValue("Bairro", igreja.Bairro);
                    cmd.Parameters.AddWithValue("Municipio", igreja.Municipio);
                    cmd.Parameters.AddWithValue("Estado", igreja.Estado);
                    cmd.Parameters.AddWithValue("Fone1", igreja.Fone1);
                    cmd.Parameters.AddWithValue("Fone2", igreja.Fone2);
                    cmd.Parameters.AddWithValue("Categoria", igreja.Categoria);
                    cmd.Parameters.AddWithValue("DataCadastro", igreja.DataCadastro);
                    cmd.Parameters.AddWithValue("DataFundacao", igreja.DataFundacao);
                    cmd.Parameters.AddWithValue("Email", igreja.Email);

                    cmd.ExecuteNonQuery();
                
                }
            }
            finally
            {
                _conexao.Close();

            }
        }

        public void DeletarIgreja(Models.Igreja igreja)
        {
            try
            {
                _conexao.Open();

                string sql = @"DELETE FROM Igreja 
                               WHERE  Id = @Id";

                using (var cmd = new SqlCommand(sql, _conexao))
                {
                    cmd.Parameters.AddWithValue("@Id", igreja.Id);
                    cmd.ExecuteNonQuery();

                }

            }
            finally
            {
                _conexao.Close();
            }

        }

        public List<Models.Igreja> ListarIgrejas()
        {
            var igrejas = new List<Models.Igreja>();
            try
            {
                _conexao.Open();

                string sql = @"Select * FROM Igreja";

                using (var cmd = new SqlCommand(sql, _conexao))
                {
                    var rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        var igreja = new Models.Igreja();
                        igreja.Id = Convert.ToInt32(rdr["Id"].ToString());
                        igreja.NomeIgreja = rdr["NomeIgreja"].ToString();
                        igreja.RazaoSocial = rdr["RazaoSocial"].ToString();
                        igreja.Cnpj = rdr["Cnpj"].ToString();
                        igreja.Cep = rdr["Cep"].ToString();
                        igreja.Endereco = rdr["Endereco"].ToString();
                        igreja.Numero = Convert.ToInt32(rdr["Numero"]);
                        igreja.Complemento = rdr["Complemento"].ToString();
                        igreja.Bairro = rdr["Bairro"].ToString();
                        igreja.Municipio = rdr["Municipio"].ToString();
                        igreja.Estado = rdr["Estado"].ToString();
                        igreja.Fone1 = rdr["Fone1"].ToString();
                        igreja.Fone2 = rdr["Fone2"].ToString();
                        igreja.Categoria = rdr["Categoria"].ToString();
                        igreja.DataCadastro = rdr["DataCadastro"].ToString();
                        igreja.DataFundacao = rdr["DataFundacao"].ToString();
                        igreja.Email = rdr["Email"].ToString();


                        igrejas.Add(igreja);
                    }

                }
            }
            finally
            {
                _conexao.Close();
            }

            return igrejas;
        }




    }
}

namespace ChurchAdminAPI.Models
{
    public class Igreja
    {
        public int Id { get; set; }
        public string NomeIgreja { get; set; }
        public string RazaoSocial { get; set; }
        public string Cnpj { get; set; }
        public string Cep { get; set; }
        public string Endereco { get; set; } 
        public int Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }  
        public string Municipio { get; set; }
        public string Estado { get; set; }     
        public string Fone1 { get; set; }
        public string Fone2 { get; set; }
        public string Categoria { get; set; }
        public string DataCadastro { get; set; }
        public string DataFundacao { get; set; }
        public string Email { get; set; }
    }
}

namespace ChurchAdmin.Models
{
    public class MembroModel
    {
        public int Id { get; set; }
        public string Cpf { get; set; }
        public string Nome { get; set;}   
        public string Nascimento { get; set;}
        public bool Sexo { get; set; }
        public string Endereco { get; set; }
        public int Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cep { get; set; }
        public string Municipio { get; set; }
        public string Estado { get; set; }
        public string Email { get; set; }    
        public string Fone { get; set; }
        public string Naturalidade { get; set; }
        public string EstadoCivil { get; set; }
        public string Profissao { get; set; }
        public string DataBatismoAguas { get; set; }
        public string CargoIgreja { get; set; }
        public IgrejaModel Igreja { get; set; }
        public bool Status { get; set; }

    }
}

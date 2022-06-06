using ChurchAdminAPI.Conexoes;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;

namespace ChurchAdminAPI.Controllers
{
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IConverter _converter;

        private readonly Conexoes.Sql _sql;

        public PdfController(IConverter converter)
        {
            _converter = converter;
            _sql = new Conexoes.Sql();
        }


        [HttpGet("v1/GerarPdf")]
        public IActionResult GerarPdf()
        {
            string ObterHtmlString()
            {
                var membros = _sql.ListarMembros();

                var sb = new StringBuilder();
                sb.Append(@"
                   <html>
                    <head></head>
                    <body>
                    <div class='header'><h1> RELATÓRIO DE MEMBROS </h1></div>
                      <table align='center'>
                    <tr>
                         <th>MAT</th>
                         <th>NOME</th>
                         <th>CPF</th>
                         <th>CEP</th>
                         <th>ENDEREÇO</th>
                         <th>NÚMERO</th>
                         <th>COMPLEMENTO</th>
                         <th>BAIRRO</th>
                         <th>MUNICÍPIO</th>
                         <th>ESTADO</th>
                         <th>EMAIL</th>
                         <th>TELEFONE</th>
                         <th>SEXO</th>
                         <th>DATA NASC</th>
                         <th>NATURAL</th>
                         <th>ESTADO CIVIL</th>
                         <th>PROFISSÃO</th>
                         <th>DATA BASTISMO</th>
                         <th>CARGO IGREJA</th>
                         <th>ID IGREJA</th>
                         <th>STATUS</th>
                    </tr>");

                foreach (var membro in membros)
                {
                    sb.AppendFormat(@"<tr>
                                 <td>{0}</td>
                                 <td>{1}</td>
                                 <td>{2}</td>
                                 <td>{3}</td>
                                 <td>{4}</td>    
                                 <td>{5}</td>  
                                 <td>{6}</td>    
                                 <td>{7}</td>    
                                 <td>{8}</td>    
                                 <td>{9}</td>    
                                 <td>{10}</td>    
                                 <td>{11}</td>    
                                 <td>{12}</td>    
                                 <td>{13}</td>    
                                 <td>{14}</td>    
                                 <td>{15}</td>    
                                 <td>{16}</td>    
                                 <td>{17}</td>    
                                 <td>{18}</td>    
                                 <td>{19}</td>    
                                 <td>{20}</td>  
                           </tr >", membro.Matricula, membro.Nome, membro.Cpf, membro.Cep, membro.Endereco, membro.Numero, membro.Complemento,
                           membro.Bairro, membro.Municipio, membro.Estado, membro.Email, membro.Fone, membro.Sexo, membro.Nascimento, membro.Naturalidade,
                           membro.EstadoCivil, membro.Profissao, membro.DataBatismoAguas, membro.CargoIgreja, membro.IgrejaID, membro.Status);
                }

                sb.Append(@"
                            </table>
                           </body>
                          </html>");

                return sb.ToString();
            }

            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "Relatório de Membros - Church Admin",
                Out = @"C:\ADS\Membros_Relatorio.pdf"
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = ObterHtmlString(),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "style.css") },
                HeaderSettings = { FontName = "Roboto", FontSize = 6, Right = "Página [page] de [toPage]", Line = false },
                FooterSettings = { FontName = "Roboto", FontSize = 6, Line = true, Center = "Church Admin"}
            };

            var pdf = new HtmlToPdfDocument
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            _converter.Convert(pdf);

            return Ok("PDF gerado com sucesso!");
        }
    }
}

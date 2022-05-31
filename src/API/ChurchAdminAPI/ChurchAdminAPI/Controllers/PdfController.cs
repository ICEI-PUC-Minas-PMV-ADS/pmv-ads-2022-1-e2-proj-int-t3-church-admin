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
                var membros = _sql.ListarMembrosPdf();

                var sb = new StringBuilder();
                sb.Append(@"
                   <html>
                    <head></head>
                    <body>
                    <div class='header'><h1>Church Admin PDF</h1></div>
                      <table align='center'>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Municipio</th>
                         <th>Estado</th>
                         <th>Fone</th>
                         <th>CargoIgreja</th>
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
                           </tr >", membro.Matricula, membro.Nome, membro.Municipio, membro.Estado, membro.Fone, membro.CargoIgreja);
                          
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
                DocumentTitle = "Church Admin PDF",
                Out = @"C:\ADS\Membros_Relatorio.pdf"
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = ObterHtmlString(),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "style.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
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

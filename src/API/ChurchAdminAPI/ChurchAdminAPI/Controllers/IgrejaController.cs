using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ChurchAdminAPI.Controllers
{
    [ApiController]
    public class IgrejaController : ControllerBase
    {
        private readonly Conexoes.Sql _sql;


        public IgrejaController()
        {
            _sql = new Conexoes.Sql();
        }

        [HttpPost("v1/CadastrarIgreja")]
        public void CadastrarIgreja(Models.Igreja igreja)
        {
            _sql.CadastrarIgreja(igreja);
        }

        [HttpPut("v1/AtualizarIgreja")]
        public void AtualizarIgreja(Models.Igreja igreja)
        {
            _sql.AtualizarIgreja(igreja);
        }

        [HttpDelete("v1/DeletarIgreja")]
        public IActionResult DeletarIgreja(Models.Igreja igreja)
        {
            try
            {
                _sql.DeletarIgreja(igreja);
                return StatusCode(200);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }


        [HttpGet("v1/ListarIgrejas")]
        public IActionResult ListarIgrejas()
        {
            try
            {
                var membros = _sql.ListarIgrejas();

                return StatusCode(200, membros);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

    }
}

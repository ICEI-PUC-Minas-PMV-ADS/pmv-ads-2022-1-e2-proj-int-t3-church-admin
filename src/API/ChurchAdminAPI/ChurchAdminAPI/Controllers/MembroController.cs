using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ChurchAdminAPI.Controllers
{
    [EnableCors("PermitirTudo")]
    [ApiController]
    public class MembroController : ControllerBase
    {
        private readonly Conexoes.Sql _sql;


        public MembroController()
        {
            _sql = new Conexoes.Sql();
        }

        [HttpPost("v1/CadastrarMembro")]
        public void CadastrarMembro(Models.Membro membro)
        {
            _sql.CadastrarMembro(membro);
        }

        [HttpPut("v1/AtualizarMembro")]
        public void AtualizarMembro(Models.Membro membro)
        {
            _sql.AtualizarMembro(membro);
        }

        [HttpDelete("v1/DeletarMembro")]
        public IActionResult DeletarMembro(Models.Membro membro)
        {
            try
            {
                _sql.DeletarMembro(membro);
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

        [HttpGet("v1/ListarMembros")]
        public IActionResult ListarMembros()
        {
            try
            {
                var membros = _sql.ListarMembros();

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

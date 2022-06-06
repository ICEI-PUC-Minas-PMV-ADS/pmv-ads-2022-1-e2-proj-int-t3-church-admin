using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ChurchAdminAPI.Controllers
{
    [EnableCors("PermitirTudo")]
    [ApiController]
    public class IgrejaController : ControllerBase
    {
        private readonly Conexoes.Sql _sql;


        public IgrejaController()
        {        
            _sql = new Conexoes.Sql();
        }

        [HttpPost("v1/CadastrarIgreja")]
        public IActionResult CadastrarIgreja(Models.Igreja igreja)
        {
            try
            {
                if (!Utils.Validacao.ValidaCNPJ(igreja.Cnpj))
                {
                    throw new InvalidOperationException("Cnpj inválido!");
                }

                if (string.IsNullOrWhiteSpace(igreja.NomeIgreja) || igreja.NomeIgreja.Length < 1 || igreja.NomeIgreja.Length > 80)
                {
                    throw new InvalidOperationException("O nome da igreja deve conter entre 1 a 80 caracteres.");
                }

                if (!Utils.Validacao.ValidaCep(igreja.Cep))
                {
                    throw new InvalidOperationException("CEP inválido!");
                }

                if (!Utils.Validacao.ValidaEmail(igreja.Email))
                {
                    throw new InvalidOperationException("Email inválido!");
                }

                _sql.CadastrarIgreja(igreja);

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

        [HttpPut("v1/AtualizarIgreja")]
        public IActionResult AtualizarIgreja(Models.Igreja igreja)
        {
            try
            {
                _sql.AtualizarIgreja(igreja);
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

        [HttpDelete("v1/DeletarIgreja/{id}")]
        public IActionResult DeletarIgreja(int id)
        {
            try
            {
                _sql.DeletarIgreja(id);
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

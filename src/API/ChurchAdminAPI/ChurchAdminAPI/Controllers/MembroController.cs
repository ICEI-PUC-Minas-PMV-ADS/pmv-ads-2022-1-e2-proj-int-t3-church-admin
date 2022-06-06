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
        public IActionResult CadastrarMembro(Models.Membro membro)
        {
            try
            {
                //if (!Utils.Validacao.ValidaCpf(membro.Cpf))
                //{
                //    throw new InvalidOperationException("Cpf inválido!");
                //}

                //if (string.IsNullOrWhiteSpace(membro.Nome) || membro.Nome.Length < 1 || membro.Nome.Length > 80)
                //{
                //    throw new InvalidOperationException("O nome deve conter entre 1 a 80 caracteres.");
                //}

                //if (!Utils.Validacao.ValidaCep(membro.Cep))
                //{
                //    throw new InvalidOperationException("CEP inválido!");
                //}

                //if (!Utils.Validacao.ValidaEmail(membro.Email))
                //{
                //    throw new InvalidOperationException("Email inválido!");
                //}

                //if (membro.Sexo.ToString() != "F" || membro.Sexo.ToString() != "M" || membro.Sexo.ToString() != "ND")
                //{
                //    throw new InvalidOperationException("Digite M para sexo masculino, F para feminino ou ND para quem prefere não declarar.");
                //}

                _sql.CadastrarMembro(membro);

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

        [HttpPut("v1/AtualizarMembro")]
        public IActionResult AtualizarMembro(Models.Membro membro)
        {
            try
            {
                _sql.AtualizarMembro(membro);
                return StatusCode(200);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(400, ex.Message);
            }catch (Exception)
            {
                return StatusCode(500);
            }
            
        }

        [HttpDelete("v1/DeletarMembro/{matricula}")]
        public IActionResult DeletarMembro(string matricula)
        {
            try
            {
                _sql.DeletarMembro(matricula);

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

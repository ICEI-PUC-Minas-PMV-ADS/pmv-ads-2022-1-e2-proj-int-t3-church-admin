using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ChurchAdminAPI.Controllers
{
    [AllowAnonymous]
    [EnableCors("PermitirTudo")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly Conexoes.Sql _sql;

        public UsuarioController()
        {
            _sql = new Conexoes.Sql();
        }

        [HttpPost("v1/UsuarioAutenticacao")]
        public async Task<ActionResult<dynamic>> Autenticacao([FromBody] Models.Usuario usuario)
        {
            var logEntrada = new Models.LogErro();

            try
            {
                var criptografar = new Fluxo.Criptografar();

                var senhaCriptografada = criptografar.HashValue(usuario.Senha);

                // Recupera o usuário
                var user = _sql.BuscarUsuario(usuario.Login, usuario.Senha);

                // Verifica se o usuário existe
                if (user == null)
                    return NotFound(new { message = "Usuário ou senha inválidos" });

                try
                {
                    // Gera o Token
                    var token = Token.GenerateToken(user);

                    // Oculta a senha
                    user.Senha = "";

                    // Retorna os dados
                    return new
                    {
                        user = user,
                        token = token

                    };
                }

                catch
                {
                    throw new System.InvalidOperationException("Erro ao gerar token");
                }

            }

            catch (InvalidOperationException ex)

            {
                logEntrada.NomeAplicacao = "ChurchAdminAPI";
                logEntrada.MensagemErro = ex.Message;
                logEntrada.RastreioErro = ex.StackTrace;
                logEntrada.DataHora = DateTime.Now;
                logEntrada.NomeMaquina = Environment.MachineName;
                logEntrada.Usuario = Environment.UserName;
                var request = Conexoes.ConsumoApiLog.LogErro<Models.LogErro>("https://", logEntrada);

                return StatusCode(400, ex.Message);
            }

            catch (Exception ex)
            {
                logEntrada.NomeAplicacao = "ChurchAdminAPI";
                logEntrada.MensagemErro = ex.Message;
                logEntrada.RastreioErro = ex.StackTrace;
                logEntrada.DataHora = DateTime.Now;
                logEntrada.NomeMaquina = Environment.MachineName;
                logEntrada.Usuario = Environment.UserName;
                var request = Conexoes.ConsumoApiLog.LogErro<Models.LogErro>("https://", logEntrada);

                return StatusCode(500, "Não foi possível autenticar o usuário");
            }
        }


        [HttpGet("v1/authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}" , User.Identity.Name);

    }
}


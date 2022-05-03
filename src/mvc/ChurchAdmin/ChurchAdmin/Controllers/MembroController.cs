using ChurchAdmin.Models;
using ChurchAdmin.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ChurchAdmin.Controllers
{
    public class MembroController : Controller
    {
        private readonly IMembroRepositorio _membroRepositorio;

        public MembroController(IMembroRepositorio membroRepositorio)
        {
            _membroRepositorio = membroRepositorio;

        }
        public IActionResult Index()
        {
            List<MembroModel> membros = _membroRepositorio.BuscarTodos();

            return View(membros);
        }

        public IActionResult Cadastrar()
        {
            return View();
        }

        public IActionResult Atualizar(int id)
        {
            MembroModel membro = _membroRepositorio.ListarPorId(id);
            return View(membro);
        }

        public IActionResult DeletarConfirmacao()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Cadastrar(MembroModel membro)
        {
            _membroRepositorio.Adicionar(membro);
            return RedirectToAction("Index");
        }
    }
}

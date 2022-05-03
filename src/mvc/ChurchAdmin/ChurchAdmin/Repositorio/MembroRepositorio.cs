using ChurchAdmin.Data;
using ChurchAdmin.Models;
using System.Collections.Generic;
using System.Linq;

namespace ChurchAdmin.Repositorio
{
    public class MembroRepositorio : IMembroRepositorio
    {
        private readonly BancoContext _context;
        public MembroRepositorio(BancoContext bancoContext)
        {
            _context = bancoContext;
        }

        public MembroModel ListarPorId(int id)
        {
            return _context.Membro.FirstOrDefault(x => x.Id == id);

        }

        public List<MembroModel> BuscarTodos()
        {
            return _context.Membro.ToList();
        }

        public MembroModel Adicionar(MembroModel membro)
        {
            _context.Membro.Add(membro);
            _context.SaveChanges();

            return membro;


        }

    }
}

using ChurchAdmin.Models;
using System.Collections.Generic;

namespace ChurchAdmin.Repositorio
{
    public interface IMembroRepositorio
    {
        MembroModel ListarPorId(int id); 
        List<MembroModel> BuscarTodos();
        MembroModel Adicionar(MembroModel membro);

    }
}

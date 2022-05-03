using ChurchAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace ChurchAdmin.Data
{
    public class BancoContext : DbContext
    {
        public BancoContext(DbContextOptions<BancoContext> options) : base(options)
        {
        }

        public DbSet<MembroModel> Membro { get; set; }
        public DbSet<IgrejaModel> Igreja { get; set; }

    }
}

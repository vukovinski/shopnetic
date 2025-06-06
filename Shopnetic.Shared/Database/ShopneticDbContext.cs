using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopnetic.Shared.Database
{
    public class ShopneticDbContext : DbContext
    {
        public ShopneticDbContext(DbContextOptions<ShopneticDbContext> options) : base(options)
        {
        }
    }
}

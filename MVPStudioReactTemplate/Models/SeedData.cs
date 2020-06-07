using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MVPStudioReactTemplate.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVPStudioReactTemplate.Models
{
    public class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            using (var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                // Look for old data
                if (context.Customers.Any())
                {
                    return; // Db has been initialized
                }

                await context.Customers.AddRangeAsync(
                    new Customer()
                    {
                        Name = "Mary",
                        Address = "122 Yishun Road, Singapore"
                    },
                    new Customer()
                    {
                        Name = "Nik",
                        Address = "151 Tanjong Katong, Singapore"
                    }
                );

                // Save changes
                await context.SaveChangesAsync();
            }
        }
    }
}

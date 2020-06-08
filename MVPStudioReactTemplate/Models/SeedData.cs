using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MVPStudioReactTemplate.Context;
using System;
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
                if (context.Products.Any())
                {
                    return; // Db has been initialized
                }
                if (context.Sales.Any())
                {
                    return; // Db has been initialized
                }
                if (context.Stores.Any())
                {
                    return; // Db has been initialized
                }

                // Create Customers
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
                    },
                    new Customer()
                    {
                        Name = "John",
                        Address = "122 Yishun Road, Singapore"
                    },
                    new Customer()
                    {
                        Name = "Holmes",
                        Address = "221b Baker Street, London"
                    },
                    new Customer()
                    {
                        Name = "Maverick",
                        Address = "69 Topgun Avenue, USA"
                    }
                );

                // Create Products
                await context.Products.AddRangeAsync(
                    new Product()
                    {
                        Name = "Tablet",
                        Price = 100.00
                    },
                    new Product()
                    {
                        Name = "Phone",
                        Price = 200.00
                    },
                    new Product()
                    {
                        Name = "Tablet Cover",
                        Price = 10.00
                    },
                    new Product()
                    {
                        Name = "Phone Casing",
                        Price = 5.00
                    }
                );

                // Create Stores
                await context.Stores.AddRangeAsync(
                    new Store()
                    {
                        Name = "USA",
                        Address = "USA"
                    },
                    new Store()
                    {
                        Name = "Singapore",
                        Address = "Singapore"
                    },
                    new Store()
                    {
                        Name = "London",
                        Address = "London"
                    }
                );

                // Save changes
                await context.SaveChangesAsync();


                // Create Sales
                Random random = new Random();
                await context.Sales.AddRangeAsync(
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1,5)),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Mary"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Phone"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "USA")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1, 5)),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Nik"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "Singapore")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1, 5)),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Holmes"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Phone"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "USA")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1, 5)),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Maverick"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "London")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1, 5)),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Nik"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet Cover"),
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "London")
                    },
                    new Sale()
                    {
                        DateSold = DateTime.Now.AddDays(random.Next(1, 5)),
                        Customer = await context.Customers.FirstOrDefaultAsync(c => c.Name == "Mary"),
                        Product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Tablet"), 
                        Store = await context.Stores.FirstOrDefaultAsync(s => s.Name == "Singapore")
                    }
                );

                // Save changes
                await context.SaveChangesAsync();
            }
        }
    }
}
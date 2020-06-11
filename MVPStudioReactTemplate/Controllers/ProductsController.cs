using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVPStudioReactTemplate.Context;
using MVPStudioReactTemplate.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MVPStudioReactTemplate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Product> Product = await _context.Products.ToListAsync();
            return Ok(Product);
        }

        // GET api/<ProductController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            Product Product = await _context.Products.FirstOrDefaultAsync(c => c.Id == id);
            return Ok(Product);
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Product Product)
        {
            // Check if exists the same data
            bool exists = await _context.Products.AnyAsync(c => c.Name == Product.Name);
            if (exists)
            {
                return BadRequest("Product Exists");
            }

            await _context.Products.AddAsync(Product);
            bool isSaved = await SaveChangesAsync();
            if (!isSaved)
            {
                return BadRequest("Object not created");
            }

            return Ok();
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] Product Product)
        {
            // Check if exists
            Product oldProduct = await _context.Products.FirstOrDefaultAsync(c => c.Id == id);
            if (oldProduct == null)
            {
                // Add new
                await _context.Products.AddAsync(Product);
                bool isSaved = await SaveChangesAsync();
                if (!isSaved)
                {
                    return BadRequest("Object not created");
                }

                return Ok("New object created because it does not exists");
            }

            // Update
            oldProduct.Name = Product.Name;
            oldProduct.Price = Product.Price;

            // Change the entity state
            _context.Entry(oldProduct).State = EntityState.Modified;

            bool isUpdated = await SaveChangesAsync();
            if (!isUpdated)
            {
                return BadRequest("Object not updated");
            }

            return Ok();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Product Product = await _context.Products.FirstOrDefaultAsync(c => c.Id == id);
            _context.Products.Remove(Product);
            bool isDeleted = await SaveChangesAsync();
            if (!isDeleted)
            {
                return BadRequest("Object not deleted");
            }
            return Ok();
        }

        private async Task<bool> SaveChangesAsync()
        {
            bool isSaved = await _context.SaveChangesAsync() > 0;
            return isSaved;
        }
    }
}

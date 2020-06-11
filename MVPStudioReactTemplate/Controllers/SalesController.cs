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
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<SaleController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Sale> Sale = await _context.Sales.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store).ToListAsync();
            return Ok(Sale);
        }

        // GET api/<SaleController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            Sale Sale = await _context.Sales.FirstOrDefaultAsync(c => c.Id == id);
            return Ok(Sale);
        }

        // POST api/<SaleController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Sale Sale)
        {
            // Check if exists the same data
            bool exists = await _context.Sales.AnyAsync(s => s.Customer == Sale.Customer && s.Product == Sale.Product && s.DateSold == Sale.DateSold);
            if (exists)
            {
                return BadRequest("Sale Exists");
            }

            await _context.Sales.AddAsync(Sale);
            bool isSaved = await SaveChangesAsync();
            if (!isSaved)
            {
                return BadRequest("Object not created");
            }

            return Ok();
        }

        // PUT api/<SaleController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] Sale Sale)
        {
            // Check if exists
            Sale oldSale = await _context.Sales.FirstOrDefaultAsync(c => c.Id == id);
            if (oldSale == null)
            {
                // Add new
                await _context.Sales.AddAsync(Sale);
                bool isSaved = await SaveChangesAsync();
                if (!isSaved)
                {
                    return BadRequest("Object not created");
                }

                return Ok("New object created because it does not exists");
            }

            // Update
            oldSale.Customer = Sale.Customer;
            oldSale.Product = Sale.Product;
            oldSale.Store = Sale.Store;
            oldSale.DateSold = Sale.DateSold;

            // Change the entity state
            _context.Entry(oldSale).State = EntityState.Modified;

            bool isUpdated = await SaveChangesAsync();
            if (!isUpdated)
            {
                return BadRequest("Object not updated");
            }

            return Ok();
        }

        // DELETE api/<SaleController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Sale Sale = await _context.Sales.FirstOrDefaultAsync(c => c.Id == id);
            _context.Sales.Remove(Sale);
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

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
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Customer> customer = await _context.Customers.ToListAsync();
            return Ok(customer);
        }

        // GET api/<CustomerController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);
            return Ok(customer);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Customer customer)
        {
            // Check if exists the same data
            bool exists = await _context.Customers.AnyAsync(c => c.Name == customer.Name && c.Address == customer.Address);
            if (exists)
            {
                return BadRequest("Customer Exists");
            }

            await _context.Customers.AddAsync(customer);
            bool isSaved = await SaveChangesAsync();
            if (!isSaved)
            {
                return BadRequest("Object not created");
            }

            return Ok();
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] Customer customer)
        {
            // Check if exists
            Customer oldCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);
            if (oldCustomer == null)
            {
                // Add new
                await _context.Customers.AddAsync(customer);
                bool isSaved = await SaveChangesAsync();
                if (!isSaved)
                {
                    return BadRequest("Object not created");
                }

                return Ok("New object created because it does not exists");
            }

            // Update
            oldCustomer.Name = customer.Name;
            oldCustomer.Address = customer.Address;

            // Change the entity state
            _context.Entry(oldCustomer).State = EntityState.Modified;

            bool isUpdated = await SaveChangesAsync();
            if (!isUpdated)
            {
                return BadRequest("Object not updated");
            }

            return Ok();
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);
            _context.Customers.Remove(customer);
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

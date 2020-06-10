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
    public class StoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<StoreController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Store> Store = await _context.Stores.ToListAsync();
            return Ok(Store);
        }

        // GET api/<StoreController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            Store Store = await _context.Stores.FirstOrDefaultAsync(c => c.Id == id);
            return Ok(Store);
        }

        // POST api/<StoreController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Store Store)
        {
            // Check if exists the same data
            bool exists = await _context.Stores.AnyAsync(c => c.Name == Store.Name && c.Address == Store.Address);
            if (exists)
            {
                return BadRequest("Store Exists");
            }

            await _context.Stores.AddAsync(Store);
            bool isSaved = await SaveChangesAsync();
            if (!isSaved)
            {
                return BadRequest("Object not created");
            }

            return Ok();
        }

        // PUT api/<StoreController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] Store Store)
        {
            // Check if exists
            Store oldStore = await _context.Stores.FirstOrDefaultAsync(c => c.Id == id);
            if (oldStore == null)
            {
                // Add new
                await _context.Stores.AddAsync(Store);
                bool isSaved = await SaveChangesAsync();
                if (!isSaved)
                {
                    return BadRequest("Object not created");
                }

                return Ok("New object created because it does not exists");
            }

            // Update
            oldStore.Name = Store.Name;
            oldStore.Address = Store.Address;

            // Change the entity state
            _context.Entry(oldStore).State = EntityState.Modified;

            bool isUpdated = await SaveChangesAsync();
            if (!isUpdated)
            {
                return BadRequest("Object not updated");
            }

            return Ok();
        }

        // DELETE api/<StoreController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Store Store = await _context.Stores.FirstOrDefaultAsync(c => c.Id == id);
            _context.Stores.Remove(Store);
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

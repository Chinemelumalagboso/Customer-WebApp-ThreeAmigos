using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data; // Ensure this matches your namespace

namespace ProductApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public FileController(ProductDbContext context)
        {
            _context = context;
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            // Fetch products from the Azure SQL Database
            var products = await _context.Products.ToListAsync();

            // Return the data as JSON
            return Ok(products);
        }
    }
}

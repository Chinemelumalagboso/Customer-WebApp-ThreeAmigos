using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;    // Namespace for ProductDbContext
using ProductApi.Models;  // Namespace for your Product entity
using System.Diagnostics;

namespace ProductApi.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ProductDbContext _context;

        // Constructor to inject DbContext and Logger
        public HomeController(ILogger<HomeController> logger, ProductDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // Default Index view
        public IActionResult Index()
        {
            return View();
        }

        // Privacy view
        public IActionResult Privacy()
        {
            return View();
        }

        // New endpoint to fetch products as JSON
        [HttpGet("api/products")]
        public async Task<IActionResult> GetProducts()
        {
            // Fetch products from the database
            var products = await _context.Products.ToListAsync();

            // Return as JSON
            return Json(products);
        }

        // Error handler
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

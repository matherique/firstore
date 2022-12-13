using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductController : Controller
    {
        private readonly Context _context;

        public ProductController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> index([FromQuery] string query, [FromQuery] int page, [FromQuery] int quantity)
        {
            if (query == null)
            {
                query = "";
            }

            if (quantity == 0)
            {
                quantity = 20;
            }

            if (page == 0)
            {
                page = 1;
            }


            int skip = quantity * (page - 1);

            Product[] products = await _context.Product
                .Where(m => m.name.ToLower().Contains(query))
                .OrderBy(m => m.name)
                .Skip(skip)
                .Take(quantity)
                .ToArrayAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> get(string id)
        {
            if (id == null || _context.Product == null)
            {
                return NotFound();
            }

            Product product = await _context.Product
                .FirstOrDefaultAsync(m => m.id == id);

            if (product == null)
            {
                return NotFound();
            }

            var stock = await _context.Stock.Where(m => m.productId == id).ToArrayAsync();

            int quantity = 0;

            foreach (var item in stock)
            {
                quantity += item.quantity;
            }

            return Ok(new GetProductResponse { id = product.id, name = product.name, price = product.price, quantity = quantity });
        }

        [HttpPost]
        public async Task<ActionResult<User>> create([FromBody] CreateProductRequest req)
        {
            try
            {
                Guid id = System.Guid.NewGuid();

                Product newProduct = new Product
                {
                    id = id.ToString("n"),
                    name = req.name,
                    price = req.price,
                    createdAt = DateTime.Now,
                    updatedAt = DateTime.Now
                };

                var resp = _context.Product.AddAsync(newProduct);

                await _context.SaveChangesAsync();

                return Ok(newProduct);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> edit([FromBody] EditProductRequest req, string id)
        {
            try
            {
                Product product = await _context.Product.FindAsync(id);

                product.name = req.name;
                product.price = req.price;
                product.updatedAt = DateTime.Now;


                await _context.SaveChangesAsync();

                return Ok(product);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> delete(string id)
        {
            try
            {
                Product product = await _context.Product.FindAsync(id);

                _context.Product.Remove(product);

                await _context.SaveChangesAsync();

                return Ok(product);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
    }
}

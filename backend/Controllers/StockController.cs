using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("stock")]
    public class StockController : Controller
    {
        private readonly Context _context;

        public StockController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> index([FromQuery] string query, [FromQuery] int page, [FromQuery] int quantity, [FromQuery] int maxQuantity)
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

            string[] productsIds = products.Select(p => p.id).ToArray();


            Stock[] stocks = await _context.Stock.GroupBy(m => m.productId)
                .Select(m => new Stock { productId = m.Key, quantity = m.Sum(m => m.quantity) })
                .ToArrayAsync();

            List<GetProductResponse> response = new List<GetProductResponse>();

            for (int i = 0; i < products.Length; i++)
            {
                Stock stock = stocks.FirstOrDefault(m => m.productId == products[i].id);

                if (maxQuantity > 0 && stock != null && stock.quantity > maxQuantity)
                {
                    continue;
                }

                response.Add(new GetProductResponse
                {
                    id = products[i].id,
                    name = products[i].name,
                    price = products[i].price,
                    quantity = stock != null ? stock.quantity : 0
                });
            }

            return Ok(response.ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> get(string id)
        {
            if (id == null || _context.Stock == null)
            {
                return NotFound();
            }

            Stock[] stock = await _context.Stock.Where(m => m.productId == id).ToArrayAsync();

            return Ok(stock);
        }

        [HttpPost]
        public async Task<ActionResult<User>> create([FromBody] CreateStockRequest req)
        {
            try
            {
                Guid id = System.Guid.NewGuid();

                Stock newStock = new Stock
                {
                    id = id.ToString("n"),
                    quantity = req.quantity,
                    productId = req.productId,
                    createdAt = DateTime.Now,
                    updatedAt = DateTime.Now
                };

                var resp = _context.Stock.AddAsync(newStock);

                await _context.SaveChangesAsync();

                return Ok(newStock);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // [HttpPut("{id}")]
        // public async Task<ActionResult<Stock>> edit([FromBody] EditStockRequest req, string id)
        // {
        //     try
        //     {
        //         Stock product = await _context.Stock.FindAsync(id);

        //         product.name = req.name;
        //         product.price = req.price;
        //         product.updatedAt = DateTime.Now;


        //         await _context.SaveChangesAsync();

        //         return Ok(product);

        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e);
        //     }

        // }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult> delete(string id)
        // {
        //     try
        //     {
        //         Stock product = await _context.Stock.FindAsync(id);

        //         _context.Stock.Remove(product);

        //         await _context.SaveChangesAsync();

        //         return Ok();
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e);
        //     }

        // }
    }
}

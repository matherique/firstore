using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Collections.Generic;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System.Net.Http;
using System.Net;

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


            Stock[] stocks = await _context.Stock.GroupBy(m => m.productId)
                .Select(m => new Stock { productId = m.Key, quantity = m.Sum(m => m.quantity) })
                .ToArrayAsync();

            List<GetProductResponse> response = new List<GetProductResponse>();

            for (int i = 0; i < products.Length; i++)
            {
                Stock stock = stocks.FirstOrDefault(m => m.productId == products[i].id);

                if (maxQuantity > 0 && stock.quantity > maxQuantity)
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

        [Route("report")]
        [HttpGet]
        public async Task<ActionResult> report()
        {

            Product[] products = await _context.Product
                .OrderBy(m => m.name)
                .ToArrayAsync();


            Stock[] stocks = await _context.Stock.GroupBy(m => m.productId)
               .Select(m => new Stock { productId = m.Key, quantity = m.Sum(m => m.quantity) })
               .ToArrayAsync();

            List<GetProductResponse> response = new List<GetProductResponse>();

            for (int i = 0; i < products.Length; i++)
            {
                Stock stock = stocks.FirstOrDefault(m => m.productId == products[i].id);

                response.Add(new GetProductResponse
                {
                    id = products[i].id,
                    name = products[i].name,
                    price = products[i].price,
                    quantity = stock != null ? stock.quantity : 0
                });
            }

            float pxPerMm = 72 / 25.2F;
            Document doc = new Document(PageSize.A4, 15 * pxPerMm, 15 * pxPerMm, 15 * pxPerMm, 20 * pxPerMm);
            string filename = $"stock.{DateTime.Now.ToString("yyyy.MM.dd.HH.mm.ss")}.pdf";
            FileStream file = new FileStream(filename, FileMode.Create);
            PdfWriter writer = PdfWriter.GetInstance(doc, file);
            doc.Open();

            BaseFont baseFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            Paragraph title = new Paragraph("Relatório do estoque", new Font(baseFont, 32, Font.BOLD, BaseColor.Black));
            title.Alignment = Element.ALIGN_CENTER;
            title.SpacingAfter = 10;
            doc.Add(title);

            var applyStyles = new Action<PdfPCell>((cell) =>
            {
                cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                cell.VerticalAlignment = PdfPCell.ALIGN_MIDDLE;
                cell.Border = 0;
                cell.BorderWidthBottom = 1;
                cell.FixedHeight = 25;
            });

            PdfPTable table = new PdfPTable(2);
            table.SetWidths(new float[] { 1, 1 });
            table.WidthPercentage = 100;

            var nome = new PdfPCell(new Phrase("Nome produto", new Font(baseFont, 16, Font.BOLD, BaseColor.Black)));
            var quantidade = new PdfPCell(new Phrase("Quantidade", new Font(baseFont, 16, Font.BOLD, BaseColor.Black)));

            applyStyles(nome);
            applyStyles(quantidade);

            table.AddCell(nome);
            table.AddCell(quantidade);

            foreach (var item in response)
            {
                var nomeProduto = new PdfPCell(new Phrase(item.name, new Font(baseFont, 16, Font.NORMAL, BaseColor.Black)));
                var quantidadeProduto = new PdfPCell(new Phrase(item.quantity.ToString(), new Font(baseFont, 16, Font.NORMAL, BaseColor.Black)));

                applyStyles(nomeProduto);
                applyStyles(quantidadeProduto);

                table.AddCell(nomeProduto);
                table.AddCell(quantidadeProduto);
            }

            doc.Add(table);
            doc.Close();
            file.Close();

            return Ok();
        }
    }
}
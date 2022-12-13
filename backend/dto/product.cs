using backend.Models;

namespace backend.Controllers
{
    public class GetProductResponse : Product
    {
        public int quantity { get; set; }
    }

    public class CreateProductRequest
    {
        public string name { get; set; }
        public decimal price { get; set; }
    }

    public class EditProductRequest
    {
        public string name { get; set; }
        public decimal price { get; set; }
    }
}
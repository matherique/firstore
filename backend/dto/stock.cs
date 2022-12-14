namespace backend.Controllers
{
    public class CreateStockRequest
    {
        public string productId { get; set; }
        public int quantity { get; set; }
    }

    public class EditStockRequest
    {
        public string productId { get; set; }
        public int quantity { get; set; }
    }
}
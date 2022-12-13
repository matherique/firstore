using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Stock
    {
        public string id { get; set; }
        public int quantity { get; set; }
        public string productId { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
    }
}

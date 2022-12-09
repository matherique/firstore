namespace backend.Controllers
{
    public class CreateUserRequest
    {
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string profile { get; set; }
    }

    public class EditUserRequest
    {
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string profile { get; set; }
    }
}
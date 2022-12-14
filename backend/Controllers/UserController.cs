using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly Context _context;

        public UserController(Context context)
        {
            _context = context;
        }

        // GET: User
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

            User[] users = await _context.User
                .Where(m => m.name.ToLower().Contains(query))
                .OrderBy(m => m.name)
                .Skip(skip)
                .Take(quantity)
                .ToArrayAsync();

            return Ok(users);
        }

        // GET: User/5
        [HttpGet("{id}")]
        public async Task<IActionResult> get(string id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> create([FromBody] CreateUserRequest req)
        {
            try
            {
                Guid id = System.Guid.NewGuid();

                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(req.password);

                User newuser = new User
                {
                    id = id.ToString("n"),
                    name = req.name,
                    email = req.email,
                    password = hashedPassword,
                    profile = req.profile,
                    status = true,
                    createdAt = DateTime.Now,
                    updatedAt = DateTime.Now
                };

                var resp = _context.User.AddAsync(newuser);

                await _context.SaveChangesAsync();

                return Ok(newuser);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> edit([FromBody] EditUserRequest req, string id)
        {
            try
            {
                User user = await _context.User.FindAsync(id);

                user.name = req.name;
                user.email = req.email;
                user.profile = req.profile;
                user.updatedAt = DateTime.Now;


                if (req.password != null)
                {
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(req.password);
                    user.password = hashedPassword;
                }

                await _context.SaveChangesAsync();

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> delete(string id)
        {
            try
            {
                User user = await _context.User.FindAsync(id);

                user.status = !user.status;
                user.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [Route("login")]
        [HttpPost()]
        public async Task<ActionResult<User>> login([FromBody] LoginRequest req)
        {
            try
            {
                User user = await _context.User.FirstOrDefaultAsync(m => m.email == req.email);

                if (user == null)
                {
                    return BadRequest("email ou senha inv??lidos");
                }

                if (!BCrypt.Net.BCrypt.Verify(req.password, user.password))
                {
                    return BadRequest("email ou senha inv??lidos");
                }

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.User.ToListAsync());
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
        public async Task<ActionResult<User>> creage([FromBody] CreateUserRequest req)
        {
            try
            {
                Guid id = System.Guid.NewGuid();

                User newuser = new User
                {
                    id = id.ToString("n"),
                    name = req.name,
                    email = req.email,
                    password = req.password,
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
                user.password = req.password;
                user.profile = req.profile;
                user.updatedAt = DateTime.Now;

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

                user.status = false;
                user.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using poke_poke.Models;

namespace poke_poke.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoresController : ControllerBase
    {
        private static List<GameScore> scores = new List<GameScore>();

        // GET method
        [HttpGet]
        public ActionResult<IEnumerable<GameScore>> GetScores() 
        {
            return Ok(scores);
        }
    }
}

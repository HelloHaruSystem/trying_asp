using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
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

        // holds the validTokens so you can't just post scores
        private static Dictionary<string, bool> validTokens = new Dictionary<string, bool>();

        // generates a random token sets valid to true
        [HttpGet("generate-token")]
        public ActionResult<string> GenerateToken()
        {
            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
            validTokens[token] = true;
            return Ok(token);
        }

        // GET all scores
        [HttpGet]
        public ActionResult<IEnumerable<GameScore>> GetScores()
        {
            return Ok(scores);
        }

        // GET a single score by ID
        [HttpGet("{id}")]
        public ActionResult<GameScore> GetScore(long id)
        {
            var gameScore = scores.Find(x => x.Id == id);

            if (gameScore == null)
            {
                return NotFound($"No score found with ID {id}");
            }

            return Ok(gameScore);
        }

        // POST a new score (Requires a valid token)
        [HttpPost]
        public ActionResult<GameScore> PostScore(GameScoreDTO scoreDTO, [FromHeader] string token)
        {
            if (string.IsNullOrEmpty(token) || !validTokens.ContainsKey(token))
            {
                return Unauthorized("Invalid or missing token");
            }

            // remove the token after use (as it is a one time use token)
            validTokens.Remove(token);

            var gameScore = new GameScore
            {
                Id = scores.Any() ? scores.Max(s => s.Id) + 1 : 1,
                PlayerName = scoreDTO.PlayerName,
                Score = scoreDTO.Score,
                TimeOfScore = scoreDTO.TimeOfScore,
            };

            scores.Add(gameScore);

            return CreatedAtAction(nameof(GetScore), new { id = gameScore.Id }, gameScore);
        }

        // DELETE a score by ID
        [HttpDelete("{id}")]
        public ActionResult DeleteScore(long id)
        {
            var score = scores.Find(x => x.Id == id);
            if (score == null)
            {
                return NotFound();
            }

            scores.Remove(score);

            return NoContent();
        }
    }
}
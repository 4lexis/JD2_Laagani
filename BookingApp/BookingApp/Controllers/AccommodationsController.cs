using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BookingApp.Models;

namespace BookingApp.Controllers
{
    public class AccommodationsController : ApiController
    {
        private BAContext db = new BAContext();

        [Route("api/Accommodations")]
        // GET: api/Accommodations
        public IQueryable<Accommodation> GetAccommodations()
        {
            return db.Accommodations;
        }

        [Route("api/Accommodations/{id}")]
        // GET: api/Accommodations/5
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult GetAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            return Ok(accommodation);
        }

        [Route("api/Accommodations/Rooms/{id}")]
        // GET: api/Accommodations/Rooms
        public IQueryable<Room> GetRooms(int id)
        {
            return db.Rooms.Where(r => r.Accommodation_Id == id);
        }

        [Route("api/Accommodations/{id}")]
        // PUT: api/Accommodations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodation(int id, Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accommodation.Id)
            {
                return BadRequest();
            }

            db.Entry(accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Manager")]
        [Route("api/Accommodations")]
        // POST: api/Accommodations
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = accommodation.Id }, accommodation);
        }

        [Route("api/Accommodations")]
        // DELETE: api/Accommodations/5
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            db.Accommodations.Remove(accommodation);
            db.SaveChanges();

            return Ok(accommodation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }
    }
}
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
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/RoomReservations
        public IQueryable<RoomReservation> GetRoomReservationss()
        {
            return db.RoomReservationss;
        }

        // GET: api/RoomReservations/5
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult GetRoomReservations(int id)
        {
            RoomReservation roomReservations = db.RoomReservationss.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            return Ok(roomReservations);
        }

        // PUT: api/RoomReservations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomReservations(int id, RoomReservation roomReservations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomReservations.Id)
            {
                return BadRequest();
            }

            db.Entry(roomReservations).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationsExists(id))
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

        // POST: api/RoomReservations
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult PostRoomReservations(RoomReservation roomReservations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = db.Rooms.First(r => r.Id == roomReservations.Room_Id);
            room.Free = false;

            db.Entry(room).State = EntityState.Modified;
        
            db.RoomReservationss.Add(roomReservations);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = roomReservations.Id }, roomReservations);
        }

        // DELETE: api/RoomReservations/5
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult DeleteRoomReservations(int id)
        {
            RoomReservation roomReservations = db.RoomReservationss.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            db.RoomReservationss.Remove(roomReservations);
            db.SaveChanges();

            return Ok(roomReservations);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationsExists(int id)
        {
            return db.RoomReservationss.Count(e => e.Id == id) > 0;
        }
    }
}
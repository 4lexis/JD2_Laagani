using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using BookingApp.Models;

namespace BookingApp.Controllers.OData
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using BookingApp.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<RoomReservations>("RoomReservations");
    builder.EntitySet<Room>("Rooms"); 
    builder.EntitySet<AppUser>("AppUsers"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ORoomReservationsController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/RoomReservations
        [EnableQuery]
        public IQueryable<RoomReservation> GetRoomReservations()
        {
            return db.RoomReservationss;
        }

        // GET: odata/RoomReservations(5)
        [EnableQuery]
        public SingleResult<RoomReservation> GetRoomReservations([FromODataUri] int key)
        {
            return SingleResult.Create(db.RoomReservationss.Where(roomReservations => roomReservations.Id == key));
        }

        // PUT: odata/RoomReservations(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<RoomReservation> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RoomReservation roomReservations = db.RoomReservationss.Find(key);
            if (roomReservations == null)
            {
                return NotFound();
            }

            patch.Put(roomReservations);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(roomReservations);
        }

        // POST: odata/RoomReservations
        public IHttpActionResult Post(RoomReservation roomReservations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomReservationss.Add(roomReservations);
            db.SaveChanges();

            return Created(roomReservations);
        }

        // PATCH: odata/RoomReservations(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<RoomReservation> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RoomReservation roomReservations = db.RoomReservationss.Find(key);
            if (roomReservations == null)
            {
                return NotFound();
            }

            patch.Patch(roomReservations);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(roomReservations);
        }

        // DELETE: odata/RoomReservations(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            RoomReservation roomReservations = db.RoomReservationss.Find(key);
            if (roomReservations == null)
            {
                return NotFound();
            }

            db.RoomReservationss.Remove(roomReservations);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/RoomReservations(5)/Room
        [EnableQuery]
        public SingleResult<Room> GetRoom([FromODataUri] int key)
        {
            return SingleResult.Create(db.RoomReservationss.Where(m => m.Id == key).Select(m => m.Room));
        }

        // GET: odata/RoomReservations(5)/User
        [EnableQuery]
        public SingleResult<AppUser> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.RoomReservationss.Where(m => m.Id == key).Select(m => m.AppUser));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationsExists(int key)
        {
            return db.RoomReservationss.Count(e => e.Id == key) > 0;
        }
    }
}

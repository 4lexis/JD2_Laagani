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
    builder.EntitySet<Room>("Rooms");
    builder.EntitySet<Accommodation>("Accommodations"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class RoomsController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/Rooms
        [EnableQuery]
        public IQueryable<Room> GetRooms()
        {
            return db.Rooms;
        }

        // GET: odata/Rooms(5)
        [EnableQuery]
        public SingleResult<Room> GetRoom([FromODataUri] int key)
        {
            return SingleResult.Create(db.Rooms.Where(room => room.Id == key));
        }

        // PUT: odata/Rooms(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Room> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = db.Rooms.Find(key);
            if (room == null)
            {
                return NotFound();
            }

            patch.Put(room);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(room);
        }

        // POST: odata/Rooms
        public IHttpActionResult Post(Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rooms.Add(room);
            db.SaveChanges();

            return Created(room);
        }

        // PATCH: odata/Rooms(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Room> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = db.Rooms.Find(key);
            if (room == null)
            {
                return NotFound();
            }

            patch.Patch(room);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(room);
        }

        // DELETE: odata/Rooms(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Room room = db.Rooms.Find(key);
            if (room == null)
            {
                return NotFound();
            }

            db.Rooms.Remove(room);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Rooms(5)/Accommodation
        [EnableQuery]
        public SingleResult<Accommodation> GetAccommodation([FromODataUri] int key)
        {
            return SingleResult.Create(db.Rooms.Where(m => m.Id == key).Select(m => m.Accommodation));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int key)
        {
            return db.Rooms.Count(e => e.Id == key) > 0;
        }
    }
}

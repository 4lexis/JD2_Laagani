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
    builder.EntitySet<Accommodation>("Accommodations");
    builder.EntitySet<AccommodationType>("AccommodationsTypes"); 
    builder.EntitySet<Place>("Places"); 
    builder.EntitySet<User>("Users1"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class OAccommodationsController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/Accommodations
        [EnableQuery]
        public IQueryable<Accommodation> GetAccommodations()
        {
            return db.Accommodations;
        }

        // GET: odata/Accommodations(5)
        [EnableQuery]
        public SingleResult<Accommodation> GetAccommodation([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(accommodation => accommodation.Id == key));
        }

        // PUT: odata/Accommodations(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Accommodation> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Accommodation accommodation = db.Accommodations.Find(key);
            if (accommodation == null)
            {
                return NotFound();
            }

            patch.Put(accommodation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(accommodation);
        }

        // POST: odata/Accommodations
        public IHttpActionResult Post(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            return Created(accommodation);
        }

        // PATCH: odata/Accommodations(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Accommodation> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Accommodation accommodation = db.Accommodations.Find(key);
            if (accommodation == null)
            {
                return NotFound();
            }

            patch.Patch(accommodation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(accommodation);
        }

        // DELETE: odata/Accommodations(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Accommodation accommodation = db.Accommodations.Find(key);
            if (accommodation == null)
            {
                return NotFound();
            }

            db.Accommodations.Remove(accommodation);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Accommodations(5)/AType
        [EnableQuery]
        public SingleResult<AccommodationType> GetAType([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(m => m.Id == key).Select(m => m.AType));
        }

        // GET: odata/Accommodations(5)/Place
        [EnableQuery]
        public SingleResult<Place> GetPlace([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(m => m.Id == key).Select(m => m.Place));
        }

        // GET: odata/Accommodations(5)/User
        [EnableQuery]
        public SingleResult<AppUser> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(m => m.Id == key).Select(m => m.User));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int key)
        {
            return db.Accommodations.Count(e => e.Id == key) > 0;
        }
    }
}

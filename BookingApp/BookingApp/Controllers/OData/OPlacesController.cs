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
    builder.EntitySet<Place>("Places");
    builder.EntitySet<Region>("Regions"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class OPlacesController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/Places
        [EnableQuery]
        public IQueryable<Place> GetPlaces()
        {
            return db.Places;
        }

        // GET: odata/Places(5)
        [EnableQuery]
        public SingleResult<Place> GetPlace([FromODataUri] int key)
        {
            return SingleResult.Create(db.Places.Where(place => place.Id == key));
        }

        // PUT: odata/Places(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Place> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Place place = db.Places.Find(key);
            if (place == null)
            {
                return NotFound();
            }

            patch.Put(place);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(place);
        }

        // POST: odata/Places
        public IHttpActionResult Post(Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Places.Add(place);
            db.SaveChanges();

            return Created(place);
        }

        // PATCH: odata/Places(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Place> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Place place = db.Places.Find(key);
            if (place == null)
            {
                return NotFound();
            }

            patch.Patch(place);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(place);
        }

        // DELETE: odata/Places(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Place place = db.Places.Find(key);
            if (place == null)
            {
                return NotFound();
            }

            db.Places.Remove(place);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Places(5)/Region
        [EnableQuery]
        public SingleResult<Region> GetRegion([FromODataUri] int key)
        {
            return SingleResult.Create(db.Places.Where(m => m.Id == key).Select(m => m.Region));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlaceExists(int key)
        {
            return db.Places.Count(e => e.Id == key) > 0;
        }
    }
}

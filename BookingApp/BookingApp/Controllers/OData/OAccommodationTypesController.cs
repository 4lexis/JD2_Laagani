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
    builder.EntitySet<AccommodationType>("AccommodationTypes");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class OAccommodationTypesController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/AccommodationTypes
        [EnableQuery]
        public IQueryable<AccommodationType> GetAccommodationTypes()
        {
            return db.AccommodationsTypes;
        }

        // GET: odata/AccommodationTypes(5)
        [EnableQuery]
        public SingleResult<AccommodationType> GetAccommodationType([FromODataUri] int key)
        {
            return SingleResult.Create(db.AccommodationsTypes.Where(accommodationType => accommodationType.Id == key));
        }

        // PUT: odata/AccommodationTypes(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<AccommodationType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AccommodationType accommodationType = db.AccommodationsTypes.Find(key);
            if (accommodationType == null)
            {
                return NotFound();
            }

            patch.Put(accommodationType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(accommodationType);
        }

        // POST: odata/AccommodationTypes
        public IHttpActionResult Post(AccommodationType accommodationType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccommodationsTypes.Add(accommodationType);
            db.SaveChanges();

            return Created(accommodationType);
        }

        // PATCH: odata/AccommodationTypes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<AccommodationType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AccommodationType accommodationType = db.AccommodationsTypes.Find(key);
            if (accommodationType == null)
            {
                return NotFound();
            }

            patch.Patch(accommodationType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(accommodationType);
        }

        // DELETE: odata/AccommodationTypes(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            AccommodationType accommodationType = db.AccommodationsTypes.Find(key);
            if (accommodationType == null)
            {
                return NotFound();
            }

            db.AccommodationsTypes.Remove(accommodationType);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationTypeExists(int key)
        {
            return db.AccommodationsTypes.Count(e => e.Id == key) > 0;
        }
    }
}

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
    builder.EntitySet<Region>("Regions");
    builder.EntitySet<Country>("Countries"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class RegionsController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/Regions
        [EnableQuery]
        public IQueryable<Region> GetRegions()
        {
            return db.Regions;
        }

        // GET: odata/Regions(5)
        [EnableQuery]
        public SingleResult<Region> GetRegion([FromODataUri] int key)
        {
            return SingleResult.Create(db.Regions.Where(region => region.Id == key));
        }

        // PUT: odata/Regions(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Region> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Region region = db.Regions.Find(key);
            if (region == null)
            {
                return NotFound();
            }

            patch.Put(region);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(region);
        }

        // POST: odata/Regions
        public IHttpActionResult Post(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Regions.Add(region);
            db.SaveChanges();

            return Created(region);
        }

        // PATCH: odata/Regions(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Region> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Region region = db.Regions.Find(key);
            if (region == null)
            {
                return NotFound();
            }

            patch.Patch(region);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(region);
        }

        // DELETE: odata/Regions(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Region region = db.Regions.Find(key);
            if (region == null)
            {
                return NotFound();
            }

            db.Regions.Remove(region);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Regions(5)/Country
        [EnableQuery]
        public SingleResult<Country> GetCountry([FromODataUri] int key)
        {
            return SingleResult.Create(db.Regions.Where(m => m.Id == key).Select(m => m.Country));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RegionExists(int key)
        {
            return db.Regions.Count(e => e.Id == key) > 0;
        }
    }
}

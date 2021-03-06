﻿using System;
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
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace BookingApp.Controllers
{
    public class BAIdentityUsersController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize]
        // GET: api/BAIdentityUsers
        public IQueryable<BAIdentityUser> GetBAIdentityUsers()
        {
            return db.Users;
        }

        // GET: api/BAIdentityUsers/5
        [ResponseType(typeof(BAIdentityUser))]
        public IHttpActionResult GetBAIdentityUser(string username)
        {

            BAIdentityUser bAIdentityUser = db.Users.First(u => u.UserName == username);
            if (bAIdentityUser == null)
            {
                return NotFound();
            }

            return Ok(bAIdentityUser);
        }

        [Route("roles/{username}")]
        // GET: api/BAIdentityUsers/
        [ResponseType(typeof(BAIdentityUser))]
        public IHttpActionResult GetUserRole(string username)
        {

            BAIdentityUser user = db.Users.First(u => u.UserName == username);
            if (user == null)
            {
                return NotFound();
            }

            var userStore = new UserStore<BAIdentityUser>(db);
            var userManager = new UserManager<BAIdentityUser>(userStore);
            

            return Ok(userManager.GetRoles(user.Id));
        }

        // PUT: api/BAIdentityUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBAIdentityUser(string id, BAIdentityUser bAIdentityUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bAIdentityUser.Id)
            {
                return BadRequest();
            }

            db.Entry(bAIdentityUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BAIdentityUserExists(id))
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

        // POST: api/BAIdentityUsers
        [ResponseType(typeof(BAIdentityUser))]
        public IHttpActionResult PostBAIdentityUser(BAIdentityUser bAIdentityUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(bAIdentityUser);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BAIdentityUserExists(bAIdentityUser.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bAIdentityUser.Id }, bAIdentityUser);
        }

        // DELETE: api/BAIdentityUsers/5
        [ResponseType(typeof(BAIdentityUser))]
        public IHttpActionResult DeleteBAIdentityUser(string id)
        {
            BAIdentityUser bAIdentityUser = db.Users.Find(id);
            if (bAIdentityUser == null)
            {
                return NotFound();
            }

            db.Users.Remove(bAIdentityUser);
            db.SaveChanges();

            return Ok(bAIdentityUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BAIdentityUserExists(string id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}
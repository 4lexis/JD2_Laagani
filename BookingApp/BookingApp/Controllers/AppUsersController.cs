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
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace BookingApp.Controllers
{
    public class AppUsersController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/AppUsers
        public IQueryable<AppUser> GetAppUsers()
        {
            return db.AppUsers;
        }

        // GET: api/AppUsers/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetAppUser(int id)
        {
            AppUser appUser = db.AppUsers.Find(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }

        // PUT: api/AppUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAppUser(string id, AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appUser.Id)
            {
                return BadRequest();
            }

            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();

                BAIdentityUser user = db.Users.Find(id);
                var userStore = new UserStore<BAIdentityUser>(db);
                var userManager = new UserManager<BAIdentityUser>(userStore);


                string oldRole = userManager.GetRoles(id).First();
                if (oldRole != appUser.Role)
                {
                    userManager.RemoveFromRole(id, oldRole);
                    userManager.AddToRole(user.Id, appUser.Role);
                }
                user.Email = appUser.Email;
                user.UserName = appUser.Username;
                userManager.Update(user);

                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
                {
                    return NotFound();
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AppUsers
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult PostAppUser(AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new BAIdentityUser()
            {
                Id = appUser.Username,
                UserName = appUser.Username,
                Email = appUser.Email,
                PasswordHash = BAIdentityUser.HashPassword(appUser.Password)
            };

            var userStore = new UserStore<BAIdentityUser>(db);
            var userManager = new UserManager<BAIdentityUser>(userStore);

            userManager.Create(user);
            userManager.AddToRole(user.Id, appUser.Role);
            appUser.Id = appUser.Username;
            appUser.ResetPassword();

            db.AppUsers.Add(appUser);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = appUser.Id }, appUser);
        }

        [HttpDelete]
        // DELETE: api/AppUsers/{username}
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult DeleteAppUser(string id)
        {
            AppUser appUser = db.AppUsers.Find(id);
            if (appUser == null)
            {
                return NotFound();
            }

            BAIdentityUser user = db.Users.Find(id);

            db.AppUsers.Remove(appUser);
            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(appUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppUserExists(string id)
        {
            return db.AppUsers.Count(e => e.Id == id) > 0;
        }
    }
}
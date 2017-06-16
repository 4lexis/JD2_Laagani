

namespace BookingApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BookingApp.Models.BAContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BookingApp.Models.BAContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //            

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Manager" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            var userStore = new UserStore<BAIdentityUser>(context);
            var userManager = new UserManager<BAIdentityUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                var user = new BAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("admin") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
                AppUser appUser = new AppUser();
                appUser.Username = user.UserName;
                appUser.Email = user.Email;
                appUser.Role = userManager.GetRoles("admin").First();
                context.AppUsers.Add(appUser);
            }

            AppUser user1 = new AppUser();
            AppUser user2 = new AppUser();

            if (!context.Users.Any(u => u.UserName == "ja"))
            {
                var user3 = new BAIdentityUser() { Id = "ja", UserName = "ja", Email = "ja@mailinator.com", PasswordHash = BAIdentityUser.HashPassword("ja") };
                userManager.Create(user3);
                userManager.AddToRole(user3.Id, "AppUser");
                user1.Username = user3.UserName;
                user1.Email = user3.Email;
                user1.Role = userManager.GetRoles("ja").First();
               // user1.Id = user3.Id;
            }

            if (!context.Users.Any(u => u.UserName == "user1"))
            {
                var user3 = new BAIdentityUser() { Id = "user1", UserName = "user1", Email = "user1@mailinator.com", PasswordHash = BAIdentityUser.HashPassword("user1") };
                userManager.Create(user3);
                userManager.AddToRole(user3.Id, "AppUser");
                user2.Username = user3.UserName;
                user2.Email = user3.Email;
                user2.Role = userManager.GetRoles("user1").First();
                context.AppUsers.Add(user2);
            }

            AccommodationType acctype = new AccommodationType();
            acctype.Id = 88;
            acctype.Name = "Buras";

         
            Country country = new Country();
            country.Code = 123854;
            country.Id = 13;
            country.Name = "Srbija";


            Place place = new Place();
            place.Id = 2;
            place.Name = "Mesto";

            Region region = new Region();
            region.Id = 5;
            region.Name = "Area55";
            region.m_Place.Add(place);
            region.Country = country;

            place.Region = region;

            context.Countries.Add(country);
            context.Places.Add(place);
            context.AccommodationsTypes.Add(acctype);
            context.AppUsers.Add(user1);

            Accommodation acc = new Accommodation();
            acc.Address = "Addr";
            acc.Approved = true;
            acc.AverageGrade = 3;
            acc.Description = "ey";
            acc.Id = 16;
            acc.Latitude = 12.2;
            acc.Longitude = 23.25;
            acc.Name = "Delux";
            acc.ImageURL = "url";
            acc.Place = place;
            acc.AccommodationType = acctype;
            //acc.m_Comment.Add(new Comment());
            //acc.m_Room.Add(new Room());
            acc.AppUser = user1;
            context.Accommodations.Add(acc);

            Accommodation acc2 = new Accommodation();
            acc2.Address = "Addr";
            acc2.Approved = true;
            acc2.AverageGrade = 3;
            acc2.Description = "ey";
            acc2.Id = 16;
            acc2.Latitude = 12.2;
            acc2.Longitude = 23.25;
            acc2.Name = "Hotel Park";
            acc2.ImageURL = "url";
            acc2.Place = place;
            acc2.AccommodationType = acctype;
            //acc.m_Comment.Add(new Comment());
            //acc.m_Room.Add(new Room());
            acc2.AppUser = user2;
            context.Accommodations.Add(acc2);

            Comment comment = new Comment();
            comment.Grade = 3;
            comment.Text = "awe";
            comment.Accommodation = acc;
            comment.AppUser = user1;

            context.Comments.Add(comment);

            Room room = new Room();
            room.BedCount = 3;
            room.Description = "DarkRoom Hehe";
            room.PricePerNight = 23;
            room.RoomNumber = 7;
            room.Accommodation = acc;

            context.Rooms.Add(room);

            RoomReservation rez = new RoomReservation();
            rez.StartDate = DateTime.Now;
            rez.EndDate = DateTime.Now;
            rez.Timestamp = DateTime.Now;
            rez.Room = room;
            rez.AppUser = user1;

            context.RoomReservationss.Add(rez);

        }
    }
}

using BookingApp.Models;

namespace BookingApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
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
            }

            AppUser user1 = new AppUser();
            user1.Email = "mail@gmail.com";
            user1.Id = 0;
            user1.Password = "#$%123";
            user1.Username = "haxn00b";            

            Room room = new Room();
            room.BedCount = 1;
            room.Description = "asd";
            room.Id = 2;
            room.PricePerNight = 23;
            room.RoomNumber = 7;
            
            Place place = new Place();
            place.Id = 2;
            place.Name = "Mesto";

            Comment comment = new Comment();
            comment.Grade = 3;
            comment.Text = "awe";

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

            Country country = new Country();
            country.Code = 123854;
            country.Id = 13;
            country.Name = "Srbija";

            Region region = new Region();
            region.Id = 5;
            region.Name = "Area55";

            RoomReservations rez = new RoomReservations();
            rez.StartDate = DateTime.Now;
            rez.EndDate = DateTime.Now;
            rez.Timestamp = DateTime.Now;

            AccommodationType acctype = new AccommodationType();
            acctype.Id = 88;
            acctype.Name = "Buras";

            room.m_RoomReservations.Add(rez);
            acc.m_Comment.Add(comment);
            acc.m_Room.Add(room);
            place.m_Accommodation.Add(acc);
            region.m_Place.Add(place);
            country.m_Region.Add(region);
            acctype.m_Accommodation.Add(acc);
            comment.Accommodation = acc;
            comment.User = user1;
            user1.m_Accommodation.Add(acc);
            user1.m_Comment.Add(comment);
            user1.m_RoomReservations.Add(rez);
                                    
            context.Accommodations.Add(acc);
            context.AccommodationsTypes.Add(acctype);
            context.Comments.Add(comment);
            context.Countries.Add(country);
            context.Places.Add(place);
            context.Regions.Add(region);
            context.Rooms.Add(room);
            context.RoomReservationss.Add(rez);
            
            
        }
    }
}

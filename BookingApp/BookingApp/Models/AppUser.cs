using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    /// <summary>
    /// Ovu klasu korisnika saljem na web...
    /// </summary>
    public class AppUser
    {
        private string id;
        private string email;
        private string username;
        private string password;
        public List<Comment> Comment;
        public List<RoomReservation> RoomReservations;
        public List<Accommodation> Accommodation;
        private string role { get; set; }

        public AppUser()
        {
            RoomReservations = new List<RoomReservation>();
            Accommodation = new List<Accommodation>();
            Comment = new List<Comment>();
            password = "unknown";
        }

        public string Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }

        public string Email
        {
            get
            {
                return email;
            }
            set
            {
                email = value;
            }
        }

        public string Username
        {
            get
            {
                return username;
            }
            set
            {
                username = value;
            }
        }

        public string Password
        {
            get
            {
                return password;
            }
            set
            {
                password = value;
            }
        }


        public string Role
        {
            get
            {
                return role;
            }
            set
            {
                role = value;
            }
        }

        public void ResetPassword()
        {
            password = "unknown";
        }
    }
}
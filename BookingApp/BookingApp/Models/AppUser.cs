using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        private string email;
        private int id;
        private string password;
        private string username;
        public List<Comment> m_Comment;
        public List<RoomReservations> m_RoomReservations;
        public List<Accommodation> m_Accommodation;

        public AppUser()
        {

        }

        ~AppUser()
        {

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

        public int Id
        {
            get
            {
                return Id;
            }
            set
            {
                Id = value;
            }
        }

        public string Password
        {
            get
            {
                return Password;
            }
            set
            {
                Password = value;
            }
        }

        public string Username
        {
            get
            {
                return Username;
            }
            set
            {
                Username = value;
            }
        }
    }
}
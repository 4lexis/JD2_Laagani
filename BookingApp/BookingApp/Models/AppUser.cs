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
        public List<RoomReservation> m_RoomReservations;
        public List<Accommodation> m_Accommodation;

        public AppUser()
        {
            m_RoomReservations = new List<RoomReservation>();
            m_Accommodation = new List<Accommodation>();
            m_Comment = new List<Comment>();
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
                return id;
            }
            set
            {
                id = value;
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
    }
}
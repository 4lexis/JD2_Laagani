///////////////////////////////////////////////////////////
//  Region.cs
//  Implementation of the Class Region
//  Generated by Enterprise Architect
//  Created on:      06-Jun-2017 00:33:18
//  Original author: Alexis
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;


namespace BookingApp.Models
{
    public class Region
    {

        private int id;
        private string name;

        public List<Place> m_Place;

        /// <summary>
        /// Foreign key of country
        /// </summary>
        [ForeignKey("Country")]
        public int RefCountry { get; set; }

        public Region()
        {

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

        public string Name
        {
            get
            {
                return name;
            }
            set
            {
                name = value;
            }
        }

    }//end Region

}//end namespace System
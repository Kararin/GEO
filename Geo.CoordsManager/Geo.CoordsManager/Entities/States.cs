using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Geo.CoordsManager.DAL.Entities
{
    /// <summary>
    /// Anonymous are those users who access the API without using credentials. The limitations for anonymous users are:
    /// - Anonymous users can only get the most recent state vectors, i.e.the time parameter will be ignored.
    /// - Anonymous users can only retrieve data with a time resultion of 10 seconds. That means, the API will return 
    ///   state vectors for time now−(now mod 10).
    /// </summary>
    public class States
    {
        /// <summary>
        /// Unique ICAO 24-bit address of the transponder in hex string representation.
        /// </summary>
        public string Icao24 { get; set; }

        /// <summary>
        /// Callsign of the vehicle (8 chars). Can be null if no callsign has been received.
        /// </summary>
        public string Callsign { get; set; }

        /// <summary>
        /// Country name inferred from the ICAO 24-bit address.
        /// </summary>
        public string OriginCountry { get; set; }

        /// <summary>
        /// Unix timestamp (seconds) for the last position update. Can be null if no 
        /// position report was received by OpenSky within the past 15s.
        /// </summary>
        public float? TimePosition { get; set; }

        /// <summary>
        /// Unix timestamp (seconds) for the last velocity update. Can be null if no 
        /// velocity report was received by OpenSky within the past 15s.
        /// </summary>
        public float? TimeVelocity { get; set; }

        /// <summary>
        /// WGS-84 longitude in decimal degrees. Can be null.
        /// </summary>
        public float? Longitude { get; set; }

        /// <summary>
        /// WGS-84 latitude in decimal degrees. Can be null.
        /// </summary>
        public float? Latitude { get; set; }

        /// <summary>
        /// Barometric or geometric altitude in meters. Can be null.
        /// </summary>
        public float? Altitude { get; set; }

        /// <summary>
        /// Boolean value which indicates if the position was retrieved from a surface position report.
        /// </summary>
        public bool? OnGround { get; set; }

        /// <summary>
        /// Velocity over ground in m/s. Can be null.
        /// </summary>
        public float? Velocity { get; set; }

        /// <summary>
        /// Heading in decimal degrees clockwise from north (i.e. north=0°). Can be null.
        /// </summary>
        public float? Heading { get; set; }

        /// <summary>
        /// Vertical rate in m/s. A positive value indicates that the airplane is climbing, 
        /// a negative value indicates that it descends. Can be null.
        /// </summary>
        public float? VerticalRate { get; set; }

        /// <summary>
        /// IDs of the receivers which contributed to this state vector. Is null if no 
        /// filtering for sensor was used in the request.
        /// </summary>
        public int[] Sensors { get; set; }
    }
}

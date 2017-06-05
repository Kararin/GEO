using Geo.CoordsManager.DAL.Entities;
using HttpUtils;
using System;
using System.Collections.Generic;

namespace Geo.CoordsManager.Import
{
    public static class Import
    {
        private static string endPoint = @"https://opensky-network.org/api/states/all";

        public static string[] GetFlightIds()
        {
            var client = new RestClient(endPoint);
            var json = client.MakeRequest();
            dynamic parsedJson = Newtonsoft.Json.JsonConvert.DeserializeObject(json);

            string[] ids = new string[parsedJson.states.Count];
            for (int i = 0; i < parsedJson.states.Count; i++)
            {
                ids[i] = parsedJson.states[i][0];
            }

            return ids;
        }
        public static PositionModel GetFlightInfo(string flightId)
        {
            long now = DateTimeOffset.Now.ToUnixTimeSeconds();
            //long yesterday = now - 31556926;
            //now = now - now % 10; // Anonymous users can only retrieve data with a time resultion of 10 seconds.

            var client = new RestClient(endPoint);
            var json = client.MakeRequest($"?icao24={flightId}");
            dynamic parsedJson = Newtonsoft.Json.JsonConvert.DeserializeObject(json);

            /*
             *  0	icao24
             *  1	callsign
             *  2	origin_country
             *  3	time_position
             *  4	time_velocity
             *  5	longitude
             *  6	latitude
             *  7	altitude
             *  8	on_ground
             *  9	velocity
             *  10	heading
             *  11	vertical_rate
             *  12	sensors
             */
            return new PositionModel
            {
                DateTime = DateTime.Now,
                States = new States
                {
                    Icao24 = parsedJson.states[0][0],
                    Callsign = parsedJson.states[0][1],
                    OriginCountry = parsedJson.states[0][2],
                    TimePosition = (float?)(parsedJson.states[0][3]),
                    TimeVelocity = (float?)(parsedJson.states[0][4]),
                    Longitude = (float?)(parsedJson.states[0][5]),
                    Latitude = (float?)(parsedJson.states[0][6]),
                    Altitude = (float?)(parsedJson.states[0][7]),
                    OnGround = (bool?)(parsedJson.states[0][8]),
                    Velocity = (float?)(parsedJson.states[0][9]),
                    Heading = (float?)(parsedJson.states[0][10]),
                    VerticalRate = (float?)(parsedJson.states[0][11])
                }
            };
        }
    }
}

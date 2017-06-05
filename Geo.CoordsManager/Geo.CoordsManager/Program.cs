using Geo.CoordsManager.DAL;
using Geo.CoordsManager.DAL.Entities;
using System;
using System.Data;
using System.Data.Entity;
using System.Threading;

namespace Geo.CoordsManager
{
    class Program
    {
        private static string flightId;
        private static int timeout = 10000; // 10s
        private static DbSet<Position> dbSet;
        

        static void Main(string[] args)
        {
            string[] flightIds = Import.Import.GetFlightIds();
            Console.WriteLine("Available flights:");
            for (int i = 0; i < flightIds.Length; i++)
            {
                Console.Write($"{flightIds[i]}; ");
            }

            Console.WriteLine("\nWhich One do you want to track?");
            flightId = Console.ReadLine();

            while (true)
            {
                PositionModel position = Import.Import.GetFlightInfo(flightId);

                Console.WriteLine($"At time {position.DateTime}, we’ve seen {flightId} (call-sign {position.States.Callsign}) at latitude {position.States.Latitude}°, longitude {position.States.Longitude}°, and altitude {position.States.Altitude}m flying at {position.States.Velocity}m/s into direction {position.States.Heading}°. Velocity was updated at {position.States.TimeVelocity}. Position was updated at {position.States.TimePosition}.");

                using (GeoDBEntities context = new GeoDBEntities())
                {
                    var dbPos = new Position();

                    dbPos.Id = Guid.NewGuid();
                    dbPos.altitude = position.States.Altitude;
                    dbPos.heading = position.States.Heading ?? 0;
                    dbPos.latitude = position.States.Latitude ?? 0;
                    dbPos.longitude = position.States.Longitude ?? 0;
                    dbPos.time = position.DateTime;
                    dbPos.velocity = position.States.Velocity ?? 0;
                    dbPos.vertical_rate = position.States.VerticalRate;

                    context.Positions.Add(dbPos);
                    //Console.WriteLine(context.SaveChanges());
                    Console.WriteLine(context.SaveChanges() > 0 ? "Stored" : "NotStored");
                }

                Thread.Sleep(timeout);
            }
           
        }
    }
}

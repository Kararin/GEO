//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Geo.CoordsManager.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Position
    {
        public System.Guid Id { get; set; }
        public float longitude { get; set; }
        public float latitude { get; set; }
        public Nullable<float> altitude { get; set; }
        public float velocity { get; set; }
        public float heading { get; set; }
        public Nullable<float> vertical_rate { get; set; }
        public System.DateTime time { get; set; }
    }
}

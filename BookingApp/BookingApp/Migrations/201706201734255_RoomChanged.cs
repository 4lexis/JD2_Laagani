namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rooms", "Free", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Rooms", "Free");
        }
    }
}

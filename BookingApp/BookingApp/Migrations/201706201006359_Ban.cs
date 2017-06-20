namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Ban : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "Banned", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AppUsers", "Banned");
        }
    }
}

﻿using Microsoft.EntityFrameworkCore;

namespace Shopnetic.Shared.Database
{
    public class ShopneticDbContext : DbContext
    {
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartOwner> CartOwners { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductPrice> ProductPrices { get; set; }
        public DbSet<ProductInventory> ProductInventories { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<DiscountCode> DiscountCodes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderDiscount> OrderDiscounts { get; set; }
        public DbSet<User> Users { get; set; }

        public ShopneticDbContext(DbContextOptions<ShopneticDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CartOwner>()
                .HasDiscriminator<string>("CartOwnerType")
                .HasValue<RegisteredCartOwner>("Registered")
                .HasValue<AnonymousCartOwner>("Anonymous");

            modelBuilder.Entity<Discount>()
                .HasDiscriminator<string>("DiscountType")
                .HasValue<ProductDiscount>("Product")
                .HasValue<CartDiscount>("Cart");
        }
    }
}
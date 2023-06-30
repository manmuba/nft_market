from django.contrib import admin

from .models import Product
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_name', 'likes', 'category', 'creator', 'stock', 'created_at', 'product_image', 'generate_link']
    list_display_links = ['product_name',]

admin.site.register(Product, ProductAdmin)
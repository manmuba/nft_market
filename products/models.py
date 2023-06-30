import os
from django.db import models
from django.forms import ValidationError
from django.contrib.sites.shortcuts import get_current_site
from django.utils.html import mark_safe

from accounts.models import Account
from category.models import Category
# Create your models here.

def validate_image_extension(value):
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    ext = os.path.splitext(value.name)[1]
    if not ext.lower() in allowed_extensions:
        raise ValidationError('Unsupported file extension.')

class Product(models.Model):
    product_name    = models.CharField(max_length=50, unique=True)
    product_img     = models.ImageField(upload_to='Products', validators=[validate_image_extension])
    slug            = models.SlugField(max_length=50, unique=True)
    creator         = models.ForeignKey(Account, on_delete=models.CASCADE)
    category        = models.ForeignKey(Category, on_delete=models.CASCADE)
    likes           = models.IntegerField()
    stock           = models.IntegerField()
    price           = models.DecimalField(max_digits=10, decimal_places=2)
    created_at      = models.DateTimeField(auto_now_add=True)

    def product_image(self):
        return mark_safe(f'<img src="{self.product_img.url}" width="30px" style="border-radius: 50%;" />')

    def generate_link(self):
        return f"domain/{self.category.slug}/{self.slug}"
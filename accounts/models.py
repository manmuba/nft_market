import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.forms import ValidationError
from django.utils.html import mark_safe

# Create your models here.

def validate_image_extension(value):
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    ext = os.path.splitext(value.name)[1]
    if not ext.lower() in allowed_extensions:
        raise ValidationError('Unsupported file extension.')

class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            first_name = first_name,
            last_name = last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, username, email, password):
        
        user = self.create_user(
            email      = self.normalize_email(email),
            username = username,
            password   = password,
            first_name = first_name,
            last_name  = last_name,
        )
        user.is_admin      = True
        user.is_active     = True
        user.is_staff      = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user



class Account(AbstractBaseUser):
    first_name      = models.CharField(max_length=50)
    last_name       = models.CharField(max_length=50)
    username        = models.CharField(max_length=50, unique=True)
    email           = models.EmailField(max_length=100, unique=True)
    image           = models.ImageField(upload_to='UserProfile', blank=True, validators=[validate_image_extension])
    bg_image        = models.ImageField(upload_to='UserBackground', blank=True, validators=[validate_image_extension])
    gender          = models.CharField(max_length=50, blank=True)
    address         = models.CharField(max_length=250, blank=True)
    city            = models.CharField(max_length=150, blank=True)
    country         = models.CharField(max_length=150, blank=True)
    bio             = models.TextField(blank=True)
    phone_number    = models.CharField(max_length=50, blank=True)

    # required
    date_joined     = models.DateTimeField(auto_now_add=True)
    last_login      = models.DateTimeField(auto_now_add=True)
    is_admin        = models.BooleanField(default=False)
    is_staff        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=False)
    is_superadmin   = models.BooleanField(default=False)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = MyAccountManager()

    def img_preview(self): #new
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="30px" style="border-radius: 50%;" />')
        return ''
    

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True
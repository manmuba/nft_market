from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import Account

# Register your models here.

class AccountAdmin(UserAdmin):
    list_display = ('email', 'full_name', 'last_login', 'date_joined', 'is_active', 'img_preview')
    list_display_links = ('email', 'full_name')
    readonly_fields = ('last_login', 'date_joined')
    ordering = ('-date_joined',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Account, AccountAdmin)
admin.site.unregister(Group)
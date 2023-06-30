from django.contrib import admin
from .models import Account
# Register your models here.

class AccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'last_login', 'date_joined', 'is_active', 'img_preview')
    list_display_links = ('email', 'full_name')
    readonly_fields = ('last_login', 'date_joined')
    ordering = ('-date_joined',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Account, AccountAdmin)
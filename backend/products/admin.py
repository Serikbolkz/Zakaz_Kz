from django.contrib import admin
from .models import B2BUser

@admin.register(B2BUser)
class B2BUserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'login', 'email', 'full_name', 'address', 'password', 'verified', 'created_at')
    search_fields = ('login', 'email')


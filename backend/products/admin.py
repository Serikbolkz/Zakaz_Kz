from django.contrib import admin
from .models import B2BUser, Order, OrderItem, Product

@admin.register(B2BUser)
class B2BUserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'login', 'email', 'full_name', 'address', 'password', 'verified', 'created_at')
    search_fields = ('login', 'email')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'order_date', 'total_price', 'product_list', 'created_at')

    def product_list(self, obj):
        return ", ".join([
            f"{item.product.name} (x{item.quantity})"
            for item in obj.orderitem_set.all()
        ])

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(Product)



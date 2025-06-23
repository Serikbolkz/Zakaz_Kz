from rest_framework import serializers
from .models import B2BUser, Order, OrderItem, Product

class B2BUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = B2BUser
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'item_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='orderitem_set', many=True)
    user = serializers.StringRelatedField()  # or user.id / full_name, depending on what you want

    class Meta:
        model = Order
        fields = ['id', 'user', 'order_date', 'total_price', 'created_at', 'items']

class OrderCreateSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    order_date = serializers.DateField()
    cart_items = serializers.ListField(
        child=serializers.DictField()  # expects dicts with id, price, quantity
    )

    def validate_cart_items(self, value):
        if not value:
            raise serializers.ValidationError("Cart is empty.")
        return value
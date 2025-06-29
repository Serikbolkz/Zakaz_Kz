from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class B2BUser(models.Model):
    login = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    password = models.CharField(max_length=128)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.login

    class Meta:
        db_table = 'b2b_users'

class Order(models.Model):
    user = models.ForeignKey(B2BUser, on_delete=models.CASCADE, related_name='orders')
    order_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    # many-to-many through OrderItem
    products = models.ManyToManyField('Product', through='OrderItem', related_name='orders')

    def __str__(self):
        return f"Order #{self.id} by {self.user.login}"

class Product(models.Model):  # Adjust if you already have this
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    item_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} for Order #{self.order.id}"
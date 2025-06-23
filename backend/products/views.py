import datetime
import jwt

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import B2BUser, Order, OrderItem, Product
from .serializers import B2BUserSerializer, OrderSerializer, OrderCreateSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.conf import settings
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def login_view(request):
    login = request.data.get('login')
    password = request.data.get('password')

    if not login or not password:
        return Response({"message": "Введите логин и пароль"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = B2BUser.objects.get(login=login)
    except B2BUser.DoesNotExist:
        return Response({"message": "Неверный логин или пароль"}, status=status.HTTP_401_UNAUTHORIZED)

    if check_password(password, user.password):
        payload = {
            'user_id': user.id,
            'login': user.login,
            'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS)
        }
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

        return Response({
            "message": "Успешный вход",
            "token": token,
            "user": {
                "id": user.id,
                "login": user.login,
                "full_name": user.full_name,
                "email": user.email,
                "phone_number": user.phone_number,
                "address": user.address
            }
        })
    else:
        return Response({"message": "Неверный логин или пароль"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def registration_view(request):
    required_fields = ['full_name', 'login', 'email', 'phone_number', 'address', 'password']
    for field in required_fields:
        if not request.data.get(field):
            return Response({"message": f"Поле {field} обязательно"}, status=status.HTTP_400_BAD_REQUEST)
        
    if B2BUser.objects.filter(login=request.data['login']).exists():
        return Response({"message": "Пользователь с таким логином уже существует"}, status=status.HTTP_400_BAD_REQUEST)
    if B2BUser.objects.filter(email=request.data['email']).exists():
        return Response({"message": "Пользователь с таким email уже существует"}, status=status.HTTP_400_BAD_REQUEST)
    
    request.data['password'] = make_password(request.data['password'])
    serializer = B2BUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Регистрация прошла успешно"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def place_order(request):
    serializer = OrderCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user_id = serializer.validated_data['user_id']
    order_date = serializer.validated_data['order_date']
    cart_items = serializer.validated_data['cart_items']

    user = get_object_or_404(B2BUser, id=user_id)

    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in cart_items)

    # Create Order
    order = Order.objects.create(
        user=user,
        order_date=order_date,
        total_price=total
    )

    # Create OrderItems
    for item in cart_items:
        product = get_object_or_404(Product, id=item['id'])
        quantity = item['quantity']
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            item_price=product.price * quantity
        )

    response_serializer = OrderSerializer(order)
    return Response(response_serializer.data, status=status.HTTP_201_CREATED)
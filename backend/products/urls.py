from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('registration/', views.registration_view),
    path('place_order/', views.place_order, name='place_order'),
]
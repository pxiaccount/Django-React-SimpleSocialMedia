from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.PostListCreate.as_view(), name='PostListCreate'),
    path('api/<int:pk>/', views.PostRetrieveUpdateDestroyAPIView.as_view(), name='PostRetrieveUpdateDestroyAPIView'),
]
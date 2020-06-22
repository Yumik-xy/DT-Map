from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('code/', views.GetCodeView.as_view()),
]
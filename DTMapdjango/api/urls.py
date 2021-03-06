from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('code/', views.GetCodeView.as_view()),
    path('image/', views.ImageView.as_view()),
    path('notify/', views.GetNotify.as_view()),
]

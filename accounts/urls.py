from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('activate/<uidb64>/<token>/', views.activate, name="activate"),
    path('logout/', views.logout, name="logout"),
    path('edit_profile/', views.edit_profile, name='edit_profile'),

    path('forget_password/', views.forget_password, name='forget_password'),
    path('resetpassword_validate/<uidb64>/<token>/', views.resetpassword_validate, name='resetpassword_validate'),
    path('reset_password/', views.reset_password, name='reset_password'),
]

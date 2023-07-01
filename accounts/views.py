from django.shortcuts import render, redirect
from django.contrib import auth

from .models import Account
# Create your views here.

def register(request):
    if request.method == 'POST':
        first_name  = request.POST['first_name']
        last_name   = request.POST['last_name']
        email       = request.POST['email']
        password    = request.POST['password']
        if Account.objects.filter(email=email).count() == 0:
            user = Account.objects.create_user(
                first_name  = first_name,
                last_name   = last_name,
                email       = email,
                username    = email.split('@')[0]
            )
            user.set_password(password)
            user.is_active = True
            user.save()
            auth.login(request, user)
            return redirect('Home')
    return render(request, 'auth/register.html')
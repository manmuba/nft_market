from django.shortcuts import render, redirect
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required

from .models import Account

# Verification email
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
import requests

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
            user.save()

            # USER ACTIVATION
            current_site = get_current_site(request)
            mail_subject = 'Please activate your account'
            message = render_to_string('auth/account_verification.html', {
                'user': user,
                'domain': current_site,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            to_email = email
            send_email = EmailMessage(mail_subject, message, to=[to_email])
            send_email.send()
            messages.success(request, 'Thank you for registering with us. We have sent you a verification email to your email address[manmuba90@gmail.com]. Please verify it.')
            return redirect('/auth/login/?command=verification&email='+email)
    return render(request, 'auth/register.html')

def login(request):
    if request.method == 'POST':
        email       = request.POST['email']
        password    = request.POST['password']
        try:
            user = auth.authenticate(request,email=email, password=password)
            auth.login(request, user)
            return redirect('Home')
        except:
            messages.error(request, 'User not Found')
    return render(request, 'auth/login.html')


@login_required(login_url = 'login')
def logout(request):
    auth.logout(request)
    messages.success(request, 'You are logged out.')
    return redirect('login')

def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = Account._default_manager.get(pk=uid)
    except(TypeError, ValueError, OverflowError, Account.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Congratulations! Your account is activated.')
        return redirect('login')
    else:
        messages.error(request, 'Invalid activation link')
        return redirect('register')
    
def edit_profile(request):
    print(request.user.email)
    if request.method == 'POST':
        try:
            bg_image    = request.FILES['bg_image']
        except:
            bg_image    = None
        try:
            image       = request.FILES['profile_image']
        except:
            image       = None
        try:
            phone_number= request.POST['phone']
            gender      = request.POST['gender']
            address     = request.POST['address']
            city        = request.POST['city']
            bio         = request.POST['bio']
            country     = request.POST['country']
        except:
            phone_number= None
            gender      = None
            address     = None
            city        = None
            bio         = None
            country     = None
        first_name  = request.POST['first_name']
        last_name   = request.POST['last_name']
        email       = request.POST['email']
        user = Account.objects.get(email=request.user.email)
        user.first_name     = first_name
        user.last_name      = last_name
        user.email          = email
        user.phone_number   = phone_number
        user.gender         = gender
        user.address        = address
        user.city           = city
        user.bio            = bio
        user.country        = country
        user.bg_image       = bg_image
        user.image          = image
        user.save()
        try:
            old_password    = request.POST['old_password']
            new_password    = request.POST['new_password']
            confirm_password= request.POST['confirm_password']
        except:
            None
        
    return render(request, 'auth/edit_profile.html')
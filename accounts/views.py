
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from .forms import SignUpForm
# from django.views import RegistrationView


class SignUp(generic.CreateView):
   form_class = SignUpForm
   success_url = reverse_lazy('accounts:login')
   template_name = 'registration/signup.html'
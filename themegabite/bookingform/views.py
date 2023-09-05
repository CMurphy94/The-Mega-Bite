from django.shortcuts import render, redirect
from .forms import ReservationForm
from .models import Reservation
from .util import get_available_slots
from django.core.mail import send_mail

def make_reservation(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            reservation = form.save(commit=False)
            # Checking Availability
            available_slots = get_available_slots(reservation.date, reservation.time)
            if reservation.number_of_people > available_slots:
                error_message = 'Sorry we are full for the selected time and date.'
                return render(request, 'templates/reservation_form.html', {'form': form, 'error_message': error_message})      
            reservation.save()
            return redirect('templates/reservation_success.html')
    else:
        form = ReservationForm()
    return render(request, 'templates/reservation_form.html', {'form': form, 'error_message': None})

def confirm_reservation(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            user_email = form.cleaned_data['email']

            subject = 'Mega Bite Reservation Confirmation'
            message = 'Thank you for making a reservation with The Mega Bite, we look forward to having you.'
            from_email = 'themegabite@gmail.com'

            recipient_list = [user_email]

            send_mail(subject, message, from_email, recipient_list)

    else:
        form = ReservationForm()
    
    return render(request, 'reservation_form.html', {'form': form})

from django.shortcuts import render, redirect
from .forms import ReservationForm
from .models import Reservation

def make_reservation(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            reservation = form.save(commit=False)
            # Checking Availability
            available_slots = get_available_slots(reservation.date, reservation.time)
            if reservation.number_of_people > available_slots:
                error_message = 'Sorry we are full for the selected time and date.'
                return render(request, 'reservation_form.html', {'form': form, 'error_message': error_message})
            reservation.save()
            return redirect('reservation_success')
    else:
        form = ReservationForm()
    return render(request, 'bookingform/reservation_form.html', {'form': form, 'error_message': None})

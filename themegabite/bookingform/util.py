from .models import Reservation

def get_available_slots(date, time):
    max_capacity = 50
    existing_reservations = Reservation.objects.filter(date=date, time=time).count()
    available_slots = max_capacity - existing_reservations
    return available_slots
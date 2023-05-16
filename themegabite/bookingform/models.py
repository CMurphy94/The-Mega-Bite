from django.db import models

class Reservation(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    date = models.DateField()
    time = models.TimeField()
    number_of_people = models.IntegerField()


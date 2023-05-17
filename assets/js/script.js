//Prevents the user from selecting a date further than a month in advance
const dateInput = document.getElementById('date-options');
const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().split('T')[0];

dateInput.setAttribute('max', maxDate);

//Prevents the user from selecting a previous day
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() +1)
const tomorrowISO = tomorrow.toISOString().split('T')[0];
dateInput.setAttribute('min', tomorrowISO);

dateInput.addEventListener('input', function() {
    const selectedDate = new Date(this.value);
    if (selectedDate < today) {
        this.value = today.toISOString().split('T')[0];
    } else if (selectedDate > maxDate) {
        this.value = maxDate;
    }
});

// Form feedback
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email-address').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var numberOfPeople = document.getElementById('number-people').value;

    var formData = new FormData(document.getElementById('booking-form'));
    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var confirmationMessage = 'Your booking has been successful!\n\n';
            confirmationMessage += 'First Name: ' + firstName + '\n';
            confirmationMessage += 'Last Name: ' + lastName + '\n';
            confirmationMessage += 'Email Address: ' + emailAddress + '\n';
            confirmationMessage += 'Phone Number: ' + phoneNumber + '\n';
            confirmationMessage += 'Date: ' + date + '\n';
            confirmationMessage += 'Time: ' + time + '\n';
            confirmationMessage += 'Number of People: ' + numberOfPeople + '\n';

            alert(confirmationMessage);
        } else {
            var errorMessage = 'Sorry, the time and date you have selected is unavailable please try selecting a different time and date.';
            alert(errorMessage);
        }
    })
    .catch(error => {
        console.error(error);
    });
});
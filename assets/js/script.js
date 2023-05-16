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
document.addEventListener('DOMContentLoaded', function () {
    const coworkerForm = document.getElementById('coworker-form');
    const monthSelectForm = document.getElementById('month-select-form');
    const coworkerSelect = document.getElementById('coworker-select');
    const monthSelect = document.getElementById('month-select');

    coworkerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        selectCoworker();
    });

    monthSelectForm.addEventListener('submit', function (event) {
        event.preventDefault();
        selectMonth();
    });

    function selectCoworker() {
        const selectedCoworker = coworkerSelect.value;
        if (selectedCoworker) {
            monthSelectForm.style.display = 'block';
        } else {
            alert('لطفاً یک همکار را انتخاب کنید.');
        }
    }

    function selectMonth() {
        const selectedMonth = monthSelect.value;
        if (selectedMonth) {
            // اینجا می‌توانید کدهای مربوط به نمایش گزارش ماهانه را اضافه کنید
            alert(`گزارش ماه ${selectedMonth} برای همکار ${coworkerSelect.value} نمایش داده می‌شود.`);
        } else {
            alert('لطفاً یک ماه را انتخاب کنید.');
        }
    }
});


// Start watching datepickers
jalaliDatepicker.startWatch();

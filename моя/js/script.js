document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn.toggle-on');
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    // Функция для обновления цвета statusSpan
    function updateStatusColor(statusSpan) {
        if (statusSpan.textContent === "Включен") {
            statusSpan.style.color = '#3fb116'; // Зеленый
        } else if (statusSpan.textContent === "Выключен") {
            statusSpan.style.color = '#d62013'; // Красный
        }
    }

    // Инициализация цвета для всех statusSpan при загрузке
    document.querySelectorAll('.status-status').forEach(statusSpan => {
        updateStatusColor(statusSpan);
    });

    // Обработчик для кнопок включения
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.catamaran-card').querySelector('.rental-form');
            const startTime = form.querySelector('input[type="time"]:nth-of-type(1)').value;
            const endTime = form.querySelector('input[type="time"]:nth-of-type(2)').value;
            const statusMessageDiv = form.nextElementSibling;
            const statusSpan = this.closest('.catamaran-card').querySelector('.status-status');

            // Проверка времени
            if (startTime && endTime) {
                if (startTime < endTime) {
                    statusMessageDiv.textContent = "";
                    statusSpan.textContent = "Включен"; // Изменить статус на "Включен"
                    updateStatusColor(statusSpan); // Обновить цвет
                } else {
                    statusMessageDiv.textContent = "Время окончания должно быть позже времени начала.";
                }
            }
        });
    });

    // Обработчик для кнопок выключения
    const toggleOffButtons = document.querySelectorAll('.toggle-btn.toggle-off');

    toggleOffButtons.forEach(button => {
        button.addEventListener('click', function() {
            const statusSpan = this.closest('.catamaran-card').querySelector('.status-status');
            statusSpan.textContent = "Выключен"; // Изменить статус на "Выключен"
            updateStatusColor(statusSpan); // Обновить цвет
        });
    });

    // Обработчик для бургера
    burger.addEventListener("click", function() {
        nav.classList.toggle("active"); // Переключить класс active
    });
});
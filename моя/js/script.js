document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn.toggle-on');
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    
    // Функция для обновления цвета statusSpan
    function updateStatusColor(statusSpan) {
        if (statusSpan.textContent === "Включен") {
            statusSpan.style.color = '#3fb116'; // Зеленый
        } 
        else{
            statusSpan.style.color = '#d62013'; // Красный
        }
    }

    // Инициализация цвета для всех statusSpan при загрузке
    document.querySelectorAll('.status').forEach(statusSpan => {
        updateStatusColor(statusSpan);
    });

    // Обработчик для бургера
    burger.addEventListener("click", function() {
        nav.classList.toggle("active"); // Переключить класс active
    });

    // Модальное окно для добавления пользователя
    var userModal = document.getElementById("addUserModal");
    var btn = document.getElementById("addUser");
    var closeUserModal = document.getElementById("closeUserModal");

    btn.onclick = function() {
        nav.classList.remove("active"); // Закрываем бургер-меню
        userModal.style.display = "block"; // Открываем модальное окно
    }

    closeUserModal.onclick = function() {
        userModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == userModal) {
            userModal.style.display = "none";
        }
    }

    document.getElementById('addUserForm').onsubmit = function(event) {
        event.preventDefault(); // предотвращаем стандартное поведение формы
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        console.log(`Пользователь добавлен: Логин - ${username}, Пароль - ${password}, Роль - ${role}`);
        userModal.style.display = "none"; // Закрываем модальное окно после добавления
    }

    // Модальное окно для добавления катамарана
    var catamaranModal = document.getElementById("addCatamaranModal");
    var catamaranBtn = document.getElementById("addCatamaran");
    var closeCatamaranModal = document.getElementById("closeCatamaranModal");

    catamaranBtn.onclick = function() {
        nav.classList.remove("active"); // Закрываем бургер-меню
        catamaranModal.style.display = "block"; // Открываем модальное окно
    }

    closeCatamaranModal.onclick = function() {
        catamaranModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == catamaranModal) {
            catamaranModal.style.display = "none";
        }
    }

    // Обработка отправки формы добавления катамарана
    document.getElementById('addCatamaranForm').onsubmit = function(event) {
        event.preventDefault(); // предотвращаем стандартное поведение формы
        const catamaranName = document.getElementById('catamaranName').value;
        const catamaranStatus = document.getElementById('catamaranStatus').value;

        // Создаем новый элемент для отображения нового катамарана
        const newCatamaranCard = document.createElement('div');
        newCatamaranCard.className = 'admin-catamaran-card';
        newCatamaranCard.innerHTML = `<h3>${catamaranName}</h3><p>Статус: <span class="status">${catamaranStatus}</span></p>`;
        document.getElementById('catamaranList').appendChild(newCatamaranCard);

        // Обновляем цвет статуса
        updateStatusColor(newCatamaranCard.querySelector('.status'));

        catamaranModal.style.display = "none"; // Закрываем модальное окно после добавления
    }
});
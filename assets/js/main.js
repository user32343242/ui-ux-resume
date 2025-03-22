document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка полей
        const name = form.elements['name'].value;
        const company = form.elements['company'].value;
        const email = form.elements['email'].value;
        const message = form.elements['message'].value;
        
        if (!name || !email || !message) {
            formMessage.textContent = 'Пожалуйста, заполните все обязательные поля.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Перенаправление на страницу обработчика с параметрами формы
        const url = `form-handler.html?name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;
        
        window.location.href = url;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const jsonData = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        
        try {
            // Вместо прямого вызова GitHub API используем специальную страницу
            const response = await fetch('https://formsubmit.co/your-email@example.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...jsonData,
                    _subject: `Отклик на резюме от ${jsonData.name}`,
                    _captcha: 'false',
                    _template: 'table',
                    _next: window.location.href
                })
            });
            
            if (response.ok) {
                form.reset();
                formMessage.textContent = 'Спасибо! Ваше сообщение отправлено.';
                formMessage.className = 'form-message success';
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            formMessage.textContent = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.';
            formMessage.className = 'form-message error';
            console.error('Error:', error);
        }
    });
});
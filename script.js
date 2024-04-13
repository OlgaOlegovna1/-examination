//функция поиска в header
function search() {
    var searchText = document.getElementById('searchInput').value;
    var pageContent = document.documentElement.innerHTML;

    if (pageContent.includes(searchText)) {
        document.getElementById('searchResult').innerHTML = 'Результат поиска: Текст найден';
    } else {
        document.getElementById('searchResult').innerHTML = 'Результат поиска: Текст не найден';
    }
}

//функция передачи адреса емайл на сервер
//замените "https://example.com/subscribe" на ваш реальный адрес сервера для подписки на рассылку.
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.newslatteer form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращает отправку формы по умолчанию

        const emailInput = document.querySelector('.email-input');
        const email = emailInput.value;

        // Здесь используется fetch API для отправки данных на сервер
        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        }).then(function(response) {
            if (response.ok) {
                alert('Вы успешно подписались на рассылку!');
            } else {
                alert('Что-то пошло не так. Попробуйте позже.');
            }
        }).catch(function(error) {
            console.error('Произошла ошибка:', error);
        });
    });
});
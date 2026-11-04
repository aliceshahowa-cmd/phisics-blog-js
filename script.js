// При загрузке — восстанавливаем тему
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeButton.textContent = '☀ Светлая тема';
}

themeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeButton.textContent = '☀ Светлая тема';
        localStorage.setItem('theme', 'dark');
    } else {
        themeButton.textContent = '🌙 Тёмная тема';
        localStorage.setItem('theme', 'light');
    }
});

// Находим ВСЕ кнопки лайков на странице
const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Находим спан со счетчиком именно внутри этой нажатой кнопки
        const countSpan = button.querySelector('.like-count');
        // Превращаем текст в число и увеличиваем на 1
        let currentLikes = parseInt(countSpan.textContent);
        currentLikes++;
        // Записываем новое значение обратно
        countSpan.textContent = currentLikes;
        // Визуальный эффект: подсветим кнопку при клике
        button.style.backgroundColor = '#e74c3c';
        button.style.color = 'white';
    });
});

const readMoreButtons = document.querySelectorAll('.read-more-btn');

readMoreButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Находим текст, который идет ровно перед этой кнопкой
        const textBlock = btn.previousElementSibling;
        textBlock.classList.toggle('short');

        if (textBlock.classList.contains('short')) {
            btn.textContent = 'Читать далее';
        } else {
            btn.textContent = 'Свернуть';
        }
    });
});

// Имитация базы данных статей
const initialArticles = [
    {
        id: 1,
        title: "Введение в кинематику — 1 урок",
        date: "1 сентября 2026",
        isoDate: "2026-09-01",
        text: "Что изучает кинематика. Механическое движение, тело отсчёта, система координат, материальная точка. Относительность движения. Основные понятия: траектория, путь, перемещение.",
        tags: "#кинематика #9класс"
    },
    {
        id: 2,
        title: "Прямолинейное равномерное движение — 2 урок",
        date: "8 сентября 2026",
        isoDate: "2026-09-08",
        text: "Определение равномерного прямолинейного движения. Скорость, её направление и единицы измерения. Формула скорости и перемещения. Графики скорости и координаты от времени.",
        tags: "#кинематика #9класс"
    },
    {
        id: 3,
        title: "Решение задач по теме «Прямолинейное равномерное движение» — 3 урок",
        date: "15 сентября 2026",
        isoDate: "2026-09-15",
        text: "Практикум: задачи на нахождение скорости, пути и времени. Чтение и построение графиков равномерного движения. Разбор типовых задач ОГЭ.",
        tags: "#кинематика #9класс"
    },
    {
        id: 4,
        title: "Прямолинейное равноускоренное движение — 4 урок",
        date: "22 сентября 2026",
        isoDate: "2026-09-22",
        text: "Ускорение, его физический смысл и единицы измерения. Формулы скорости и перемещения при равноускоренном движении. Графики ускорения и скорости. Свободное падение как пример.",
        tags: "#кинематика #9класс"
    },
    {
        id: 5,
        title: "Решение задач по теме «Прямолинейное равноускоренное движение» — 5 урок",
        date: "29 сентября 2026",
        isoDate: "2026-09-29",
        text: "Практикум: задачи на формулы скорости и перемещения при равноускоренном движении. Чтение графиков. Разбор задач повышенной сложности и подготовка к ОГЭ.",
        tags: "#кинематика #9класс"
    }
];

const postsContainer = document.getElementById('postsContainer');

function renderArticles(articlesArray) {
    // Очищаем контейнер перед каждым рендером, чтобы статьи не дублировались
    postsContainer.innerHTML = '';

    // Если ничего не найдено, выводим сообщение
    if (articlesArray.length === 0) {
        postsContainer.innerHTML = '<p class="no-results">Ничего не найдено</p>';
        return;
    }

    // Проходим циклом по каждому объекту в массиве
    articlesArray.forEach(article => {
        // Создаем HTML-шаблон для карточки статьи
        const articleHtml = `
            <article>
                <header>
                    <h3>${article.title}</h3>
                    <p>Опубликовано: <time datetime="${article.isoDate}">${article.date}</time></p>
                </header>
                <p class="article-text short">${article.text}</p>
                <button class="read-more-btn">Читать далее</button>
                <footer>
                    <p>Теги: ${article.tags}</p>
                    <button class="like-btn">❤ Лайк <span class="like-count">0</span></button>
                </footer>
            </article>
        `;

        // Вставляем сгенерированный HTML внутрь контейнера
        postsContainer.insertAdjacentHTML('beforeend', articleHtml);
    });

    // После рендера заново вешаем обработчики на новые кнопки лайков
    document.querySelectorAll('.like-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            currentLikes++;
            countSpan.textContent = currentLikes;
            button.style.backgroundColor = '#e74c3c';
            button.style.color = 'white';
        });
    });

    // После рендера заново вешаем обработчики на новые кнопки «Читать далее»
    document.querySelectorAll('.read-more-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const textBlock = btn.previousElementSibling;
            textBlock.classList.toggle('short');

            if (textBlock.classList.contains('short')) {
                btn.textContent = 'Читать далее';
            } else {
                btn.textContent = 'Свернуть';
            }
        });
    });
}

// Запускаем первичный рендер при загрузке страницы
renderArticles(initialArticles);

const searchInput = document.getElementById('searchInput');

// Слушаем событие ввода текста в поле поиска
searchInput.addEventListener('input', function(event) {
    // Переводим введённый текст в нижний регистр, чтобы поиск не зависел от регистра
    const searchText = event.target.value.toLowerCase().trim();

    // Фильтруем массив статей
    const filteredArticles = initialArticles.filter(article => {
        // Проверяем заголовок, текст и теги статьи на наличие введённого текста
        const inTitle = article.title.toLowerCase().includes(searchText);
        const inText = article.text.toLowerCase().includes(searchText);
        const inTags = article.tags.toLowerCase().includes(searchText);

        // Если текст найден хотя бы в одном из мест — статья проходит фильтр
        return inTitle || inText || inTags;
    });

    // Перерисовываем страницу с отфильтрованными статьями
    renderArticles(filteredArticles);
});
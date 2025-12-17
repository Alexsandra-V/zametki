const knopka = document.getElementById("knopka");
const menu = document.getElementById("menu_list");
const poisk_2 = document.getElementById("poisk_2");
const poisk_tegov = document.getElementById("poisk_tegov");
const otchut = document.getElementById("otchut");
const overlay = document.getElementById('overlay');
const okno_zakrit = document.getElementById('okno_zakrit');
const okno_Form = document.getElementById('okno_form');
const okno_dlya_texsta = document.getElementById('okno_dlya_texsta');
const vibor_tegov = document.getElementById('vibor_tegov');
const knopka_soxranit = document.getElementById('knopka_soxranit');
let activeTag = 1; // Переменная для активного тега
let editingId = null;

const tags = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Work' },
    { id: 3, title: 'Hobbies' },
    { id: 4, title: 'books' },
    { id: 5, title: 'songs' }
];

function loadNotes() {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : [
        { id: 1, title: 'Сдать отчет', tag: 2, updateAt: new Date().toDateString() },
        { id: 2, title: 'Рецепты', tag: 3, updateAt: new Date().toDateString() },
        { id: 3, title: 'Homework', tag: 2, updateAt: new Date().toDateString() },
        { id: 4, title: 'Dance', tag: 3, updateAt: new Date().toDateString() },
        { id: 5, title: 'Hobbyhorsing', tag: 3, updateAt: new Date().toDateString() }
    ];
}
function saveNotes(notes) {
    localStorage.setItem('data', JSON.stringify(notes));
}

let notes = loadNotes();

// === Поиск по Enter ===
poisk_2.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        render();
    }
});

// === Создание DOM-элементов ===
const createTag = (tag) => {
    const li = document.createElement('li');
    li.className = 'teg';
    li.textContent = tag.title;
    li.addEventListener('click', () => {
        activeTag = tag.id;
        render();
    });
    return li;
};

const createNote = (note) => {
    const div = document.createElement('div');
    div.className = 'zadacha1__vnut';

    const tagTitle = tags.find(t => t.id === note.tag)?.title || '—';

    const titleEl = document.createElement('span');
    titleEl.className = 'zad1';
    titleEl.textContent = note.title;

    const tagEl = document.createElement('span');
    tagEl.className = 'zad2';
    tagEl.textContent = tagTitle;

    const dateEl = document.createElement('span');
    dateEl.className = 'zad3';
    dateEl.textContent = note.updateAt;

    div.append(titleEl, tagEl, dateEl);
    div.addEventListener('click', () => {
        openModal(note);
    });
    return div;
};

// === Фильтрация ===
function getFilteredNotes() {
    const search = poisk_2.value.trim().toLowerCase();
    return notes.filter(note =>
        note.title.toLowerCase().startsWith(search) &&
        (activeTag === 1 || note.tag === activeTag)
    );
}

// === Рендеринг ===
function render() {
    const filtered = getFilteredNotes();

    otchut.innerHTML = ''; // Очищаем контейнер

    if (filtered.length === 0) {
        otchut.innerHTML = '<p>Ничего не найдено</p>';
        return;
    }

    filtered.forEach(note => {
        otchut.appendChild(createNote(note));
    });
}

// === Модальное окно ===
function openModal(note = null) {
    editingId = note?.id || null;


    // Заполняем select
    vibor_tegov.innerHTML = '';
    tags
        .filter(t => t.id !== 1)
        .forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.title;
            vibor_tegov.appendChild(option);
        });


    // Заполняем поля
    okno_dlya_texsta.value = note?.title || '';
    if (note) vibor_tegov.value = note.tag;

    // Удаляем старую кнопку удаления
    const delBtn = document.getElementById('delete-btn');
    if (delBtn) delBtn.remove();

    // Добавляем кнопку "Удалить" только при редактировании
    if (note) {
        const btn = document.createElement('button');
        btn.id = 'delete-btn';
        btn.className = 'okno__btn-delete';
        btn.style.background = 'red';
        btn.textContent = 'Удалить';
        btn.onclick = () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes(notes);
            render();
            closeModal();
        };
        okno_Form.appendChild(btn);
    }

    overlay.classList.add('overlay_open');
}

function closeModal() {
    overlay.classList.remove('overlay_open');
    editingId = null;
    const delBtn = document.getElementById('delete-btn');
    if (delBtn) delBtn.remove();
}

// === Сохранение ===
function onSave(e) {
    e.preventDefault();
    const title = okno_dlya_texsta.value.trim();
    if (!title) return alert('Заголовок не может быть пустым!');

    if (editingId) {
        const note = notes.find(n => n.id === editingId);
        if (note) {
            note.title = title;
            note.tag = +vibor_tegov.value;
            note.updateAt = new Date().toDateString();
        }
    } else {
        const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
        notes.unshift({
            id: newId,
            title,
            tag: +vibor_tegov.value,
            updateAt: new Date().toDateString()
        });
    }

    saveNotes(notes);
    render();
    closeModal();
}

// === Инициализация ===
function init() {
    // Меню тегов
    menu.append(...tags.map(createTag));

    // Обработчики
    poisk_tegov.addEventListener('click', render);
    knopka.addEventListener('click', () => openModal());
    okno_zakrit.addEventListener('click', closeModal);
    knopka_soxranit.addEventListener('click', onSave);

    render();
}


document.addEventListener('DOMContentLoaded', init);





const knopka = document.getElementById("knopka")
const menu = document.getElementById("menu_list")
const otchut = document.getElementById("otchut")
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const menuItems = [
    {
        id: 1,
        title: 'All'
    },
    {
        id: 2,
        title: 'Work'
    },
    {
        id: 3,
        title: 'Hobbies'
    }
]
const zametki = [
    {
        id: 1,
        title: 'Сдать отчет',
        date: '19.02',
        tag: 2,

    },
    {
        id: 2,
        title: 'Рецепты',
        date: '01.01',
        tag: 3,

    },
    {
        id: 3,
        title: 'Homework',
        date: '29.02',
        tag: 2,

    },
    {
        id: 4,
        title: 'Dance',
        date: '05.12',
        tag: 3,

    },
    {
        id: 5,
        title: 'Joke',
        date: '01.04',
        tag: 3,

    },
    {
        id: 6,
        title: 'Hobbyhorsing',
        date: '12.06',
        tag: 3,

    },


]
function createzametka(zametka) {
    const tagName = menuItems.find((i) => i.id === zametka.tag).title
    const element = document.createElement('div')
    element.classList.add('otchutttt__item')
    const elementChildren = `
            <div class="otchut_1"><b>${zametka.title}</b></div>
            <div class="data">${zametka.date}</div>
            <div class="rabota">${tagName}</div>
    `
    element.innerHTML = elementChildren
    return element
}

function renderzametki() {
    otchut.innerHTML = ''
    for (let zametka of zametki) {
        const element = createzametka(zametka)
        otchut.appendChild(element)
    }

}
function createMenuItem(item) {
    const element = document.createElement("div")
    element.classList.add('tegs_li')
    element.innerText = item.title
    return element
}

function init() {
    for (let menuItem of menuItems) {
        const element = createMenuItem(menuItem)
        menu.appendChild(element)
    }
    renderzametki()
}

init()
searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    renderNotes();
});
searchBtn.addEventListener("click", () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    renderNotes();
});
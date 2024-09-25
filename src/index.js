const cardListUI = document.querySelector(".cards")

function createImageElement(card) {
    let image = document.createElement("img")
    image.setAttribute("class", "card--img")
    image.setAttribute("width", 256)
    image.setAttribute("src", card.sprites.other["official-artwork"].front_default)
    image.setAttribute("alt", card.name.charAt(0).toUpperCase() + card.name.slice(1))
    return image
}

function createStatsCardElement(card) {
    let ul = document.createElement("ul")

    for (let index = 0; index < card.stats.length; index++) {
        const element = card.stats[index]
        let li = document.createElement("li")
        li.textContent = `${element.stat.name.toUpperCase()}: ${element.base_stat}`
        ul.appendChild(li)
    }

    return ul
}

function renderACard(card) {
    
    let element = document.createElement("li")
    let h2 = document.createElement("h2")
    const img = createImageElement(card)
    const ul = createStatsCardElement(card)

    const name = card.name.charAt(0).toUpperCase() + card.name.slice(1)

    h2.setAttribute("class", "card--title")
    h2.textContent = name

    element.setAttribute("class", "card")
    element.appendChild(h2)
    element.appendChild(img)
    element.appendChild(ul)


    return element
}

function renderCards() {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const elementUI = renderACard(element)
        
        cardListUI.appendChild(elementUI)
    }
}

renderCards()
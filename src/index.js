const cardListUI = document.querySelector(".cards")
// This dict will store all the images each data entry has
const imageDictionary = {}
// This array of pointers (actually just numbers as indicies) will keep track on what image each card is pointing to right now. So that we can easily switch image in the dicitonary 
let imagePointerDictionary = {}

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

function createAppearancesElement(card) {
    let ul = document.createElement("ul")
    ul.setAttribute("class", "card--appearance")
    let h3 = document.createElement("h3")

    h3.textContent = "Appeared in games:"
    ul.appendChild(h3)

    for (let i = 0; i < card.game_indices.length; i++) {
        const element = card.game_indices[i];
        
        let li = document.createElement("li")
        li.textContent = capitalizeFirstLetter(element.version.name)
        ul.appendChild(li)
        
    }

    return ul
}

function handleSwapImage(card) {
    const cardUI = document.querySelector(`[data-id="${card.name}"]`);

    console.log(imagePointerDictionary[card.name]);
    
    const imgElement = cardUI.querySelector("img");

    imagePointerDictionary[card.name] = (imagePointerDictionary[card.name] + 1) % imageDictionary[card.name].length;

    imgElement.src = imageDictionary[card.name][imagePointerDictionary[card.name]];
}


function renderACard(card) {
    
    let element = document.createElement("li")
    let h2 = document.createElement("h2")
    const img = createImageElement(card)
    const stats = createStatsCardElement(card)
    const appearances = createAppearancesElement(card)

    const name = capitalizeFirstLetter(card.name)

    h2.setAttribute("class", "card--title")
    h2.textContent = name

    element.addEventListener("click", () => {
        handleSwapImage(card)
    })

    element.setAttribute("data-id", card.name)
    element.setAttribute("class", "card")
    element.appendChild(h2)
    element.appendChild(img)
    element.appendChild(stats)
    element.appendChild(appearances)

    return element
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1)
}

function addToImageArrays(card) {
    const imageArray = []

    function findImages(card) {
        Object.values(card).forEach(value => {
            if (typeof value === 'object' && value !== null) {
                findImages(value);
            } if (typeof value === 'string' && value.endsWith('.png')) {
                imageArray.push(value);
                
            }
        });
    }

    findImages(card);
    imagePointerDictionary[card.name] = 0
    imageDictionary[card.name] = imageArray
}

function renderCards() {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const elementUI = renderACard(element)
        addToImageArrays(element)
        
        cardListUI.appendChild(elementUI)
    }
}

renderCards()
console.log(imageDictionary);

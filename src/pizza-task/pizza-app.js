const pizzaInfo = {
    pepperoni: {
        title: 'Пепперони',
        image: 'imgs/peperonni.png'
    },
    margherita: {
        title: 'Маргарита',
        image: 'imgs/margarita.jpg'
    },
    bavarian: {
        title: 'Баварская',
        image: 'imgs/bavarian.jpg'
    }
};

const modal = document.getElementById('pizzaModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

const modalPizzaImage = document.getElementById('modalPizzaImage');
const modalPizzaTitle = document.getElementById('modalPizzaTitle');

const priceEl = document.getElementById('price');
const caloriesEl = document.getElementById('calories');

const sizeButtons = document.querySelectorAll('.size-btn');
const toppingCards = document.querySelectorAll('.topping-card');
const pizzaCards = document.querySelectorAll('.pizza-card');

let currentType = null;
let currentSize = 'small';
let selectedToppings = new Set();
let currentPizza = null;

function rebuildPizza() {
    currentPizza = new Pizza(currentType, currentSize);

    for (const topping of selectedToppings) {
        currentPizza.addTopping(topping);
    }

    updateInfo();
}

function updateInfo() {
    priceEl.textContent = currentPizza.calculatePrice();
    caloriesEl.textContent = currentPizza.calculateCalories();
}

function openModal(type) {
    currentType = type;
    currentSize = 'small';
    selectedToppings = new Set();

    currentPizza = new Pizza(currentType, currentSize);

    modalPizzaTitle.textContent = pizzaInfo[type].title;
    modalPizzaImage.src = pizzaInfo[type].image;
    modalPizzaImage.alt = pizzaInfo[type].title;

    sizeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === 'small');
    });

    toppingCards.forEach(card => {
        card.classList.remove('active');
    });

    updateInfo();
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

pizzaCards.forEach(card => {
    const button = card.querySelector('.open');

    button.addEventListener('click', () => {
        openModal(card.dataset.type);
    });
});

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentSize = btn.dataset.size;
        rebuildPizza();
    });
});

toppingCards.forEach(card => {
    card.addEventListener('click', () => {
        const topping = card.dataset.topping;

        if (selectedToppings.has(topping)) {
            selectedToppings.delete(topping);
            card.classList.remove('active');
        } else {
            selectedToppings.add(topping);
            card.classList.add('active');
        }

        rebuildPizza();
    });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
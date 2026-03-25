class Pizza {
    static #TYPES = {
        margherita: { price: 500, calories: 300 },
        pepperoni: { price: 800, calories: 400 },
        bavarian: { price: 700, calories: 450 }
    }

    static #SIZES = {
        small: { price: 100, calories: 100 },
        large: { price: 200, calories: 200 },
    }

    static #TOPPINGS = {
        'cheese mozzarella': {
            getPrice: (size) => (size === 'small' ? 50 : 100),
            getCalories: 50
        },
        'cheese side': {
            getPrice: (size) => (size === 'small' ? 150 : 300),
            getCalories: 50
        },
        'cheddar and parmesan': {
            getPrice: (size) => (size === 'small' ? 150 : 300),
            getCalories: 50
        }
    }

    constructor(type, size) {
        if (!Pizza.#TYPES[type]) {
            throw new Error(`Неизвестный вид пиццы: ${type}`)
        }
        if (!Pizza.#SIZES[size]) {
            throw new Error(`Неизвестный размер пиццы: ${size}`)
        }
        this.type = type
        this.size = size
        this.toppings = new Set()
    }

    static #checkToppingExists(toppingName) {
        if (!Pizza.#TOPPINGS[toppingName]) {
            throw new Error(`Неизвестная добавка: ${toppingName}. Доступны к выбору: ${Object.keys(Pizza.#TOPPINGS).join(', ')}`);
        }
    }

    addTopping(toppingName) {
        Pizza.#checkToppingExists(toppingName);
        this.toppings.add(toppingName);
    }

    removeTopping(toppingName) {
        Pizza.#checkToppingExists(toppingName);

        if (!this.toppings.has(toppingName)) {
            throw new Error(`Добавка "${toppingName}" не добавлена.`);
        }
        this.toppings.delete(toppingName);
    }

    getToppings() {
        return Array.from(this.toppings)
    }

    getType() {
        return this.type;
    }

    getSize() {
        return this.size;
    }


    calculatePrice() {
        const basePrice =
            Pizza.#TYPES[this.type].price +
            Pizza.#SIZES[this.size].price;
        let toppingsPrice = 0;
        for (let topping of this.toppings) {
            toppingsPrice += Pizza.#TOPPINGS[topping].getPrice(this.size);
        }
        return basePrice + toppingsPrice;
    }

    calculateCalories() {
        const baseCalories =
            Pizza.#TYPES[this.type].calories +
            Pizza.#SIZES[this.size].calories;
        let toppingsCalories = 0;
        for (let topping of this.toppings) {
            toppingsCalories += Pizza.#TOPPINGS[topping].getCalories;
        }
        return baseCalories + toppingsCalories;
    }
}

// Проверка
// const myPizza = new Pizza('pepperoni', 'large');
// console.log('Размер:', myPizza.getSize());
// console.log('Вид пиццы:', myPizza.getType());

// myPizza.addTopping('cheese side');
// console.log('Добавки:', myPizza.getToppings());

// console.log('Цена:', myPizza.calculatePrice());
// console.log('Калории:', myPizza.calculateCalories());

// myPizza.removeTopping('cheese side');
// console.log('Добавки после удаления:', myPizza.getToppings());
// console.log('Новая цена:', myPizza.calculatePrice());
// console.log('Новые калории:', myPizza.calculateCalories());



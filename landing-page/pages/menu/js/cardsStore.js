class CardsStore {
  #cardsCategory = {
    coffee: [],
    tea: [],
    dessert: [],
  };

  #currentCategory = '';

  constructor(category) {
    this.#currentCategory = category;
    this.init = this.#init();
  }

  async #init() {
    try {
      const response = await fetch('../../data/products.json');

      if (!response.ok) {
        return;
      }

      const cardsData = await response.json();

      cardsData.forEach((card) => {
        if (this.#cardsCategory[card.category]) {
          this.#cardsCategory[card.category].push(card);
        }
      });
    } catch (error) {
      console.error("Error loading or processing data:", error);
    }
  }

  get currentCategory() {
    return this.#currentCategory;
  }

  set currentCategory(category) {
    if (category === 'coffee' || category === 'tea' || category === 'dessert') {
      this.#currentCategory = category;
    }
  }

  getCurrentCategoryCards() {
    return this.#cardsCategory[this.#currentCategory];
  }

  getCardData(cardIndex) {
    if (cardIndex >= 0 && cardIndex < this.#cardsCategory[this.#currentCategory].length) {
      return this.#cardsCategory[this.#currentCategory][cardIndex];
    }
  }
}

export const cardsStore = new CardsStore('coffee');
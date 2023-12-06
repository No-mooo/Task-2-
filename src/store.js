/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.basket = [];
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getBasket() {
    return this.basket;
  }

  setBasket(newBasket) {
    this.basket = newBasket;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  deleteBasket(code) {
    this.setBasket(this.basket.filter(item => item.code !== code));
  }

  addBasket(code) {
    const findItem = this.basket.findIndex(item => item.code === code);

    if (findItem === -1) {
      const item = this.getState().list.find(storeItem => storeItem.code === code);
      this.setBasket([...this.basket, {...item, countInBasket: 1}]);

    } else {
      this.setBasket(this.basket.map(item => {
        return item.code == code ? {...item, countInBasket: item.countInBasket + 1} : item;
      }));
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };
}

export default Store;

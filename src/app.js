import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import StatusBasket from './components/status-basket';
import Item from "./components/item";
import Modal from './components/modal';
import ModalBasket from"./components/modal-basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const basket = store.getBasket();
  const totalSumBasket = basket.reduce((sum, next) => sum + next.price * next.countInBasket, 0);

  const callbacks = {
    onGetBasket: useCallback(() => {
      return store.getBasket();
    }, [store]),

    onDeleteItemBasket: useCallback((code) => {
      store.deleteBasket(code);
    }, [store]),

    onAddItemBasket: useCallback(code => {
      store.addBasket(code);
    }, [store]),
  }

  function closeBasketModal() {
    setShowBasketModal(false);
  }

  function openBasketModal() {
    setShowBasketModal(true);
  }

  const [showBasketModal, setShowBasketModal] = useState(false);

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <StatusBasket 
          totalSum={totalSumBasket}
          openModal={openBasketModal}
          basket={callbacks.onGetBasket()}
          delBasketItem={callbacks.onDeleteItemBasket}
        />
        <List
          Item={Item}
          list={list}
          actionItem={callbacks.onAddItemBasket}
        />
      </PageLayout>

      {showBasketModal &&
        <Modal closeModal={closeBasketModal}>
          <ModalBasket
            closeModal={closeBasketModal}
            delBasketItem={callbacks.onDeleteItemBasket}
            totalSumBasket={totalSumBasket}
            basket={basket}
          />
        </Modal>
      }
    </>
  );
}

export default App;

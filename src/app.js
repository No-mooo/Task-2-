import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import StatusBasket from './components/status-basket';
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const [basket, setBasket] = useState([]);

  const callbacks = {
    onGetBasket: useCallback(() => {
      return basket;
    }, [basket]),

    onDeleteItemBasket: useCallback((code) => {
      setBasket(prev => {
        return prev.filter(itemPrev => itemPrev.code !== code);
      });
    }, [basket]),

    onAddItemBasket: useCallback(code => {
      const findItem = basket.findIndex(item => item.code === code);

      if (findItem === -1) {
        const item = store.getState().list.find(storeItem => storeItem.code === code);

        setBasket(prev => {
          return [...prev, {...item, countInBasket: 1}];
        });

      } else {
        setBasket(prev => prev.map(itemPrev => {
          return itemPrev.code == code ? {...itemPrev, countInBasket: itemPrev.countInBasket + 1} : itemPrev;
        }));
      }

    }, [basket]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <StatusBasket 
        basket={callbacks.onGetBasket()}
        delBasketItem={callbacks.onDeleteItemBasket}
      />
      <List
        Item={Item}
        list={list}
        actionItem={callbacks.onAddItemBasket}
      />
    </PageLayout>
  );
}

export default App;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CardStore from '@/store/Card';
import View from './View';
import {
  fetchUserCard,
  removeCardItems,
  addCardItems,
} from './service';

const BasketPage = observer(() => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleCardUpdate = async () => {
    const card = await fetchUserCard();
    CardStore.setCard(card);
  };

  useEffect(async () => {
    setIsFetching(true);
    try {
      handleCardUpdate();
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, []);

  const handleCardAddItem = async (itemId) => {
    await addCardItems([itemId]);
    handleCardUpdate();
  };
  const handleCardRemoveItem = async (itemId) => {
    await removeCardItems([itemId]);
    handleCardUpdate();
  };

  const devices = CardStore.card;

  return (
    <View
      isFetching={isFetching}
      error={error}
      devices={devices}
      onCardAddItem={handleCardAddItem}
      onCardRemoveItem={handleCardRemoveItem}
    />
  );
});

export default BasketPage;

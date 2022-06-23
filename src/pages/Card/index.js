/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CardStore from '@/store/Card';
import { fetchUserCard } from './service';
import View from './View';

const BasketPage = observer(() => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setIsFetching(true);
    try {
      CardStore.setCard(await fetchUserCard());
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, []);

  const devices = CardStore.card;

  return (
    <View
      isFetching={isFetching}
      error={error}
      devices={devices}
    />
  );
});

export default BasketPage;

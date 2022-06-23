import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { check } from '@/pages/Auth/service';
import WithAppLayout from '@/components/AppLayout';
import RouterView from '@/router/RouterView';
import UserStore from '@/store/User';
import Spinner from '@/components/Spinner';
import { fetchUserCard } from './pages/Shop/service';

const App = function App() {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(async () => {
    setIsFetching(true);
    try {
      const card = await fetchUserCard();
      UserStore.setCard(card);
      const user = await check();
      UserStore.setUser(user);
      UserStore.setIsAuth(true);
    } catch (err) {
      // throw error
    }
    setIsFetching(false);
  }, [UserStore]);

  if (isFetching) {
    return (
      <Spinner
        isFetching
        overlay
      />
    );
  }

  return (
    <WithAppLayout>
      <NavBar />
      <RouterView />
    </WithAppLayout>
  );
};

export default App;

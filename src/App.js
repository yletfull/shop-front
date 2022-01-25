import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { Spinner } from 'react-bootstrap';
import { check } from '@/pages/Auth/service';
import WithAppLayout from '@/components/AppLayout';
import RouterView from '@/router/RouterView';
import UserStore from '@/store/User';

const App = function App() {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    check().then((user) => {
      UserStore.setUser(user);
      UserStore.setIsAuth(true);
    }).finally(() => setIsFetching(false));
  }, [UserStore]);

  if (isFetching) {
    return (
      <Spinner
        animation="border"
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

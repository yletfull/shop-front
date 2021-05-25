import React from 'react';
import { useSelector } from 'react-redux';
import WithAuth from '@/components/AppWithAuth';
import WithAppLayout from '@/components/AppLayout';
import { getHeader } from '@/store/ui/selectors';
import RouterView from './router/RouterView';

const App = function App() {
  const header = useSelector(getHeader);

  return (
    <WithAuth>
      <WithAppLayout headerTitle={header}>
        <RouterView />
      </WithAppLayout>
    </WithAuth>
  );
};

export default App;

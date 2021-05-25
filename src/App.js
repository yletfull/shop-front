import React from 'react';
import WithAuth from '@/components/AppWithAuth';
import WithAppLayout from '@/components/AppLayout';
import RouterView from './router/RouterView';

const App = function App() {
  return (
    <WithAuth>
      <WithAppLayout>
        <RouterView />
      </WithAppLayout>
    </WithAuth>
  );
};

export default App;

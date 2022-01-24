import React from 'react';
import NavBar from '@/components/NavBar';
import WithAppLayout from './components/AppLayout';
import RouterView from './router/RouterView';

const App = function App() {
  return (
    <WithAppLayout>
      <NavBar />
      <RouterView />
    </WithAppLayout>
  );
};

export default App;

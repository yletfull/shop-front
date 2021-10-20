import React from 'react';
import WithAppLayout from './components/AppLayout';
import RouterView from './router/RouterView';

const App = function App() {
  return (
    <WithAppLayout>
      <RouterView />
    </WithAppLayout>
  );
};

export default App;

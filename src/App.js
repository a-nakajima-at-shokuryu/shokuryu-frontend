import React from 'react';
import './App.css';
import Providers from './providers'; 
import AdminLayout from './containers/AdminLayout';
import DataView from './views/DataView';
import FormView from './views/FormView';

function App() {
  return (
    <Providers>
      <AdminLayout title="株式会社ショクリュー">
        
        <FormView />
        <DataView />
        
      </AdminLayout>
    </Providers>
  );
}

export default App;

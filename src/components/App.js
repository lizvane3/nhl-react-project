import React  from 'react';
import HeaderComponent from './HeaderComponent';
import DrawerComponent from './DrawerComponent';
import '../App.css';

function App() {
  return (
    <div className='root' >
      <HeaderComponent />
      <DrawerComponent  />
  </div>
  );
}

export default App;

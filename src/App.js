import React from 'react';
import Checkout from './components/checkout';

function App() {
  const cartItems= ["Kone", "Ironhide Cartridge"];

  return (
    <div>
      <Checkout cartItems={cartItems}/>
    </div>
  );
}

export default App;
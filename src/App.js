import React from 'react';
import Checkout from './components/checkout';

function App() {
  const recipient="Diamond";
  const cartItems= ["Kone", "Kone", "Kone", "Kone", "Ironhide Cartridge"];

  return (
    <div>
      <Checkout recipient={recipient} cartItems={cartItems}/>
    </div>
  );
}

export default App;
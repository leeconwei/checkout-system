import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Checkout from './checkout';

afterEach(()=>{
    cleanup();
})

describe('<Checkout/>', ()=> {
    test('should render total amount for Diamond level recipient', ()=> {
        const recipient="Diamond";
        const cartItems= ["Kone", "Kone", "Kone", "Kone", "Ironhide Cartridge"];
        render(<Checkout recipient={recipient} cartItems={cartItems}/>)
        const total = screen.getByText('10779.95');
        expect(total).toBeInTheDocument();
    })
    test('should render total amount for Associates level recipient', ()=> {
        const recipient="Associates";
        const cartItems= ["Kone", "Ironhide Cartridge"];
        render(<Checkout recipient={recipient} cartItems={cartItems}/>)
        const total = screen.getByText('3818.03');
        expect(total).toBeInTheDocument();
    })
    test('should render total amount for Diamond special pricing rules - discount on Kone where 3 or more purchased.The price dropped to RM 2588.99 per unit', ()=> {
        const recipient="Diamond";
        const cartItems= ["Kone", "Kone", "Kone", "Ironhide Cartridge"];
        render(<Checkout recipient={recipient} cartItems={cartItems}/>)
        const total = screen.getByText('8190.96');
        expect(total).toBeInTheDocument();
    })
    test('should render total amount for Diamond special pricing rules - Get a 3 for 2 deal on Ironhide Cartridge', ()=> {
        const recipient="Diamond";
        const cartItems= ["Kone", "Ironhide Cartridge", "Ironhide Cartridge", "Ironhide Cartridge"];
        render(<Checkout recipient={recipient} cartItems={cartItems}/>)
        const total = screen.getByText('3851.17');
        expect(total).toBeInTheDocument();
    })
})

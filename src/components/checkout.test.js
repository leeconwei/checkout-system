import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Checkout from './checkout';

afterEach(()=>{
    cleanup();
})

describe('<Checkout/>', ()=> {
    test('should render total amount for Diamond level recipient',async ()=> {
        const cartItems= ["Kone", "Kone", "Kone", "Kone", "Ironhide Cartridge"];
        render(<Checkout cartItems={cartItems}/>)
        const button = screen.getByTestId('diamond');
        userEvent.click(button);
        const total = screen.getByText('10779.95');
        expect(total).toBeInTheDocument();
    })
    test('should render total amount for Associates level recipient', ()=> {  
        const cartItems= ["Kone", "Ironhide Cartridge"];
        render(<Checkout cartItems={cartItems}/>)
        const button = screen.getByTestId('associate');
        userEvent.click(button);
        const total = screen.getByText('3818.03');
        expect(total).toBeInTheDocument();
    })
    test('should increase quantity of product and render total amount based on requirements', ()=> {
        const cartItems= ["Kone", "Kone", "Ironhide Cartridge"];
        render(<Checkout cartItems={cartItems}/>)
        const levelButton = screen.getByTestId('diamond');
        userEvent.click(levelButton);
        const increaseButton = screen.getByTestId('inc-Kone');
        userEvent.click(increaseButton);
        expect(screen.getByTestId('quantity-Kone')).toHaveTextContent('3');
        const total = screen.getByText('8190.96');
        expect(total).toBeInTheDocument();
    })
    test('should decrease quantity of product and render total amount based on requirements', ()=> {
        const cartItems= ["Kone", "Ironhide Cartridge", "Ironhide Cartridge", "Ironhide Cartridge", "Ironhide Cartridge"];
        render(<Checkout cartItems={cartItems}/>)
        const levelButton = screen.getByTestId('diamond');
        userEvent.click(levelButton);
        const decreaseButton = screen.getByTestId('dec-Ironhide Cartridge');
        userEvent.click(decreaseButton);
        expect(screen.getByTestId('quantity-Ironhide Cartridge')).toHaveTextContent('3');
        const total = screen.getByText('3851.17');
        expect(total).toBeInTheDocument();
    })
})
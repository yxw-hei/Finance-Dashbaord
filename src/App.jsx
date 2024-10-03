import React from 'react'
import './App.css'
import StockInput from './StockInput';
import { StockProvider } from './StockContext';
import StockList from './StockList'


function App() {
  // const [Symbol, setSymbol] = useState("Stock Symbol");
  // const [Quantity, setQuantity] = useState("Quantity");
  // const [PurchasePrice, setPurchasePrice] = useState("Purchase Price");


  return (
    <StockProvider>
      <>
        <h1>Finance Dashboard</h1>
        <StockInput />
        <StockList />
      </>
    </StockProvider>
  );
}



export default App;

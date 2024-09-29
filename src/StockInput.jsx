// import { useContext, useEffect, useState, useCallback } from "react";
// import { StockContext } from "./StockContext";




// function StockInput()  {
//   const [inputSymbol, setInputSymbol] = useState(""); 
//   const [inputQuantity, setInputQuantity] = useState(); 
//   const [inputPurchasePrice, setInputPurchasePrice] = useState(); 
//   const { stockSymbol, quantity, purchasePrice } = useContext(StockContext); 

//   const fetchStockPrice = useCallback(() => {
//     return fetch(
//       `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
//     )
//       .then(response => response.json())  // Convert the response to JSON
//       .then(data => parseFloat(data['Global Quote']['05. price']));  // Extract the latest stock price
//   }, []);

//   useEffect(() => {
//     if (stockList.length > 0) {
//       stockList.map(stock => {
//         fetchStockPrice(stock.symbol)
//           .then(latestPrice => {
//             // Update the stock price in context
//             updateStockPrice(stock.symbol, latestPrice);
//           })
//           .catch(() => {
//             setError(`Failed to fetch price for ${stock.symbol}`);
//           });
//       });
//     }
//   }, [stockList, fetchStockPrice, updateStockPrice]);

//   const stockSymbolRegex = /^[A-Z]+$/;
//   if (!stockSymbol || !stockSymbolRegex.test(stockSymbol)) {
//     setError('Invalid stock symbol. Please enter uppercase letters only.');
//     return;
//   }


//   function handleSubmit(event) {
//     setInputSymbol(event.target.value);
//     setInputQuantity(event.target.value);
//     setInputPurchasePrice(event.target.value);
//   }

// addStock({
//       symbol: stockSymbol.toUpperCase(),
//       purchasePrice: parseFloat(purchasePrice),
//       quantity: parseInt(quantity),
//       latestPrice: null, // Latest price will be fetched after the stock is added
//     });


//   return (
//     <form className="container" onSubmit={handleSubmit}>
//       <div>
//         <input
//           type="text"
//           placeholder="Stock Symbol"
//           value={inputSymbol}
//           onChange= {handleSubmit}
        
//         />
//       </div>
//       <div>
         
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={inputQuantity}
//           onSubmit= {handleSubmit}
          
//         />
//       </div>
//       <div>
         
//         <input
//           type="number"
//           placeholder="Purchase Price"
//           value={inputPurchasePrice}
//           onSubmit= {handleSubmit}       
//         />
//       </div>
//       <button type="submit">Add Stock</button>
//     </form>
//   );
// };




// export default StockInput;


import React, { useContext, useCallback } from 'react';
import { StockContext } from './StockContext';

const StockInput = () => {
  const { addStock, updateStockPrice } = useContext(StockContext);
  const [symbol, setSymbol] = React.useState('');
  const [purchasePrice, setPurchasePrice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  // Memoized fetchStockPrice function using useCallback
  const fetchStockPrice = useCallback(() => {
    if (!symbol) return; // Prevent fetching if symbol is empty
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    fetch(`https://api.example.com/stock/${symbol}/quote?token=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const latestPrice = data.latestPrice;
        updateStockPrice(symbol, latestPrice);
      })
      .catch(error => {
        console.error('Error fetching stock price:', error);
      });
  }, [symbol, updateStockPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol && purchasePrice && quantity) {
      addStock({
        symbol,
        purchasePrice: parseFloat(purchasePrice),
        quantity: parseInt(quantity),
        latestPrice: null,
      });
      fetchStockPrice(); // Call the memoized function
      setSymbol('');
      setPurchasePrice('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default StockInput;

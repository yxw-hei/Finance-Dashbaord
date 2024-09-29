// import { createContext, useState } from 'react';



// export const StockContext = createContext();

// // Create the provider component
// export const StockProvider = ({ children }) => {
//   // State to manage the stock list
//   const [stockList, setStockList] = useState([]);
  
//   const addStock = (stock) => {
//     setStockList((prevStocks) => [...prevStocks, stock]);
//   };

//   const updateStockPrice = (symbol, latestPrice) => {
//     setStockList((prevStocks) =>
//       prevStocks.map(stock =>
//         stock.symbol === symbol ? { ...stock, latestPrice } : stock
//       )
//     );
//   };
//   // Function to add a stock to the list


//   return (
//     <StockContext.Provider value={{ stockList, addStock, updateStockPrice }}>
//       {children}
//     </StockContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';

// Create StockContext to provide and consume stock data
export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockList, setStockList] = useState([]); // Initialize stockList as an empty array

  // Function to add a stock to the list
  const addStock = (stock) => {
    setStockList((prevStocks) => [...prevStocks, stock]);
  };

  // Function to update the latest price of a stock
  const updateStockPrice = (symbol, latestPrice) => {
    setStockList((prevStocks) =>
      prevStocks.map(stock =>
        stock.symbol === symbol ? { ...stock, latestPrice } : stock
      )
    );
  };

  return (
    <StockContext.Provider value={{ stockList, addStock, updateStockPrice }}>
      {children}
    </StockContext.Provider>
  );
};

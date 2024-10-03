import { useContext, useCallback, useState } from 'react';
import { StockContext } from './StockContext';
import './StockStyling.css';

function  StockInput()  {
  const { addStock, updateStockPrice } = useContext(StockContext);
  const [ symbol, setSymbol] = useState('');
  const [ purchasePrice, setPurchasePrice] = useState('');
  const [ quantity, setQuantity] = useState('');
  const [ currentPrice, setLatestPrice] = useState(null);
  

  // Memoized fetchStockPrice function using useCallback
 const fetchStockPrice = useCallback((symbol) => {

     fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=7ROPXJYG0UJWJF2R")
      .then(response => {
        if (!response.ok) {
          alert('Invalid stock symbol'); // Trigger error if symbol is invalid
        }
        return response.json();
      })
      .then(data => {
        const currentPrice = data['Global Quote']['05. price'];
        setLatestPrice(parseFloat(currentPrice));
        updateStockPrice(symbol, currentPrice);
      })

  }, [updateStockPrice]);


  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPurchasePrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  function handleSubmit()  {
    if (symbol && purchasePrice && quantity) {
        fetchStockPrice(symbol);
     //   if (latestPrice) {
          // Add the stock only if we got a valid latest price from the API
          addStock({
            symbol,
            purchasePrice: parseFloat(purchasePrice),
            quantity: parseInt(quantity),
            currentPrice, // Assign the fetched latest price here
          });

          // Clear the input fields after adding the stock
          setSymbol('');
          setPurchasePrice('');
          setQuantity('');
        }
   //   });
      else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={handleSymbolChange}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
        required
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={handlePriceChange}
        required
      />

      <button type="button" onClick={handleSubmit}>Add Stock</button>
    </div>
  );
};

export default StockInput;



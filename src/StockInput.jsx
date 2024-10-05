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

    return fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=7ROPXJYG0UJWJF2R")
      .then(response => response.json())
      .then(data => {
        const priceChk = data?.['Global Quote']?.['05. price'];
        const currentPrice = parseFloat(priceChk);
        if ( !priceChk || isNaN(currentPrice) || currentPrice <= 0) {
          alert('Invalid stock symbol'); // Alert if symbol is invalid 
          return null;
        }
        setLatestPrice(parseFloat(currentPrice));
        updateStockPrice(symbol, currentPrice);
        return currentPrice;
      })
      .catch(error => {
        console.error('Error fetching stock price:', error); // Catch network errors
       });

  }, [updateStockPrice]);


  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  const handlePriceChange = (e) => {
    setPurchasePrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  function handleSubmit(e)  {
    e.preventDefault();
    if (symbol && purchasePrice && quantity) {
       fetchStockPrice(symbol).then((currentPrice) => {
      if (typeof currentPrice === 'number') {
        addStock({
        symbol,
        purchasePrice: parseFloat(purchasePrice),
        quantity: parseInt(quantity),
        currentPrice: currentPrice, // Assign the fetched latest price here
        });
        // Clear the input fields after adding the stock
        setSymbol('');
        setPurchasePrice('');
        setQuantity('');
      
      } else {
        alert('Cannot add stock due to invalid stock price.');
      }
    });
  } else {
    alert('Please fill in all fields before adding stock.');
  }
};

  return (
    
    <form className="container" onSubmit={handleSubmit}>
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

      <button type="submit">Add Stock</button>
    </form>
    
  );
};

export default StockInput;



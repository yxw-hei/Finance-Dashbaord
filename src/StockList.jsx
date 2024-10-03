import { useContext, useEffect } from 'react';
import { StockContext } from './StockContext';
import './StockStyling.css';

function StockList() {
  const { stockList, updateStockPrice } = useContext(StockContext); // Access stockList from context

  // Fetch stock prices whenever stockList changes or on component mount
  useEffect(() => {
    const fetchStockPrices = () => {
      stockList.map(stock => {
        
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stock.symbol + "&apikey=7ROPXJYG0UJWJF2R")
          .then(response => response.json())
          .then(data => {
            const latestPrice = parseFloat(data['Global Quote']['05. price']);
            updateStockPrice(stock.symbol, latestPrice);
          })
          .catch(error => {
            console.error(`Error fetching stock price for ${stock.symbol}:`, error);
          });
      });
    };

    if (stockList.length > 0) {
      fetchStockPrices(); // Only fetch if there are stocks in the list
    }
  }, [stockList, updateStockPrice]); // Trigger effect on mount and when stockList changes

  return (
    <div className='stocklist'>
      <h2>Stock List</h2>
      <ul>
        {stockList.length === 0 && <p>No stocks added yet.</p>}
        {stockList.map((stock) => {
        

          return (
            <li key={stock.symbol}>
              <p>Stock Symbol: {stock.symbol}</p>
              <p>Purchase Price: {stock.purchasePrice}</p>
              <p>Quantity: {stock.quantity}</p>
              <p>Current Price: {stock.latestPrice}</p>
              {stock.latestPrice !== null ? (
                <>
                <p style={{
                          color: stock.latestPrice > stock.purchasePrice ? 'green' : 'red' ,
                        }}>Profit/Loss: {((stock.latestPrice - stock.purchasePrice) * stock.quantity).toFixed(2)}</p>

                </>
              ) : (
                <p>Fetching latest price...</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StockList;


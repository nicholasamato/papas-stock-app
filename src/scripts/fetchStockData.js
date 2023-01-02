import axios from 'axios';

function mapload(objects){
  let map = {} // instantiate an empty map of objects
  let count = 0;
  for (const key in objects){ //load map with objects of date, prices with key of index to allow for iteration
    const childval = objects[key]["5. adjusted close"];
    const open = objects[key]["1. open"];
    map[count] = {
      price: parseFloat(childval),
      date: key,
      openprice: open
    }
    count++;
  }
  return(map);
}
async function fetchStockData(ticker, apikey){
  const response = await axios.get( 
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=${apikey}`
  ); //Fetch stock data from Alpha Vantage API
  
  const objs = response.data["Time Series (Daily)"]; //Get data output from daily time series function
  return(mapload(objs));
}

export default fetchStockData;
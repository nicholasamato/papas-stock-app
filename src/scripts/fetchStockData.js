import axios from 'axios';

function arrayload(objects){
  let arr = [] // instantiate an empty array to build an array of objects
  for (const key in objects){ //load map with objects of date, prices with key of index to allow for iteration
    const childval = objects[key]["5. adjusted close"];
    const open = objects[key]["1. open"];
    
    arr.push({
      price: parseFloat(childval),
      date: key,
      openprice: open
    });
  }
  return(arr);
}
async function fetchStockData(ticker, k){
  const response = await axios.get( 
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=${k}`
  ); //Fetch stock data from Alpha Vantage API
  
  const objs = response.data["Time Series (Daily)"]; //Get data output from daily time series function
  return(arrayload(objs));
}

export default fetchStockData;
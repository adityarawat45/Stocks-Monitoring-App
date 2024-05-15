import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // const[toggle,switchToggle] = useState(false)
  const popularStocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
  const navigate = useNavigate();

  const api_key : string  = "TYOVSY0I47FW282A";
  
  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/bulk", {
        headers: {
          authorization : `Bearer ${token}`,
        },
      });
      setWatchlist(response.data.watchlists);
      console.log(watchlist)
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };
 
  useEffect(()=>{
    fetchSearchData()
  },[keyword])

  const fetchSearchData = async () => {
    try {
      if(keyword.trim() !== "") {
        setSearchResults(popularStocks.filter(stock => stock.toLowerCase().includes(keyword.toLowerCase())));
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setSearchResults([]);
    }
  };

  const fetchStockData = async (symbol: string) => {
    try {
      const response = await axios.get(

        //replace this demo with your api key,becuase sometimes demo doesnt work and sometimes the api key's limit is reached
        //so it depends on you what's working for you atm
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${api_key}`
      );
      const metaData = response.data["Meta Data"];
      const lastRefreshed = metaData["3. Last Refreshed"];
      const timeSeriesData = response.data["Time Series (5min)"];
      const latestData = timeSeriesData[lastRefreshed];

      const stockInfo = { 
        symbol: metaData["2. Symbol"],
        open: latestData["1. open"],
        high: latestData["2. high"],
        low: latestData["3. low"],
        close: latestData["4. close"],
        volume: latestData["5. volume"]
      };
      
      return stockInfo;
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      return null;
    }
  };

  const fetchAllStockData = async (watchlist: string[]) => {
    try {
      const stockDataPromises = watchlist.map(symbol => fetchStockData(symbol));
      const stockData = await Promise.all(stockDataPromises);
      return stockData.filter(data => data !== null);
    } catch (error) {
      console.error("Error fetching stock data for all symbols:", error);
      return [];
    }
  };


const  handlefetchdata = async () => {
  try {
    await fetchWatchlist();
    const fetchedStockData = await fetchAllStockData(watchlist);
    setStockData(fetchedStockData);
  } catch (error) {
    console.error("Error fetching and setting data:", error);
  }
}

const addStock=(symbol : string) =>{
   const token = localStorage.getItem("token");
   setWatchlist([...watchlist,symbol])
   axios.put("http://localhost:3000/watchlist",{
    newWatchlist : watchlist
   }, {
    headers : {
      Authorization : `Bearer ${token}`,
    }
   }).catch(error => console.error(error))
}

const removeStock = (symbol: string) => {
  const token = localStorage.getItem("token");
  setWatchlist(watchlist.filter(item => item !== symbol));
  axios.put("http://localhost:3000/watchlist", {
    newWatchlist: watchlist
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).catch(error => console.error("Error updating watchlist:", error));
};

const SignOut = ()=> {
  localStorage.removeItem("token");
  navigate("/")
}
  return (
    <div className="">
      <nav className="flex flex-row justify-between items-center px-3 py-2 backdrop-blur-lg  bg-slate-600 bg-opacity-20">
        <div className="flex flex-row gap-5 justify-start items-center">
          <img src='src/images/User.png' className="h-8 w-8" alt="user"></img>
           <h5 className="bg-gradient-to-r from-blue-950 to-blue-500 text-transparent bg-clip-text text-2xl font-bold ">Dashboard</h5>
        </div>
        <div  onClick={SignOut} className="bg-gradient-to-r from-blue-950 to-blue-500 px-3 py-2 rounded-md text-white font-semibold">Sign Out</div>
      </nav>
      <div className="flex flex-col justify-center items-center">
      <button className="bg-gradient-to-r from-blue-950 to-slate-900 mx-5 mt-5 rounded-md text-white font-normal p-2" onClick={handlefetchdata}>Tap to fetch latest Watchlist</button>
      <input type="text" placeholder="Search for a stock (symbol)" className="w-3/5 px-3 py-1 my-5 rounded-md outline-1 outline-black border-slate-700 bg-gray-200" value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
        {keyword!== "" && (
          <div className="flex flex-col items-center bg-white p-2 w-1/3 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold">Search Results:</h3>
            <ul className="w-full px-3 py-2">
              {searchResults.map((result, index) => (<div className="flex flex-row py-3 px-2 justify-between border-b border-black ">
                <li key={index} className="py-1 text-base font-bold">{result}</li>
                <button onClick={()=>addStock(result)} className="bg-green-600 text-white font-semibold text-sm rounded-md px-1 py-1">Add</button>
              </div>                
              ))}
            </ul>
          </div>
        )}

      </div>
      {watchlist.length !== 0 && <div className="my-2 ">
         <h3 className="text-zinc-800 text-5xl font-bold mx-5">Your watchlist</h3>
        </div>}
      <div className="flex flex-row mx-auto py-8">   
        {stockData.map((data, index) => (
          <div className="w-1/5 bg-gradient-to-r from-slate-700 to-blue-700 text-white flex flex-col justify-center px-2 py-3 mx-5 rounded-lg">
            <div key={index} className=" text-white flex flex-col justify-center gap-2  mx-5 items-baseline ">
            <h2 className="text-3xl font-semibold">{data.symbol}</h2>
            <p className="font-normal">Open: {data.open}</p>
            <p className="font-normal">High: {data.high}</p>
            <p className="font-normal">Low: {data.low}</p>
            <p className="font-normal">Close: {data.close}</p>
            <p className="font-normal">Volume: {data.volume}</p>
          </div>
          <div className="flex flex-row justify-end items-end">
              <button className="bg-red-500 text-white rounded-md mt-2 px-2 py-1 mr-3" onClick={() => removeStock(data.symbol)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      { watchlist.length === 0 &&
        <div className="flex flex-col justify-center items-center">
        <img src="src/images/empty.png" className="h-1/4 w-1/4"></img>
        <h3 className="text-4xl font-bold text-slate-900">Your watchlist seems to be empty</h3>
      </div>
      }
    </div>
  );
};

export default Dash;


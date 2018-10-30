import React, { useState, useEffect } from 'react';

const fetchData = async () => {
  const data = await fetch('https://api.iextrading.com/1.0/stock/market/crypto').then(res => res.json());

  return data.map(({ symbol, askPrice }) => ({ symbol, askPrice })).filter(coin => coin.askPrice > 50);
};

const useFetchCoins = (timer) => {
  const [cryptos, updateCryptos] = useState([]);
  
  fetchData().then(res => {
    if(!cryptos.length) {
      //when the page load for the first time, we should update the state imediatelly
      updateCryptos(res);
    } else {
      setTimeout(()=>{
        //otherwise update the state with new data after x time
        updateCryptos(res);
      },timer);
    }
  });
  
  return cryptos;
};

export default function App() {
  const [timer, setTimer] = useState(10000);
  const cryptos = useFetchCoins(timer);

  const onChangeTimer = btnClicked => {
    //get the text of the button clicked
    let time = btnClicked.target.textContent;
    //get the number from the text
    time = time.substr(0, time.indexOf('min'));

    setTimer(+(time) * 1000 * 60);
  };

  useEffect(prevState=>{
    console.log(timer)
  }, [timer])

  return (
    <div>
      <ul className="stock-list">
        {cryptos.map(coin => {
          return (
            <li key={coin.symbol}>
              <h3>${coin.symbol}</h3>
              <p>${coin.askPrice}</p>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={e=>onChangeTimer(e)}>1min</button>
        <button onClick={e=>onChangeTimer(e)}>5min</button>
        <button onClick={e=>onChangeTimer(e)}>10min</button>
      </div>
    </div>
  );
}

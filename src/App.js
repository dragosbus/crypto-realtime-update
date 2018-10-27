import React, { Component } from 'react';
import { fetchAndReload$ } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
  }

  componentDidMount() {
    fetchAndReload$.subscribe(data=>{
      this.setState(prevState=>({
        cryptos: prevState.cryptos.concat(data)
      }), ()=>{
        setTimeout(()=>{
          this.setState({cryptos:[]})
        },4500);
      })
    });
  }

  render() {
    return (
      <div>
        <ul className="stock-list">
          {this.state.cryptos.map(coin => {
            return (
              <li key={coin.symbol}>
                <h3>${coin.symbol}</h3>
                <p>${coin.askPrice}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;

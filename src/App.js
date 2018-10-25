import React, { Component } from 'react';
import {fetchData$} from './utils';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
  }

  componentDidMount() {
    fetchData$.subscribe(val=>{
      this.setState(prevState=>({
        cryptos: prevState.cryptos.concat(val)
      }));
    });
  }

  componentDidUpdate() {
    console.log('updated')
  }

  render() {
    return (
      <div>
        <ul className="stock-list">
          {
            this.state.cryptos.map(coin=>{
              return <li>
                <h3>${coin.companyName}</h3>
                <p>${coin.askPrice}</p>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;

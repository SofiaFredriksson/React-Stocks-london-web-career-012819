import React, { Component } from 'react';
import Stock from '../components/Stock'
// import { threadId } from 'worker_threads';


class StockContainer extends Component {
 

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.stocks.map(stock => <Stock handleClick={() => this.props.buyStock(stock.id)} {...stock}/>)
        }
      </div>
    );
  }

}

export default StockContainer;

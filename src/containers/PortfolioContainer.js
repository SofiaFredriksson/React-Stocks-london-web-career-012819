import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.stocks.map((stock, stockIndex) => <Stock handleClick={() => this.props.sellStock(stockIndex)} {...stock}/>)
          }
      </div>
    );
  }

}

export default PortfolioContainer;

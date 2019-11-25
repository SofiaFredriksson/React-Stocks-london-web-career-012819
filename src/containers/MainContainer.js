import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const API = "http://localhost:3000/stocks"

const getStocks = () => fetch(API).then(resp => resp.json())


class MainContainer extends Component {
  state = {
    stocks: [],
    myPortfolio: [],
    options: {
      sort: "Default",
      filter: "All"
    }
  }

  componentDidMount() {
    getStocks()
    .then(stocks => this.setState({stocks}))
  }

  buyStock = (id) => {
    this.setState({
      myPortfolio: [...this.state.myPortfolio, id]
    })
  }

  sellStock = (indx) => {
    this.setState({
      myPortfolio: this.state.myPortfolio.filter((stockId, i) => i !== indx)
    })
  }

  getPortfolioStocks = () => {
   return this.state.myPortfolio.map(id => this.state.stocks.find(stock => stock.id === id))
  } 

  handleSortChange = (sortType) => {
    this.setState({
      options: {
        ...this.state.options,
        sort: sortType
      }
    })
  }

  handleFilterChange = (filterType) => {
    this.setState({
      options: {
        ...this.state.options,
        filter: filterType
      }
    })
  }

  sortStocks = (stocks, sortType) => {
    return sortType === "Default" 
    ? stocks 
    : [...stocks].sort((a, b) => {
      if(sortType === "Alphabetically"){
        return a.name.localeCompare(b.name)
      }
      if(sortType === "Price"){
        return a.price - b.price
      }
    })
  }

  filterStocks = (stocks, filterType) => {
    return filterType === "All"
    ? stocks 
    : [...stocks].filter(stock => stock.type === filterType) 
  }

  getUniqueStockTypes = () => {
    return new Set(this.state.stocks.map(stock => stock.type))
  }

  render() {

    const sortTypes = ["Default", "Alphabetically", "Price"]

    const sortedStocks = this.sortStocks(this.state.stocks, this.state.options.sort)
    
    const filteredStocks = this.filterStocks(sortedStocks, this.state.options.filter)
    return (
      <div>
        <SearchBar handleFilterChange={this.handleFilterChange} filterTypes={["All", ...this.getUniqueStockTypes()]} handleSortChange={this.handleSortChange} chosenSortType={this.state.options.sort} sortTypes={sortTypes}/>

          <div className="row">
            <div className="col-8">

              <StockContainer buyStock={this.buyStock} stocks={filteredStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer sellStock={this.sellStock} stocks={this.getPortfolioStocks()}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

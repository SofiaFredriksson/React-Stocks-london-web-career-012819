import React from 'react';

const SearchBar = ({sortTypes, chosenSortType, handleSortChange,  filterTypes, handleFilterChange}) => {
  return (
    <div>

      <strong>Sort by:</strong>

      {
        sortTypes.map(sortType => 
          <label>
            <input 
            type="radio" 
            value={sortType} 
            checked={chosenSortType === sortType} 
            onChange={(e) => handleSortChange(e.target.value)}/>
            {sortType}
          </label>
        )
      }
      
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => handleFilterChange(e.target.value)}>
          {
            filterTypes.map(type => <option value={type}>{type}</option>)
          }
          
        </select>
      </label>


    </div>
  );
}


export default SearchBar;

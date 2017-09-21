import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div id="search-input">
        <form>
          <div className="ctrl-input">
            <label htmlFor="search-input-input">Questionnaire name</label>
            <div>
              <input
                id="search-input-input"
                type="text"
                placeholder="Search"
                ref={node => {
                  this.inputSearch = node;
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              this.props.search(this.inputSearch.value);
            }}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchInput;

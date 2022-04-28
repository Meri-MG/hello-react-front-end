/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
export const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

export function getGreetingsSuccess(json) {
  return {
    type: GET_GREETINGS_SUCCESS,
    json,
  };
}

function getGreetings() {
  return (dispatch) => {
    dispatch({ type: GET_GREETINGS_REQUEST });

    return fetch('/greetings')
      .then((response) => response.json())
      .then((json) => dispatch(getGreetingsSuccess(json)))
      .catch((error) => console.log(`Fetching Error ${error}`));
  };
}

// eslint-disable-next-line react/prefer-stateless-function
class HelloWorld extends React.Component {
  render() {
    const { greetings } = this.props;
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    return (
      <>
        <div className="container">
          <p>Hey, friend</p>
          <button
            type="button"
            className="getGreetingsbtn"
            onClick={() => this.props.getGreetings()}
          >
            Click me
          </button>
          <br />
          <p>
            {randomGreeting.name}
          </p>
        </div>
      </>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getGreetings };

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);

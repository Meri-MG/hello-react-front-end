import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
export const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

function getGreetings() {
  console.log('getgreetings() Action!');
  return (dispatch) => {
    dispatch({ type: GET_GREETINGS_REQUEST });

    return fetch('/greetings')
      .then((response) => response.json())
      .then((json) => dispatch(getGreetingsSuccess(json)))
      .catch((error) => console.log(`Fetching Error ${error}`));
  };
}

export function getGreetingsSuccess(json) {
  return {
    type: GET_GREETINGS_SUCCESS,
    json,
  };
}
class HelloWorld extends React.Component {
  render() {
    const { greetings } = this.props;
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    return (
      <React.Fragment>
        <div className="container">
          <p>Hey, friend</p>
          <button
            className="getGreetingsbtn"
            onClick={() => this.props.getGreetings()}
          >
            Click me
          </button>
          <br />
          <p>{randomGreeting.name} </p>
        </div>
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getGreetings };

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);

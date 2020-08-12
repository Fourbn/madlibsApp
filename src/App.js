import React, { Component, Fragment } from 'react';
import firebase from './firebase.js';
import parse from 'html-react-parser';
import MadlibForm from './MadlibForm.js';
import Results from './Results.js';
import './styles/styles.scss'


class App extends Component {
  constructor() {
    super()
    this.state = {
      madlibTemplate: [],
      spillOver: '',
      madlib: '',
      madlibCreated: false,
      hideInputs: false,
      alreadySaved: false,
      restart: false,
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref('madlibData/dentist')

    dbRef.on('value', (snapshot) => {
      this.setState({
        madlibTemplate: snapshot.val().story,
        spillOver: snapshot.val().spillOver
      })
    })
  }

  handleErrors = (array) => {
    const failedWords = array.filter((i) => {
      return i === ''
    })
    return failedWords.length === 0
  }

  generateMadlib = (array) => {
    const finishedLib = [...this.state.madlibTemplate].map((i, k) => {
      return i + '<span>' + array[k] + '</span>'
    })
    this.setState({
      madlib: finishedLib.join('')
    })
  }

  handleFormSubmit = (event, userInputs) => {
    event.preventDefault();
    const wordArray = userInputs.map((prompt) => {
      for (const value in prompt) {
        return prompt[value].trim()
      }
      return true
    })

    if (this.handleErrors(wordArray)) {
      this.generateMadlib(wordArray)
      this.setState({
        madlibCreated: !this.state.madlibCreated,
        hideInputs: true
      })
    } else {
      alert('Error')
    }
  }


// =========================================
  handleSave = (madlib) => {
    const dbRef = firebase.database().ref('leaderboard');

    if (this.state.alreadySaved === !true) {
      dbRef.push(madlib);
    }

    this.setState({alreadySaved: true})
  }

  handleRefresh = () => {
    this.setState({
      madlibCreated: false,
      hideInputs: false,
      alreadySaved: false,
    })
  }
// ===============================================

  render() {
    return (
      <Fragment>
        <header className="wrapper" >
          <h1>Madlibs!</h1>
          <p>{
            this.state.madlibCreated ? 
            'Great job! If you like what you\'ve done, Save it to our leaderboard. Or you can Go Back and try again.' 
            : 'The best part about Madlibs is that it\'s always a surprise! Write in the silly words below and Get Started!'
          }</p>
        </header>
        <main className="wrapper" >

          {this.state.hideInputs ? null : 
            <MadlibForm propFormSubmit={ this.handleFormSubmit } />
          }
            
          {this.state.madlibCreated ? 
            <section className="madlibResult" >
              <h2>Here's your Madlib!</h2>
              <p>{parse(this.state.madlib)}</p>
            </section>
          : null}

          <section className="buttonNav">
            {this.state.madlibCreated ? null : 
              <button type="submit" form="madlibPrompts">Get Started!</button>}
            
            {this.state.hideInputs ?
            <Fragment>
              <button onClick={ () => this.handleSave(this.state.madlib) }>
                { this.state.alreadySaved ? 'Saved!' : 'Save Madlib!' }
              </button> 
              <button onClick={ this.handleRefresh } >Back to Start</button>
            </Fragment>
            : null}
          </section>

          {this.state.madlibCreated ? <Results /> : null}
        </main>
        <footer className="wrapper" >
          <p>Created by Philip Turkiewicz 2020</p>
        </footer>
      </Fragment>
    );
  }
}

export default App;

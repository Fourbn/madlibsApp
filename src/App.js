import React, { Component, Fragment } from 'react';
import firebase from './firebase.js'
import Results from './Results.js';
// import Madlib from './Madlib.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      usersWords: {
        noun: '',
        adjective: '',
        adverb: '',
        number: '',
        sentence: '',
        period: ''
      },
      displayMadlib: false,
      hideInputs: false,
      madlibTemplate: ['This is a noun: ', '. This is an adjective: ', '. This is an adverb: ', '. This is a number: ', '. And this is a sentence: ', '.'],
      madlib: '',
      alreadySaved: false,
      restart: false,
    };
  }

  handleChange = (word, event) => {
    const { usersWords } = this.state 
    this.setState({
      usersWords: {
        ...usersWords,
        [word]: event.target.value
      }
    });
  }

  errorCheck = (e) => {
    e.preventDefault();
    const copyOfWords = Object.values(this.state.usersWords)
    const trimmedWords = copyOfWords.map((i) => {
      return i.trim()
    })
    
    const failedWords = trimmedWords.filter((i) => {
      if (i === '') {
        return 'fail'
      }
    })

    if (failedWords.length > 1) {
      alert('Error!')
    } else {
      this.displayMadlib(trimmedWords, e)
    }
  }

  displayMadlib = (wordsArray) => {
    const madlibsArray = [...this.state.madlibTemplate]

    const generateMadlib = madlibsArray.map((i, k) => {
      return (
        i + wordsArray[k]
      )
    })

    const completeMadlib = generateMadlib.join('')
    this.setState({madlib: completeMadlib})

    this.setState({displayMadlib: !this.state.displayMadlib})
    this.setState({hideInputs: true})
  }

  handleSave = (madlib) => {
    const dbRef = firebase.database().ref();

    if (this.state.alreadySaved === !true) {
      dbRef.push(madlib);
    }

    this.setState({alreadySaved: true})
  }

  handleRefresh = () => {
    this.setState({
      displayMadlib: false,
      hideInputs: false,
      alreadySaved: false,
    })
  }

  render() {
    const { noun, adjective, adverb, number, sentence} = this.state.usersWords
    return (
      <Fragment>
        <header>
          <h1>Madlibs!</h1>
          <p>Write in the words you think match the prompts and then click submit.</p>
        </header>
        <main>
          {this.state.hideInputs ? null : 
            <form id="madlibPrompts" onSubmit={(e) => this.errorCheck(e)}>
              <label>
                Noun:
                <input type="text" value={noun} onChange={(e) => this.handleChange('noun', e)} required/>
              </label>

              <label>
                Adjective:
                <input type="text" value={adjective} onChange={(e) => this.handleChange('adjective', e)} required/>  
              </label>

              <label>
                Adverb:
                <input type="text" value={adverb} onChange={(e) => this.handleChange('adverb', e)} required/>
              </label>
              
              <label>
                Number:
                <input type="text" value={number} onChange={(e) => this.handleChange('number', e)} required/>
              </label>
              
              <label>
                Sentence:
                <textarea value={sentence} onChange={(e) => this.handleChange('sentence', e)} required/>
              </label>
            </form>
          }
            
          {this.state.displayMadlib ? 
            <section>
              <h2>Here's your Madlib!</h2>
              <p>{this.state.madlib}</p>
            </section>
          : null}

          <section className="buttonNav">
            {this.state.displayMadlib ? null : 
              <button type="submit" form="madlibPrompts">Click to display the madlib!</button>}
            
            {this.state.hideInputs ? 
            <Fragment>
              <button onClick={() => this.handleSave(this.state.madlib)}>
                {this.state.alreadySaved ? 'Saved!' : 'Save Madlib!'}
              </button> 
              <button onClick={this.handleRefresh} >Back to Start</button>
            </Fragment>
            : null}

          </section>

          {this.state.displayMadlib ? <Results /> : null}
        </main>
      </Fragment>
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import firebase from './firebase.js'
import Results from './Results.js';
import './styles/styles.scss'


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
      madlibCreated: false,
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
        return true
      } else {
        return false
      }
    })

    console.log(failedWords)

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

    this.setState({madlibCreated: !this.state.madlibCreated})
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
      madlibCreated: false,
      hideInputs: false,
      alreadySaved: false,
    })
  }

  render() {
    const { noun, adjective, adverb, number, sentence} = this.state.usersWords
    return (
      <Fragment>
        <header className="wrapper" >
          <h1>Madlibs!</h1>
          <p>{
            this.state.madlibCreated ? 
            'Great job! Now you can save your work and see what other people think of your funny writing.' 
            : 'Write in the words you think match the prompts and then click submit.'
          }</p>
        </header>
        <main className="wrapper" >
          {this.state.hideInputs ? null : 
            <form id="madlibPrompts" className="madlibPrompts" onSubmit={(e) => this.errorCheck(e)}>
              <label id="input1" className="input1">Noun:</label>
              <input type="text" htmlFor="input1" value={noun} onChange={(e) => this.handleChange('noun', e)} required/>

              <label id="input2" className="input2">Adjective:</label>
              <input type="text" htmlFor="input2" value={adjective} onChange={(e) => this.handleChange('adjective', e)} required/>  

              <label id="input3" className="input3">Adverb:</label>
              <input type="text" htmlFor="input3" value={adverb} onChange={(e) => this.handleChange('adverb', e)} required/>
              
              <label id="input4" className="input4">Number:</label>
              <input type="text" htmlFor="input4" value={number} onChange={(e) => this.handleChange('number', e)} required/>
              
              <label id="input5" className="input5">Sentence:</label>
              <textarea htmlFor="input5" value={sentence} onChange={(e) => this.handleChange('sentence', e)} required/>
            </form>
          }
            
          {this.state.madlibCreated ? 
            <section className="madlibResult" >
              <h2>Here's your Madlib!</h2>
              <p>{this.state.madlib}</p>
            </section>
          : null}

          <section className="buttonNav">
            {this.state.madlibCreated ? null : 
              <button type="submit" form="madlibPrompts">Click to display the madlib!</button>}
            
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

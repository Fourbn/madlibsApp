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
      // Database information
      dbPath: 'dentist',
      title: '',
      madlibTemplate: [],
      spillOver: '',
      madlib: '',
      userName: '',
      // Ternary toggles
      madlibCreated: false,
      hideInputs: false,
      alreadySaved: false,
      restart: false,
      slideIn: false
    };
  }

  // Initial database call once render has completed
  componentDidMount() {
    const dbRef = firebase.database().ref( 'madlibData/' + this.state.dbPath )

    dbRef.on('value', ( snapshot ) => {
      this.setState({
        title: snapshot.val().title,
        madlibTemplate: snapshot.val().story,
        spillOver: snapshot.val().spillOver
      })
    })
  }

  //If the user switches madlibs, React calls this lifecycle method and updates state
  componentDidUpdate( prevProps, prevState ) {
    if ( prevState.dbPath !== this.state.dbPath ) {
      const dbRef = firebase.database().ref( 'madlibData/' + this.state.dbPath )
  
      dbRef.on('value', ( snapshot ) => {
        this.setState({
          title: snapshot.val().title,
          madlibTemplate: snapshot.val().story,
          spillOver: snapshot.val().spillOver
        })
      })
    }

  }

  handleUserName = ( event ) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleErrors = ( array ) => {
    const failedWords = array.filter(( i ) => {
      return i === ''
    })
    return failedWords.length === 0
  }

  generateMadlib = ( inputArray, classNames ) => {
    const finishedLib = [...this.state.madlibTemplate].map(( userWord, index ) => {
      // return i + '<span>' + array[k] + '</span>'
      return `${userWord} <span class="${classNames[index]}">${inputArray[index]}</span>`
    })

    if ( this.state.spillOver !== 0 ) {
      finishedLib.push( this.state.spillOver )
    }

    this.setState({
      madlib: finishedLib.join('')
    })
  }

  
  // BUTTON EVENT HANDLERS
  // =========================================
  handleFormSubmit = ( event, userInputs ) => {
    event.preventDefault();
    const wordArray = userInputs.map(( prompt ) => {
      for ( const value in prompt ) {
        return prompt[value].trim()
      }
      return true
    })

    const classNames = userInputs.map(( name ) => {
      for (const object in name) {
        return object.replace(/[0-9]/g, '')
      }
      return true
    })

    console.log(classNames)

    if ( this.state.userName === '' ) {
      this.setState({
        userName: 'Anonymous'
      })
    }

    if ( this.handleErrors( wordArray ) ) {
      this.generateMadlib( wordArray, classNames )
      this.setState({
        madlibCreated: !this.state.madlibCreated,
        hideInputs: true
      })
    } else {
      alert('Oops! It looks like you missed a word. Make sure each prompt has a word buddy.')
    }
  }


  handleSave = ( madlib, event ) => {
    const dbRef = firebase.database().ref( 'leaderboard' );
    const dbObject = {
      madlib: madlib,
      title: this.state.title,
      user: this.state.userName,
      likes: 0
    }
    if ( this.state.alreadySaved === !true ) {
      dbRef.push( dbObject );
    }
    this.setState( {alreadySaved: true} )
    event.target.disabled = true
  }


  handleRefresh = () => {
    this.setState({
      madlibCreated: false,
      hideInputs: false,
      alreadySaved: false,
    })
  }


  switchMadlib = ( event ) => {
    const confirmed = window.confirm('If you switch Madlibs, you\'ll lose all your words! Are you sure?')
    if ( confirmed ) {
      this.setState({
        dbPath: event.target.value,
      })
      document.getElementById('input0').focus();
    }
  }

  slideMenu = () => {
    this.setState({
      slideIn: !this.state.slideIn
    })
  }
// ===============================================

focusOnNav = () => {
  this.setState({
    slideIn: true
  })
}

focusOffNav = () => {
  this.setState({
    slideIn: false
  })
}

  render() {
    return (
      <Fragment>
        <header className="wrapper" >
          <h1>{ this.state.title }</h1>
          <div className="userName">
            <label 
              htmlFor="userName" 
              aria-label="Enter your pen name here" >
                by
            </label>
            <input 
              onChange={ this.handleUserName } 
              onFocus={ this.focusOffNav }
              type="text" id="userName" 
              placeholder="YOUR NAME HERE" 
              value={ this.state.userName } 
              required />
          </div>
          <p>
            {
              this.state.madlibCreated 
              ? 'Great job! If you like what you\'ve done, Save it to our leaderboard. Or you can Go Back and try again.' 
              : 'The best part about Madlibs is that it\'s always a surprise! Write in the silly words below and Get Started!'
            }
          </p>
          <div onClick={ this.slideMenu } 
            className={"madlibChoices" + 
            (this.state.hideInputs ? ' hidden' : '') + 
            (this.state.slideIn ? ' slideIn' : '')}>
              
              <button 
                onClick={( event ) => this.switchMadlib( event )} 
                onFocus={ this.focusOnNav }
                value="dentist" 
                aria-label="Click here to choose the Dentist Madlib" >
                  A Visit to the Dentist
              </button>
              
              <button 
                onClick={( event ) => this.switchMadlib( event )} 
                onFocus={ this.focusOnNav }
                value="pirate" 
                aria-label="Click here to choose the Pirate Madlib" >
                  Talk like a Pirate!
              </button>
          </div>
        </header>
        <main className="wrapper" >

          {this.state.hideInputs ? null : 
            <MadlibForm 
              propFormSubmit={ this.handleFormSubmit } 
              propPathing={ this.state.dbPath }
              propFocusOff={ this.focusOffNav } />
          }
            
          {this.state.madlibCreated ? 
            <section className="madlibResult" >
              <h2>Here's your Madlib!</h2>
              <p>{ parse( this.state.madlib ) }</p>
            </section>
          : null}

          <section className="buttonNav">
            {this.state.madlibCreated ? null : 
              <button type="submit" 
              form="madlibPrompts" 
              aria-label="This button will create your Madlib" >
                Get Started!
              </button>}
            
            {this.state.hideInputs ?
            <Fragment>
              <button 
                className="saveButton" 
                onClick={ ( event ) => this.handleSave( this.state.madlib, event ) }>
                  { this.state.alreadySaved ? 'Saved!' : 'Save Madlib!' }
              </button> 
              <button 
                onClick={ this.handleRefresh } 
                title="This will reset your words" 
                aria-label="This will also reset your words" >
                  Back to Start
              </button>
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

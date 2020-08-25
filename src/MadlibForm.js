import React, { Component, Fragment } from 'react';
import firebase from './firebase.js';

class MadlibForm extends Component {
   constructor() {
      super()
      this.state = {
         prompts: [],
         usersWords: []
      }
   }

   componentDidMount() {
      const dbRef = firebase.database().ref( 'madlibData' )
      dbRef.on('value', snapshot => {
         const userInputs = snapshot.val()[this.props.propPathing].userInputs
         const values = userInputs.map(prompt => {
            const valueObj = {
               [prompt.value]: ''
            }
            return valueObj
         })
         this.setState({
            prompts: userInputs,
            usersWords: values
         })
      })
   }

   //Same as App.js, lifecycle method is called when the user switches madlib templates
   componentDidUpdate( prevProps ) {
      if ( prevProps.propPathing !== this.props.propPathing ) {
         this.setState({
            usersWords: []
         })
         const dbRef = firebase.database().ref( 'madlibData' )
         dbRef.on('value', snapshot => {
            const userInputs = snapshot.val()[this.props.propPathing].userInputs
            const values = userInputs.map(prompt => {
               const valueObj = {
                  [prompt.value]: ''
               }
               return valueObj
            })
            this.setState({
               prompts: userInputs,
               usersWords: values
            })
         })
      }
   }

   handleChange = ( index, event ) => {
      const wordsCopy = [...this.state.usersWords]
      wordsCopy[index][event.target.name] = event.target.value

      this.setState({
         usersWords: wordsCopy
      })
   }

   render() {
      return(
         <form 
            id="madlibPrompts" 
            className="madlibPrompts" 
            onSubmit={( event ) => this.props.propFormSubmit( event, this.state.usersWords )} >
               <div className="formContainer">
               {this.state.prompts.map(( prompt, index ) => {
                  return (
                     <Fragment key={index}>
                        <label 
                           htmlFor={'input' + index}>
                              {prompt.name}
                        </label>
                        <input 
                           type="text" 
                           id={'input' + index} 
                           name={prompt.value} 
                           value={this.state.usersWords[index][prompt.value]} 
                           onChange={( event ) => this.handleChange( index, event )}
                           onFocus={() => this.props.propFocusOff()} 
                           required />
                     </Fragment>
                  )
               })}
               </div>
         </form>
      )
   }
}

export default MadlibForm;
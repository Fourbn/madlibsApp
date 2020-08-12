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
      const dbRef = firebase.database().ref('madlibData')

      dbRef.on('value', snapshot => {
         const userInputs = snapshot.val().dentist.userInputs
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

   handleChange = (index, event) => {
      const wordsCopy = [...this.state.usersWords]

      wordsCopy[index][event.target.name] = event.target.value

      this.setState({
         usersWords: wordsCopy
      })
   }

   render() {
      return(
         <form id="madlibPrompts" className="madlibPrompts" onSubmit={(event) => this.props.propFormSubmit(event, this.state.usersWords)} >
            {this.state.prompts.map((prompt, index) => {
               return (
                  <Fragment key={index}>
                     <label id={'input' + index} className={'input' + index} >{prompt.name}</label>
                     <input type="text" htmlFor={'input' + index} name={prompt.value} value={this.state.usersWords[prompt.value]} onChange={(e) => this.handleChange(index, e)} required />
                  </Fragment>
               )
            })}
            <button>Submit me!</button>
         </form>
      )
   }
}

export default MadlibForm;
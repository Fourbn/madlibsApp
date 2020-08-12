import React, { Component, Fragment } from 'react';
import firebase from './firebase.js';

class MadlibForm extends Component {
   constructor() {
      super()
      this.state = {
         prompts: [],
      }
   }

   componentDidMount() {
      const dbRef = firebase.database().ref('madlibData')

      dbRef.on('value', snapshot => {
         const userInputs = snapshot.val().dentist.userInputs
         // const values = userInputs.map(prompt => {
         //    return prompt.value
         // })
         userInputs.forEach((prompt) => {
            this.setState({
               [prompt.value]: ''
            })
         })

         this.setState({
            prompts: userInputs,
         })

         console.log(this.state)
      })
   }

   handleChange = (word, event) => {
      
      this.setState({
         [word]: event.target.value
      });
      // console.log(this.state.usersWords[index])
   }

   render() {
      return(
         <form id="madlibPrompts" className="madlibPrompts" >
            {this.state.prompts.map((prompt, index) => {
               return (
                  <Fragment key={index}>
                     <label id={'input' + index} className={'input' + index} >{prompt.name}</label>
                     <input type="text" htmlFor={'input' + index} value={this.state[prompt.value][prompt.value]} onChange={(e) => this.handleChange(prompt.value, e)} required />
                  </Fragment>
               )
            })}
         </form>
      )
   }
}

export default MadlibForm;
import React, { Component } from 'react';
import firebase from './firebase.js'

class Results extends Component {
   constructor() {
      super()
      this.state = {
         leaderboard: []
      }
   }

   componentDidMount() {
      const dbRef = firebase.database().ref('leaderboard');

      dbRef.on('value', (snapshot) => {
         const data = snapshot.val();

         const updateLeaderboard = [];

         for (let userMadlib in data) {
            const madlibObject = {
               id: userMadlib,
               madlib: data[userMadlib]
            }

            updateLeaderboard.push( madlibObject )
         }

         this.setState({
            leaderboard: updateLeaderboard
         })
      })
   }

   render() {
      return(
         <ul className="leaderboard" >
            <h2>Leaderboard</h2>
            {
               this.state.leaderboard.map( ( madlibObject ) => {
                  return (
                  <li key={ madlibObject.id }>
                     <h3>Madlib by User</h3>
                     <p>{madlibObject.madlib}</p>
                  </li>
                  )
               })
            }
         </ul>
      )
   }
}

export default Results;
import React, { Component } from 'react';
import firebase from './firebase.js'
import parse from 'html-react-parser';

class Results extends Component {
   //I got this fix from StackOverflow (https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component) but I'm only partially sure as to how exactly it is working.
   //I was getting this warning message: Warning: Can't perform a React state update on an unmounted component.
   //This error was popping up when I had already submitted the user inputs, I was on the results page and I clicked to save my madlib to the database. I believe the issue is that I'm saving the leaderboard state inside this component and there's a problem with the lifecycle methods running that setState over and over again
   //So the fix is to ask react to validate the _isMounted before running setState and then reset that again. I'm not entirely sure on the syntax or the specifics as to why, but I didn't want to take up helpcue time with a problem that is technically already solved.
   _isMounted = false;

   constructor() {
      super()
      this.state = {
         leaderboard: []
      }
   }

   componentDidMount() {
      this._isMounted = true;

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

   componentWillUnmount() {
      this._isMounted = false;
   }

   render() {
      return(
         <section className="leaderboard">
            <h2>Leaderboard</h2>
            <ul className="leaderboardGrid" >
               {
                  this.state.leaderboard.map( ( madlibObject ) => {
                     return (
                     <li key={ madlibObject.id }>
                        <h3>Madlib by User</h3>
                        <p>{parse(madlibObject.madlib)}</p>
                     </li>
                     )
                  })
               }
            </ul>
         </section>
      )
   }
}

export default Results;
import React, { Component } from 'react';
import firebase from './firebase.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons' 
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
         leaderboard: [],
         toggleLiked: false
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

   handleLike = (event) => {
      const likeId = event.target.dataset.id
      const dbRef = firebase.database().ref('leaderboard')
      const likedMadlib = [...this.state.leaderboard].filter((madlib) => {
         return madlib.id === likeId
      })

      console.log(likedMadlib[0])

      //Catches if the like button returns an undefined value and ensure that React doesn't break. The button just doesn't respond and the user can click again
      if (likedMadlib && likedMadlib[0]) {
         //Checks to see if the user has already clicked the button and submitted a like. If so, it will disable the button before they can submit another one.
         let click = 0
         click++
         if (click > 0) {
            const thisButton = document.getElementById(likeId)
            thisButton.disabled = true
         }

         likedMadlib[0].madlib.likes++
         dbRef.child(likeId).update(likedMadlib[0].madlib);
      } 

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
                     <li key={ madlibObject.id } >
                        <div className="header">
                           <h3>{madlibObject.madlib.title} by {madlibObject.madlib.user}</h3>
                           <button id={madlibObject.id} data-id={madlibObject.id} onClick={this.handleLike} >
                              <FontAwesomeIcon data-id={madlibObject.id} icon={faThumbsUp} /> {madlibObject.madlib.likes}
                           </button>
                        </div>
                        <p>{parse(madlibObject.madlib.madlib)}</p>
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
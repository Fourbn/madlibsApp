(this["webpackJsonpproject-five"]=this["webpackJsonpproject-five"]||[]).push([[0],{26:function(e,t,a){e.exports=a(49)},31:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(23),l=a.n(i),s=(a(31),a(4)),o=a(2),u=a(3),d=a(6),c=a(5),m=a(12),h=a.n(m);a(32);h.a.initializeApp({apiKey:"AIzaSyCbCf_NllK9ML_D04soZXCQ9U7EoE1ZQaY",authDomain:"madlibs-app.firebaseapp.com",databaseURL:"https://madlibs-app.firebaseio.com",projectId:"madlibs-app",storageBucket:"madlibs-app.appspot.com",messagingSenderId:"1077558462525",appId:"1:1077558462525:web:fa7882737ab0b920e5c254"});var p=h.a,b=a(9),v=a.n(b),f=a(13),E=function(e){Object(d.a)(a,e);var t=Object(c.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).handleChange=function(t,a){var n=Object(s.a)(e.state.usersWords);n[t][a.target.name]=a.target.value,e.setState({usersWords:n})},e.state={prompts:[],usersWords:[]},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;p.database().ref("madlibData").on("value",(function(t){var a=t.val()[e.props.propPathing].userInputs,n=a.map((function(e){return Object(f.a)({},e.value,"")}));e.setState({prompts:a,usersWords:n})}))}},{key:"componentDidUpdate",value:function(e){var t=this;e.propPathing!==this.props.propPathing&&(this.setState({usersWords:[]}),p.database().ref("madlibData").on("value",(function(e){var a=e.val()[t.props.propPathing].userInputs,n=a.map((function(e){return Object(f.a)({},e.value,"")}));t.setState({prompts:a,usersWords:n})})))}},{key:"render",value:function(){var e=this;return r.a.createElement("form",{id:"madlibPrompts",className:"madlibPrompts",onSubmit:function(t){return e.props.propFormSubmit(t,e.state.usersWords)}},r.a.createElement("div",{className:"formContainer"},this.state.prompts.map((function(t,a){return r.a.createElement(n.Fragment,{key:a},r.a.createElement("label",{htmlFor:"input"+a},t.name),r.a.createElement("input",{type:"text",id:"input"+a,name:t.value,value:e.state.usersWords[a][t.value],onChange:function(t){return e.handleChange(a,t)},onFocus:function(){return e.props.propFocusOff()},required:!0}))}))))}}]),a}(n.Component),y=a(24),k=a(25),S=function(e){Object(d.a)(a,e);var t=Object(c.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this))._isMounted=!1,e.handleLike=function(t){var a=t.target.dataset.id,n=p.database().ref("leaderboard"),r=Object(s.a)(e.state.leaderboard).filter((function(e){return e.id===a}));if(r&&r[0]){document.getElementById(a).disabled=!0,r[0].madlib.likes++,n.child(a).update(r[0].madlib)}},e.state={leaderboard:[]},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,p.database().ref("leaderboard").on("value",(function(t){var a=t.val(),n=[];for(var r in a){var i={id:r,madlib:a[r]};n.push(i)}e.setState({leaderboard:n})}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this;return r.a.createElement("section",{className:"leaderboard"},r.a.createElement("h2",null,"Leaderboard"),r.a.createElement("ul",{className:"leaderboardGrid"},this.state.leaderboard.map((function(t){return r.a.createElement("li",{key:t.id},r.a.createElement("div",{className:"header"},r.a.createElement("h3",null,t.madlib.title," by ",t.madlib.user),r.a.createElement("button",{id:t.id,"data-id":t.id,onClick:e.handleLike,"aria-label":"Click this button to like this Madlib"},r.a.createElement(y.a,{"data-id":t.id,icon:k.a})," ",t.madlib.likes)),r.a.createElement("p",null,v()(t.madlib.madlib)))}))))}}]),a}(n.Component),g=(a(48),a(15)),O=a.n(g),N=function(e){Object(d.a)(a,e);var t=Object(c.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).handleUserName=function(t){e.setState({userName:t.target.value})},e.handleErrors=function(e){var t=[];return e.forEach((function(e,a){""===e&&t.push(a)})),console.log(t),t},e.generateMadlib=function(t,a){var n=Object(s.a)(e.state.madlibTemplate).map((function(e,n){return"".concat(e,' <span class="').concat(a[n],'">').concat(t[n],"</span>")}));0!==e.state.spillOver&&n.push(e.state.spillOver),e.setState({madlib:n.join("")})},e.handleFormSubmit=function(t,a){t.preventDefault();var n=a.map((function(e){for(var t in e)return e[t].trim();return!0})),r=a.map((function(e){for(var t in e)return t.replace(/[0-9]/g,"");return!0}));""===e.state.userName&&e.setState({userName:"Anonymous"}),0===e.handleErrors(n).length?(e.generateMadlib(n,r),e.setState({madlibCreated:!e.state.madlibCreated,hideInputs:!0})):O()({title:"Oops!",text:"Looks like you missed a word.",icon:"error"}).then((function(){document.getElementById("input".concat(e.handleErrors(n)[0])).focus()}))},e.handleSave=function(t,a){var n=p.database().ref("leaderboard"),r={madlib:t,title:e.state.title,user:e.state.userName,likes:0};!1===e.state.alreadySaved&&n.push(r),e.setState({alreadySaved:!0}),a.target.disabled=!0},e.handleRefresh=function(){e.setState({madlibCreated:!1,hideInputs:!1,alreadySaved:!1})},e.switchMadlib=function(t){var a=t.target.value;a!==e.state.dbPath&&O()({title:"Are you sure?",text:"If you change your Madlib, you will lose any words you have already typed out",buttons:["Nevermind","That's fine"],dangerMode:!0}).then((function(t){t&&e.setState({dbPath:a})})),document.getElementById("input0").focus()},e.slideMenu=function(){e.setState({slideIn:!e.state.slideIn})},e.focusOnNav=function(){e.setState({slideIn:!0})},e.focusOffNav=function(){e.setState({slideIn:!1})},e.state={dbPath:"dentist",title:"",madlibTemplate:[],spillOver:"",madlib:"",userName:"",madlibCreated:!1,hideInputs:!1,alreadySaved:!1,restart:!1,slideIn:!1},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;p.database().ref("madlibData/"+this.state.dbPath).on("value",(function(t){e.setState({title:t.val().title,madlibTemplate:t.val().story,spillOver:t.val().spillOver})}))}},{key:"componentDidUpdate",value:function(e,t){var a=this;t.dbPath!==this.state.dbPath&&p.database().ref("madlibData/"+this.state.dbPath).on("value",(function(e){a.setState({title:e.val().title,madlibTemplate:e.val().story,spillOver:e.val().spillOver})}))}},{key:"render",value:function(){var e=this;return r.a.createElement(n.Fragment,null,r.a.createElement("header",{className:"wrapper"},r.a.createElement("h1",null,this.state.title),r.a.createElement("div",{className:"userName"},r.a.createElement("label",{htmlFor:"userName","aria-label":"Enter your pen name here"},"by"),r.a.createElement("input",{onChange:this.handleUserName,onFocus:this.focusOffNav,type:"text",id:"userName",placeholder:"YOUR NAME HERE",value:this.state.userName,required:!0})),r.a.createElement("p",null,this.state.madlibCreated?"Great job! If you like what you've done, Save it to our leaderboard. Or you can Go Back and try again.":"The best part about Madlibs is that it's always a surprise! Write in the silly words below and Get Started!"),r.a.createElement("nav",{onClick:this.slideMenu,className:"madlibChoices"+(this.state.hideInputs?" hidden":"")+(this.state.slideIn?" slideIn":"")},r.a.createElement("button",{onClick:function(t){return e.switchMadlib(t)},onFocus:this.focusOnNav,value:"dentist","aria-label":"Click here to choose the Dentist Madlib"},"A Visit to the Dentist"),r.a.createElement("button",{onClick:function(t){return e.switchMadlib(t)},onFocus:this.focusOnNav,value:"pirate","aria-label":"Click here to choose the Pirate Madlib"},"Talk like a Pirate!"))),r.a.createElement("main",{className:"wrapper"},this.state.hideInputs?null:r.a.createElement(E,{propFormSubmit:this.handleFormSubmit,propPathing:this.state.dbPath,propFocusOff:this.focusOffNav}),this.state.madlibCreated?r.a.createElement("section",{className:"madlibResult"},r.a.createElement("h2",null,"Here's your Madlib!"),r.a.createElement("p",null,v()(this.state.madlib))):null,r.a.createElement("section",{className:"buttonNav"},this.state.madlibCreated?null:r.a.createElement("button",{type:"submit",form:"madlibPrompts","aria-label":"This button will create your Madlib"},"Get Started!"),this.state.hideInputs?r.a.createElement(n.Fragment,null,r.a.createElement("button",{className:"saveButton",onClick:function(t){return e.handleSave(e.state.madlib,t)}},this.state.alreadySaved?"Saved!":"Save Madlib!"),r.a.createElement("button",{onClick:this.handleRefresh,title:"This will reset your words","aria-label":"This will also reset your words"},"Back to Start")):null),this.state.madlibCreated?r.a.createElement(S,null):null),r.a.createElement("footer",{className:"wrapper"},r.a.createElement("p",null,"Created by Philip Turkiewicz 2020")))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[26,1,2]]]);
//# sourceMappingURL=main.fc09bc01.chunk.js.map
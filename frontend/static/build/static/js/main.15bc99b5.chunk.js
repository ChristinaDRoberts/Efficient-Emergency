(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(30)},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(17),r=a.n(i),c=(a(28),a(7)),o=a(8),s=a(10),u=a(9),m=a(11),h=a(34),p=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={callList:[]},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/dispatchcall/").then(function(e){return 200!==e.status&&console.log("problem"),e.json()}).then(function(t){e.setState({callList:t}),console.log("json",t)})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("div",{className:"topDispatch"},l.a.createElement("h2",null,"Welcome Dispatcher ! Create A New Call, Or Revisit Previous Calls"),l.a.createElement(h.a,{variant:"danger",className:"switch",onClick:function(t){e.props.route("callCreate")}},"Start A Call")),l.a.createElement("div",null,l.a.createElement("ul",null,this.state.callList.map(function(e){return l.a.createElement("li",{key:e.id},l.a.createElement("a",{href:"#"},"Phone = ",e.phone,",    Call# = ",e.id,",    ",e.date))}))))}}]),t}(n.Component),d=a(21),g=a(5),b=a(33),v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={image_preview:"",imageCollection:[],image:""},a.handleImage=a.handleImage.bind(Object(g.a)(Object(g.a)(a))),a.submitImage=a.submitImage.bind(Object(g.a)(Object(g.a)(a))),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"handleImage",value:function(e){var t=this;e.preventDefault();var a=e.target.files[0],n=new FileReader;n.onloadend=function(){return t.setState({image_preview:n.result})},n.readAsDataURL(a),this.setState({image:a})}},{key:"submitImage",value:function(e){var t=this;e.preventDefault();var a=new FormData;a.append("image",this.state.image),a.append("imageCollection",JSON.stringify(this.state.imageCollection)),a.forEach(function(e,t){console.log("key %s: value %s",t,e)}),fetch("/api/scene/",{method:"POST",body:a}).then(function(e){return e.json()}).then(function(e){var a=Object(d.a)(t.state.imageCollection);a.push(e),t.setState({imageCollection:a}),t.setState({image_preview:""}),console.log("added",a)})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state.imageCollection.map(function(e){return l.a.createElement("li",{key:e.id},l.a.createElement("img",{src:e.image,alt:""}))});return l.a.createElement("div",null,l.a.createElement("h1",null,"Please Submit A Photo To Emergency Services"),l.a.createElement(b.a,{onSubmit:this.submitImage},l.a.createElement("img",{src:this.state.image_preview,alt:"..."}),l.a.createElement("input",{className:"input",type:"file",onChange:this.handleImage,name:"image"}),l.a.createElement(h.a,{className:"submitImageButton",type:"submit",variant:"secondary"},"Submit This Image !")),l.a.createElement("div",null,l.a.createElement("ul",null,e)))}}]),t}(n.Component),f=a(20),C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).createCall=function(e){e.preventDefault();var t={phone:a.state.phone},n={method:"POST",body:JSON.stringify(t),headers:new Headers({"Content-Type":"application/json"})};fetch("/api/dispatchcall/",n).then(function(e){return 201!==e.status&&console.log("problem"),e.json()}).then(function(e){console.log("json",e),a.setState({dispatchInfo:e}),setInterval(function(){return a.updateDispatchImages()},1e4),a.updateDispatchImages()})},a.handleCreateLink=function(e){e.preventDefault()},a.state={phone:"",disapatchInfo:{},imageCollection:[]},a.handlePhoneNumber=a.handlePhoneNumber.bind(Object(g.a)(Object(g.a)(a))),a.createCall=a.createCall.bind(Object(g.a)(Object(g.a)(a))),a.updateDispatchImages=a.updateDispatchImages.bind(Object(g.a)(Object(g.a)(a))),a.handleCreateLink=a.handleCreateLink.bind(Object(g.a)(Object(g.a)(a))),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"updateDispatchImages",value:function(e){var t=this;console.log("update images"),fetch("/api/scene/").then(function(e){return 200!==e.status&&console.log("problem"),e.json()}).then(function(e){t.setState({imageCollection:e}),console.log("json",e)})}},{key:"handlePhoneNumber",value:function(e){console.log(e.target.name,e.target.value),this.setState(Object(f.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this,t=this.state.imageCollection.map(function(e){return l.a.createElement("li",{key:e.id},l.a.createElement("img",{src:e.image,alt:""}))});return l.a.createElement("div",null,l.a.createElement("h2",null,"Dispatch Current Create Call Page"),l.a.createElement(b.a,{onSubmit:this.createCall},l.a.createElement("label",{htmlFor:"phone"},"Enter callers phone number:"),l.a.createElement("input",{type:"tel",id:"phone",name:"phone",placeholder:"Enter Phone Number Here",pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}",required:!0,value:this.state.phone,onChange:this.handlePhoneNumber}),l.a.createElement("span",{className:"note"},"Format: 123-456-7890"),l.a.createElement("br",null),l.a.createElement(h.a,{className:"createCallButton",type:"submit",variant:"secondary"},"Create This Call Record")),l.a.createElement(h.a,{className:"sendText",type:"submit",variant:"secondary",onClick:this.handleCreateLink},"SEND LINK THROUGH TEXT"),l.a.createElement("div",{className:"imagesFromClient"},l.a.createElement("ul",null,t)),l.a.createElement(h.a,{className:"endCall",onClick:function(t){e.props.route("callList")}},"End Call"))}}]),t}(n.Component),E=(a(29),a(32)),j=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).route=function(e){a.setState({currentScreen:e})},a.state={currentScreen:"callList"},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(E.a,{className:"MainCont"},function(){switch(e.state.currentScreen){case"callList":return l.a.createElement(p,{route:e.route,imageCollection:e.state.imageCollection});case"callCreate":return l.a.createElement(C,{route:e.route,imageCollection:e.state.imageCollection,image_preview:e.state.image_preview});case"callDetail":return l.a.createElement(v,{route:e.route,handleImage:e.handleImage,imageCollection:e.state.imageCollection,submitImage:e.submitImage,image:e.state.image,image_preview:e.state.image_preview})}}()))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.15bc99b5.chunk.js.map
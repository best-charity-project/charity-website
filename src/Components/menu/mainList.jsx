import React, { Component } from 'react';
import './menu.css'
class MainList extends Component {
constructor(props){
	super(props);
	this.state = this.props
}
	
  render() {
    return (
  <div className = 'mainList'> 
     <ul>
      {this.state.list.map(function(el) {
    return <li key={el}> {el}</li>
      })}
      </ul>
  </div>
    );
  }
}

export default MainList;
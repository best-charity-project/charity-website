import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class MenuLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      isOpenDropMenu: false,
    };
  }

  render() {
    return (
      <div className={this.props.className}>
        <ul>
          {this.state.list.map(function(el, stateListIndex) {
            if (el.child) {
              return <li className="dropdown" key={stateListIndex}>
                <button className="dropbtn">{el.name}</button>
                <ul className="dropdown-content">
                  {el.child.map(function(el, index) {
                    const images = require.context('../../Assets/AssetsSvg', true);
                    return (
                      <li key={index}>
                        <NavLink to={el.url}>
                          <img src={images(`./${el.icon}`)} alt = 'img' />
                          <p>{el.name}</p>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
            </li> 
          } else {
            return (
              <li key={stateListIndex}>
                <NavLink to={el.url}>{el.name}</NavLink>
            </li>
            )
          }
        })}
      </ul>
    </div>
    );
  }
}

export default MenuLinks;

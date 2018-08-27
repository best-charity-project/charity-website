import React, { Component } from 'react';
import { Link, Switch, NavLink } from 'react-router-dom';
class MenuLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      isOpenDropMenu: false,
    };
  }
  getCurrentLink = e => {
    if (e.target.parentNode.parentNode.classList.contains('activity')) {
      //   this.setState({ isOpenDropMenu: !this.state.isOpenDropMenu });
      document.querySelectorAll('.activity').forEach(el => {
        el.classList.remove('activeDropMenu');
      });
      e.target.parentNode.parentNode.classList.toggle('activeDropMenu');
    }
  };
  render() {
    let { isOpenDropMenu } = this.state;
    return (
      <div className={this.props.className}>
        <ul onClick={this.getCurrentLink}>
          {this.state.list.map(function(el, index) {
            if (el.child) {
              return (
                <li key={index} className="activity">
                  <div className={isOpenDropMenu ? 'wrapper-link-text link-active' : 'wrapper-link-text'}>
                    <p>{el.name}</p>
                  </div>
                  <div className="container-drop-menu">
                    <ul className="submenu-client">
                      {el.child.map(function(el, index) {
                        const images = require.context('../../Assets/AssetsSvg', true);
                        return (
                          <li key={index}>
                            <NavLink to={el.url}>
                              <img src={images(`./${el.icon}`)} />
                              {el.name}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                    {/* {isOpenDropMenu ? (
                      
                    ) : null} */}
                  </div>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <NavLink to={el.url}>{el.name}</NavLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default MenuLinks;

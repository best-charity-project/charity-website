import React from 'react';
import classnames from 'classnames';
import NavigationList from './NavigationList';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.setStateToFalse = this.setStateToFalse.bind(this);
    this.state = {
      isActive: false,
    };
  }
  setStateToFalse() {
    this.setState({ isActive: false });
  }

  getImageClass() {
    return classnames('navigation--button', {
      'navigation--button-open': this.state.isActive,
    });
  }

  toggleClass() {
    const currentState = this.state.isActive;
    this.setState({ isActive: !currentState });
  }

  render() {
    return (
      <nav className='navigation'>
        <ul className='navigation--menu'>
          <button className={this.getImageClass()} onClick={this.toggleClass} />
          <NavigationList onClick={this.setStateToFalse} />
        </ul>
      </nav>
    );
  }
}

export default Navigation;

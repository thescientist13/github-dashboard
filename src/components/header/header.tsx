import './header.css';
import * as React from 'react';

interface HeaderPropsInterface {}
interface HeaderStateInterface {}

class Header extends React.Component<HeaderPropsInterface, HeaderStateInterface> {

  render() {
    return (
      <header className="tgh-header">
        <h1 className="header-text">Github Dashboard</h1>
      </header>
    )
  }

}

export default Header;
import './navigation.css';
import * as React from 'react';
import { Link } from 'react-router';

interface NavigationPropsInterface {}
interface NavigationStateInterface {}

class Navigation extends React.Component<NavigationPropsInterface, NavigationStateInterface> {

  render() {
    return (
      <nav className="tgh-navigation">
        <ul role="nav">
          <li><Link to="/personal">Personal</Link></li>
          <li><Link to="/following">Following</Link></li>
        </ul>
      </nav>
    )
  }

}

export default Navigation;
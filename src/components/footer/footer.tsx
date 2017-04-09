import './footer.css';
import * as React from 'react';

interface FooterPropsInterface {}
interface FooterStateInterface {}

class Footer extends React.Component<FooterPropsInterface, FooterStateInterface> {

  render() {
    return (
      <footer className="footer">
        <h5>&copy; 2016 - Owen Buckley, The Greenhouse</h5>
      </footer>
    )
  }

}

export default Footer;
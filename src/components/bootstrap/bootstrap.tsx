import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import Navigation from '../navigation/navigation';
import UserDetails from '../user-details/user-details';

// TODO any
class Bootstrap extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <section className="row">

          <div className="col-md-*">
            <Header/>
          </div>

        </section>

        <section className="row">

          <div className="col-md-3">
            <UserDetails/>
            <Navigation/>
          </div>

          <div className="col-md-9">
            {this.props.children}
          </div>

        </section>

        <section className="row">

          <div className="col-md-12">
            <Footer/>
          </div>

        </section>
      </section>
    )
  }
}

export default connect()(Bootstrap);
'use strict';

import * as React from 'react';

import Footer from '../footer/footer';
import Header from '../header/header';
import Navigation from '../navigation/navigation';
import UserDetails from '../user-details/user-details';

class Layout extends React.Component {

  render() {
    return (
      <section>
        <section className="row">

          <div className="col-md-*">
            <Header></Header>
          </div>

        </section>

        <section className="row">

          <div className="col-md-3">
            <UserDetails></UserDetails>
            <Navigation></Navigation>
          </div>

          <div className="col-md-9">
            <div>{this.props.children}</div>
          </div>

        </section>

        <section className="row">

          <div className="col-md-12">
            <Footer></Footer>
          </div>
        </section>

      </section>
    )
  }

}

export default Layout;
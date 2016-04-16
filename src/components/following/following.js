'use strict';

import React from 'react';

const Following = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <p>It Worked!</p>
    )
  }

});

export default Following;
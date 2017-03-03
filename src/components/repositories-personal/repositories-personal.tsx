import * as React from 'react';
import TableRepositories from '../table-repositories/table-repositories';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    repositories: state.userRepositories
  };
}

//TODO change use any, any to use types
class RepositoriesPersonal extends React.Component<any, any>{

  constructor(props) {
    super(props);

    this.state = {
      repositories: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      repositories: nextProps.repositories
    });
  }

  componentWillMount () {
    this.setState({
      repositories: this.props.repositories
    });
  }

  render() {
    return (
      <div>
        <h3>Personal Repositories</h3>
        <TableRepositories repositories={this.state.repositories}/>
      </div>
    )
  }

}

export default connect(mapStateToProps)(RepositoriesPersonal);
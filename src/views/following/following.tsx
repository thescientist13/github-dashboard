import * as React from 'react';
import RepositoriesTable from '../../components/repositories-table/repositories-table';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return {
    repositories: state.userSubscriptions,
    hasMoreRepos: state.hasMoreRepos,
    nextReposUrl: state.nextReposUrl
  };
}

//TODO change use any, any to use types
class Following extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    };
  }



  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps nextProps', nextProps);
    console.log('componentWillReceiveProps this.state', this.state);
    // this.setState({
    //   repositories: [],
    //   hasMoreRepos: false,
    //   nextReposUrl: ''
    // });
    this.setState({
      repositories: nextProps.repositories,
      hasMoreRepos: nextProps.hasMoreRepos,
      nextReposUrl: nextProps.nextReposUrl
    });
    console.log('componentWillReceiveProps newState', this.state);
  }

  //this is here since if a component isnt mounted when dispatches to the store happen
  //the component will need to manually query the store to hydrate itself into state
  componentWillMount() {
    console.log('component will mount');
    // if(this.props.repositories.length === 0){
    //   console.log('with an API call');
    //   this.getUserSubscriptionsWithIssues();
    // }else{
    //   console.log('componentWillMount props', this.props);
    //   console.log('componentWillMount state', this.state);
    //   //this.render();
    //   this.getUserSubscriptionsWithIssues();
    //   //this.setState({
    //   //   repositories: this.state.repositories,
    //   //   hasMoreRepos: this.state.hasMoreRepos,
    //   //   nextReposUrl: this.state.nextReposUrl
    //   // });
    // }
  }

  // componentWillUnMount() {
  //   //console.log('componentWillMount props', this.props);
  //   console.log('componentWillMount state', this.state);
  //   this.setState({
  //     repositories: [],
  //     hasMoreRepos: false,
  //     nextReposUrl: ''
  //   });
  // }

  private getUserSubscriptionsWithIssues(){
    console.log('TODO load more -> call up');
  }

  render() {
    return (
      <div>
        <h3>Subscribed Repositories</h3>
        <RepositoriesTable
          repositories={this.state.repositories}
          hasMoreRepos={this.state.hasMoreRepos}
          nextReposUrl={this.state.nextReposUrl}
          getNextRepos={this.getUserSubscriptionsWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(Following);
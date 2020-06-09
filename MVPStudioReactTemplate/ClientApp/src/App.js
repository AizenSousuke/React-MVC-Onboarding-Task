import React, { Component } from 'react';
// import { Route } from 'react-router';
// import { Layout } from './components/Layout';
// import { FetchData } from './components/FetchData';
// import { Counter } from './components/Counter';
import { Home } from './pages/Home';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Home></Home>
      // <Layout>
      //   <Route exact path='/' component={Home} />
      //   <Route path='/counter' component={Counter} />
      //   <Route path='/fetchdata' component={FetchData} />
      // </Layout>
    );
  }
}

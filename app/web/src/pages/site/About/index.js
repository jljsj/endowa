import React from 'react';
import Banner from './Banner';
import Team from './Team';
import History from './History';
import Honor from './Honor';
import Join from './Join';
import Contact from './Contact';

class About extends React.PureComponent{
  render(){
    return (<div>
      <Banner />
      <Team />
      <History />
      <Honor />
      <Join />
      <Contact />
    </div>);
  }
}

export default About;

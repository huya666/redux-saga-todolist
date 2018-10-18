import React from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      todolist_content: ''
    }
  }
  render(){
    return (
      <div>
        <Header></Header>
        <List></List>
        <Footer></Footer>
      </div>
    )
  }
}
export default App;
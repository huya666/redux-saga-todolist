import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addItem } from '../actions'
class Header extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:''
    }
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChangeValue(e){
    this.setState({title: e.target.value})
  }

  handleEnter(e){
    let { title } = this.state;
    if(e.keyCode === 13){
      this.props.addItem({title, finished: false})
    }
  }
 
  render(){
    return(
      <div style={{width: '100%', height: '48px', lineHeight: '48px', background: '#323232', color: '#ddd', fontWeight: '500', display:'flex', justifyContent: 'center', fontSize: '24px'}}>
        <div style={{width: '600px', height:'48px', lineHeight: '48px', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span>ToDoList</span>
          <input
            placeholder="添加ToDo"
            style={{width:'350px', outline: 'none', height: '24px', paddingLeft: '10px', margin: 0, border: 0, borderRadius: '5px'}}
            value={this.state.title}
            onChange={e => this.handleChangeValue(e)}
            onKeyDown={ e => this.handleEnter(e) }
          ></input>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    list: state.getTodoList.list
  }
}

function mapDispatchToProps(dispatch){
  return {
    addItem: bindActionCreators(addItem, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
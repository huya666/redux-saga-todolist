import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearItem } from '../actions'

class Footer extends React.Component{
  constructor(props){
    super(props)
    this.state={}
    this.handleClear = this.handleClear.bind(this);
  }
  handleClear(){
    this.props.clearItem();
  }
  render(){
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize: '12px', color: '#666'}}>
        <footer>Copyright © 2018 todolist.cn <span onClick={this.handleClear} style={{textDecoration: 'none', color: '#666'}}>clear</span></footer>
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
    clearItem: bindActionCreators(clearItem, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
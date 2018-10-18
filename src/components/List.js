import React from 'react';
import { bindActionCreators } from 'redux';
import { modifyItem, removeItem, toggleItem, getListItem } from '../actions';
import { connect } from 'react-redux';
import ListItem from './ListItem'

class List extends React.Component{
  constructor(props){
    super(props);
    this.state={}
    this.handleChangeValue=this.handleChangeValue.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
    this.handleToggle=this.handleToggle.bind(this);
  }
  handleChangeValue(e){
    if(e.keyCode!== 13){return false;}
    let title = e.target.value;
    let _id = e.target.getAttribute('data-id');
    this.props.modifyItem({_id, title});
  }
  handleRemove(e){
    let index = e.target.getAttribute('data-id')
    this.props.removeItem({_id: index});
  }
  handleToggle(e){
    let { list } = this.props;
    let finished = null;
    e.stopPropagation();
    let index = e.target.getAttribute('data-id');
    list&&list.map(item => {
      if(item._id === index){
        finished = !item.finished;
      }
    })
    this.props.toggleItem({_id:index, finished});
  }

  componentDidMount(){
    this.props.getListItem()
  }

  render(){
    let { list } = this.props;
    let finishedNumber = 0;
    let number = 0;
    list.map(item => {
      if(item.finished){
        finishedNumber ++
      }else{
        number ++
      }
      return {}
    })
    console.log(this.props.list, 'list')
    return(
      <div style={{width: '100%', display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '30px', overflow:'hidden'}}>
        <div style={{width: '600px', height:'48px', lineHeight: '48px', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>待办事项</h2>
          <div style={{width: '20px', height: '20px', lineHeight: '20px', borderRadius: '50%', background: '#e6e6f8', textAlign: 'center', fontSize: '14px',marginRight: '5px'}}>{number}</div>
        </div>
        {
          list && list.map(item => {
            if(!item.finished){
              return(
                <ListItem finished={item.finished} handleToggle={this.handleToggle} handleChangeValue={this.handleChangeValue} handleRemove={this.handleRemove} key={item._id} item={item} />
              )
            }
          })
        }
        
        <div style={{width: '600px', height:'48px', lineHeight: '48px', display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px'}}>
          <h2>已经完成</h2>
          <div style={{width: '20px', height: '20px', lineHeight: '20px', borderRadius: '50%', background: '#e6e6f8', textAlign: 'center', fontSize: '14px',marginRight: '5px'}}>{finishedNumber}</div>
        </div>
        {
          list && list.map(item => {
            if(item.finished){
              return(
                <ListItem finished={item.finished} handleToggle={this.handleToggle} handleChangeValue={this.handleChangeValue} handleRemove={this.handleRemove} key={item._id} item={item} />
              )
            }
          })
        }
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
    modifyItem: bindActionCreators(modifyItem, dispatch),
    removeItem: bindActionCreators(removeItem, dispatch),
    toggleItem: bindActionCreators(toggleItem, dispatch),
    getListItem: bindActionCreators(getListItem, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
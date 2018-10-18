import React from 'react';

class ListItem extends React.Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    let { item } = this.props;
    return(
      <div key={item._id} style={{width: '580px', height:'32px', lineHeight: '32px', display:'flex', justifyContent: 'flex-start', marginTop:'10px', borderRadius: '3px', alignItems: 'center',  background: `${item.finished ? "#ddd" : "#fff"}` , paddingLeft: '10px', borderLeft: `${item.finished ? "5px solid #444" : "5px solid #6f999b"}` }}>
        <span data-finished={this.props.finished} data-id={item._id} onClick={e => this.props.handleToggle(e)}  style={{width: '16px', height: '16px', lineHeight: '16px', textAlign: 'center', background: `${item.finished ? "#92b3e1" : "#fff"}`,color: '#fff', border: `${item.finished ? "" : "1px solid #ccc"}` , fontSize:'12px', borderRadius: '3px'}}>{item.finished ? "✓" : null}</span>
        <input data-id={item._id} placeholder="内容" defaultValue={item.title} onKeyDown={e => this.props.handleChangeValue(e)} style={{outline:'none', border: 'none', padding:'0', paddingLeft:'10px', marginLeft: '10px', width: '460px', background:'transparent'}}></input>
        <div data-id={item._id} onClick={e => this.props.handleRemove(e)}  style={{marginLeft: '57px', width: '14px', height:'14px', lineHeight:'30px', textAlign: 'center', border: '2px solid #999', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div data-id={item._id}  style={{borderRadius: '50%',width: '10px', height:'10px', background: '#999',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div data-id={item._id}  style={{width: '8px', height:'2px', background:'#fff'}}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;
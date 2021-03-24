import React, {useEffect, useState } from 'react';
import Moon from'./../images/icon-moon.svg';
import Sun from './../images/icon-sun.svg';
import cross from './../images/icon-cross.svg';
import './style.css';
import{connect} from'react-redux';
import {AddList, completedList, RemoveList,CleatList,getVisibilty} from '../redux/todo/Actions';



function ToDoList(props){
  const [newList,SetNewList]=useState("");
  const [theme,setTheme]=useState(false);
 const items = Object.keys(props.lists.filter(m=>m.completed===false)).length;
 
  const handleClick =(event,newList)=>{
    var inputElement=document.getElementById("input");
    event.preventDefault();
    props.AddList(newList);
    inputElement.value="";
  }
  
  useEffect(()=>{
    if(theme===true){
    document.getElementsByTagName("body")[0].classList.remove("light-theme");
    document.getElementsByTagName("body")[0].classList.add("dark-theme");
    }
    else{
      document.getElementsByTagName("body")[0].classList.add("light-theme");
      document.getElementsByTagName("body")[0].classList.remove("dark-theme");
    }
  },[theme])

 

     return (
        <section className="to-do-list">
            <div className="header">
            <div className="list-header">
                <div className="header-title">
                <h1 className="heading">todo</h1>
                <img className="light-moon" src={!theme?Moon:Sun} alt="Moon" onClick={()=>setTheme(!theme)}/>
                </div>
              <form className="todo-form" onSubmit={(e)=>handleClick(e,newList)}>
   <input className="check-input " type="radio" value="" />
  <input id="input"  type="text" className="todo-input" aria-label="Sizing example input"  onChange={(e)=>SetNewList(e.target.value)} />
</form>
            <ul className="list-ul shadow-sm  rounded">
                {
                 props.showList.map(m=>{
                   return( 
                 <div className="reminder" key={m.id} id={m.id}>
                 <input className="check-input " type="radio" value=""  onChange={()=>props.completedList(m.id)}  />
                 <li className={m.completed?"list-li completed":"list-li"} >{m.list}</li>
                 <img src={cross} className="cross-icon float-right" onClick={()=>props.RemoveList(m.id)} alt="cross"/>
                 </div>
                 )})

  }
    <ul className="links">
      <li className="items ">{items} itmes left</li>
      <li className="list-links" onClick={()=>props.FilteredList(props.lists,"SHOW_ALL")}>All</li>
      <li className="list-links" onClick={()=>props.FilteredList(props.lists,"SHOW_ACTIVE")} >Active</li>
      <li className="list-links" onClick={()=>props.FilteredList(props.lists,"SHOW_COMPLETED")} >Completed</li>
      <li className="list-links ml-auto" onClick={props.ClearList}>Clear Completed</li>
{console.log(props.lists)}
    </ul>
            </ul>
</div>
            </div>
        </section>
    )
}
const mapStateToProps = state => {
    return {
      lists: state.lists,
      showList:state.ChangedLists,
      visible:state.visibilty
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      AddList: newList => dispatch(AddList(newList)),
      RemoveList:id=>dispatch(RemoveList(id)),
      completedList:id=>dispatch(completedList(id)),
      FilteredList:(lists,filter)=>dispatch(getVisibilty(lists,filter)),
      ClearList:()=>dispatch(CleatList())
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ToDoList);
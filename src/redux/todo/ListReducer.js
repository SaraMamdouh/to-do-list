import {ADD_LIST,COMPLETE_LIST,REMOVE_LIST,FILTER_LIST, CLEAR_LIST} from './types';
import update from 'immutability-helper';
 const initialState={
    lists:[
        {
        list:"quis ut nam facilis et officia qui",
        id:0,
        completed:false
    },
    {
        list:"delectus aut autem",
        id:1,
        completed:false
    },
    {
            list:"fugiat veniam minus",
            id:2,
            completed:false
        },
            {
            list:"et porro tempora",
            id:3,
            completed:false
        }
    ],
    ChangedLists:[
        {
        list:"quis ut nam facilis et officia qui",
        id:0,
        completed:false
    },
    {
        list:"delectus aut autem",
        id:1,
        completed:false
    },
    {
            list:"fugiat veniam minus",
            id:2,
            completed:false
        },
            {
            list:"et porro tempora",
            id:3,
            completed:false
        }
    ],
    listId:3,
    visibility:"SHOW_ALL"
    }

const ListReducer=(state=initialState,action)=>{

    switch (action.type){
            case ADD_LIST:
                return{
                    ...state,
                    lists:[...state.lists,{list:action.payload,id:state.listId+1,completed:false}],
                    ChangedLists:[{list:action.payload,id:state.listId+1,completed:false},...state.ChangedLists],
                     listId:state.listId+1
                
            }
            case REMOVE_LIST: 
            const reminder= state.lists.filter(m=>m.id!==action.payload)
                return {
                ...state,
                ChangedLists:reminder,
                lists:reminder
                }

            case COMPLETE_LIST: 
            const completed=state.lists.findIndex(m=>m.id===action.payload)
                    return update(state,{
                        lists:{
                           [completed]:{
                               completed:{
                                   $set:true
                           }}
                        },
                        ChangedLists:{
                            [completed]:{
                                completed:{
                                    $set:true
                            }}
                         }
                    })


              case FILTER_LIST:
                  return{
                      ...state,
                      ChangedLists:action.payload,
                      visibility:action.visible
                  }
              case CLEAR_LIST:
                  const result=state.lists.filter(m=>m.completed===false)
                  return {
                      ...state,
                      ChangedLists:result,
                      lists:result
                  }
            default:
                return state;
            
    }
}

export default ListReducer;

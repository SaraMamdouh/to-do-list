import { ADD_LIST,CLEAR_LIST,COMPLETE_LIST,FILTER_LIST,REMOVE_LIST} from './types';

export const AddList=(list)=>{
    return{
        type:ADD_LIST,
        payload:list
    }
}
export const RemoveList=(id)=>{
return{
    type:REMOVE_LIST,
    payload:id
}
}

export const completedList=(id)=>{
    return{
    type:COMPLETE_LIST,
    payload:id
}
}

export const FilteredList=(lists,visible)=>{
    return{
    type:FILTER_LIST,
    payload:lists,
    visible:visible
}
}

export const CleatList=()=>{
    return{
    type:CLEAR_LIST,
}
}

export const getVisibilty = (lists,filter) => {
    return (dispatch) => {
      switch (filter){
          case "SHOW_ALL":
          dispatch(FilteredList(lists))
          break;
       case "SHOW_COMPLETED":
           const completed=lists.filter(m=>m.completed===true)
           dispatch(FilteredList(completed))
           break;
        case "SHOW_ACTIVE":
        const incomplete=lists.filter(m=>m.completed===false)
        dispatch(FilteredList(incomplete))
        break;
        default:
            dispatch(getVisibilty(lists))
    }

  }
}


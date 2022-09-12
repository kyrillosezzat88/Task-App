import { DeleteTask, GetUserTasks, Loading, LogedinUser, Logout, updateTask } from "../Actions/Actions-types";

export const TaskReducer = (state , action ) => {
    switch (action.type) {
        case LogedinUser:
            return{
                ...state,
                user:action.payload
            }
        case Logout :
            return{
                ...state,
                Tasks:[]
            }
        case Loading:
            return{
                ...state,
                isLoading:action.payload
            }
        case GetUserTasks:
            return{
                ...state,
                Tasks:action.payload
            }
        case DeleteTask:
            return{
                ...state,
                Tasks:state.Tasks.filter(task => task.id !== action.payload)
            }
        case updateTask:
            return{
                ...state,
                Tasks:state.Tasks.map(task => task.id === action.payload.id ? {...task , ...action.payload} : task)
            }
        default:
            return state;
    }
}
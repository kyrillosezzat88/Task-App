// get all user Tasks 

import { DeleteTask, GetUserTasks, updateTask } from "./Actions-types"

export const GetAllUserTasks = (Tasks) => {
    return{
        type:GetUserTasks,
        payload:Tasks
    }
}

//delete task
export const RemoveTask = (TaskId) => {
    return{
        type:DeleteTask,
        payload:TaskId
    }
}
//update task
export const UpdateTask = (Task) => {
    return{
        type:updateTask,
        payload:Task
    }
}

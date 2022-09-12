import { Loading, LogedinUser, Logout } from "./Actions-types"

// logedin user 
export const logedinUser = (currentUser) => {
    return{
        type:LogedinUser,
        payload:currentUser
    }
}

// Logout user 
export const Signout = () => {
    return {
        type:Logout
    }
}

//loading 
export const loadData = (loading) => {
    return{
        type:Loading,
        payload:loading
    }
}

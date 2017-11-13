export default function (state = {},action){
    switch(action.type){
        case "Sign Up":
           return {...state,pageType:"Sign Up"};
        case "Sign In":
            return {...state,pageType:"Sign In"};
        case "user_name":
            return  {...state,inputValue:action.payload};
        case "user_pass":
            return  {...state,inputPass:action.payload};
        case "about_me":
            return {...state,dropBoxWindow:"about_me",aboutMe:action.payload};
        case "my_files":
            return {...state,dropBoxWindow:"my_files",myFiles:action.payload};
        case "my_groups":
            return {...state,dropBoxWindow:"my_groups",myGroups:action.payload};
        case "loginSuccess":
            return {...state,isLoggedIn:true,userData:action.payload};
        default: return state;
    }
}
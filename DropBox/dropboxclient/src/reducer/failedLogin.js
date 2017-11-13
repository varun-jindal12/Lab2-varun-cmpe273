export default function (state = {},action){
    switch(action.type){
        case "Failed SignIn":
            return {...state,SignInFail:"Authentication Failed"};
        case "Failed SignUp":
            return {...state,signUpFailed:"some problem occurred while Creating account"}
        default: return state;
    }
}
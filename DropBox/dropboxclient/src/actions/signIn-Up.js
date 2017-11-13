export const selectSignUp = (window) =>{
     console.log("you clicked select sign up", window);
    return{
        type: "Sign Up",
        payload:window
    }
};
export const selectSignIn = (window) =>{
    // console.log("you clicked", user.first);
    return{
        type: "Sign In",
        payload:window
    }
};
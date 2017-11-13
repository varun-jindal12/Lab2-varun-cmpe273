export const failedSignIn = (state) =>{
    console.log("your sign in failed", state);
    return{
        type: "Failed SignIn",
        payload:state
    }
};
export const failedSignUp = (state) =>{
    console.log("your sign up failed", state);
    return{
        type: "Failed SignUp",
        payload:state
    }
};
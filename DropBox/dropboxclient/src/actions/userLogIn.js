export const loginSuccess = (state) =>{
    console.log("your login was successful", state);
    return{
        type: "loginSuccess",
        payload:state
    }
};

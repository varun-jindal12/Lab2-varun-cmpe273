export const userNameValue = (inputValue) =>{
    console.log("you changed in sigh in values", inputValue);
    return{
        type: "user_name",
        payload:inputValue
    }
};
export const userPassValue = (inputValue) =>{
    console.log("you changed in sigh in values", inputValue);
    return{
        type: "user_pass",
        payload:inputValue
    }
};
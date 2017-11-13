export const aboutMeSelected = (inputValue) =>{
    console.log("you selected about me", inputValue);
    return{
        type: "about_me",
        payload:inputValue
    }
};
export const myFilesSelected = (inputValue) =>{
    console.log("you selected my files", inputValue);
    return{
        type: "my_files",
        payload:inputValue
    }
};
export const myGroupsSelected = (inputValue) =>{
    console.log("you my groups", inputValue);
    return{
        type: "about_me",
        payload:inputValue
    }
};

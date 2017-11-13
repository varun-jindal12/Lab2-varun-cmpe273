export default function (state = {},action){
    switch(action.type){
        case "User Details":
            return {...state,userData:action.payload};
        default: return state;
    }
}
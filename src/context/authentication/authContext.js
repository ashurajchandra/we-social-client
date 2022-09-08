import { createContext,useReducer, Dispatch } from "react";
import { initialState, stateReducer } from "./reducer";
// const INITIAL_CONTEXT = {
//     user:{}
// }
export const AuthContext = createContext({});


export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(stateReducer,initialState)
        return (
            <AuthContext.Provider value={{ state, dispatch }}>
              {children}
            </AuthContext.Provider>
         
    )
}



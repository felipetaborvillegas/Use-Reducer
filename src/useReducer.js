import React from "react";

const SECURITY_CODE = "moon";

export function UseReducer ({ name }) {

    const initialState = {
        error: false,
        loading: false,
        value: "",
        deleted: false,
        confirmed: false
    }

    const reducerObject = (state, payload) => ({
        "ERROR": {
            ...state,
            error: true,
            loading: false
        },
        "CHECK": {
            ...state,
            loading: true,
            error: false
        },
        "CONFIRM": {
            ...state,
            loading: false,
            error: false,
            confirmed: true
        },
        "WRITE": {
            ...state,
            error: false,
            loading:false,
            value: payload
        },
        "DELETE": {
            ...state,
            deleted: true
        },
        "RESET": {
            ...state,
            confirmed: false,
            deleted: false,
            value: ""
        }
    })

    const reducer = (state, action) => {
        if (reducerObject(state)[action.type]) {
            return reducerObject(state, action.payload)[action.type]
        } else {
            return state;
        }
    }

    const [states, dispatch] = React.useReducer(reducer, initialState)

    const {error, loading, value, deleted, confirmed} = states 

    React.useEffect(() => {

        if (loading) {
            setTimeout(() => {   
                
                if (value !== SECURITY_CODE) {
                    dispatch({
                        type: "ERROR",
                    });
                } else  {
                    dispatch({
                        type: "CONFIRM"
                    });
                }
            }, 3000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]) 

    if (!deleted && !confirmed) {
        return(
            <div>
                    <h2>Delete {name}</h2>
                    <p>Please, write the security code to ensure that you want to delete</p>
    
                    {error && (
                        <p>Error: The password is wrong</p>
                    )}
    
                    {loading  && (
                        <p>Loading...</p>
                    )}
                    
                    <input
                        placeholder="Password"
                        type="text" 
                        name="codigo_seguridad" 
                        value={value}
                        onChange={(event) => {
                            dispatch({
                                type: "WRITE",
                                payload: event.target.value
                            });
                        }}
                    />
                    <button type="submit" onClick={() => {
                            dispatch({
                                type: "CHECK"
                            })
                        }}>
                        Check
                    </button>
                    <p>the password is: <strong>moon</strong></p>
                </div>
        );
    } else if (!deleted && confirmed) {
        return(
        <React.Fragment>
            <h1>Delete current state</h1>
            <p>Are you sure?</p>
            <button onClick={() => {
                dispatch({
                    type: "DELETE"
                });
            }}>
                Yes, delete
            </button>
            <button onClick={() => {
                dispatch({
                    type: "RESET"
                });
            }}>
                No, return
            </button>
        </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <h1>Current state was deleted</h1>
                <button onClick={() => {
                    dispatch({
                        type: "RESET"
                    })
                }}>
                    Restore current state
                </button>
            </React.Fragment>
        )
    }
}   

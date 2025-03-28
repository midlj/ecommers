import { useState } from "react";

export const useFormDy=(initialValue)=>{
    const [state,setState] = useState(initialValue)

    return[
        state,
        (event)=>{
            setState({
                ...state,
                [event.target.name] : event.target.value,
            })
        }
    ]
}
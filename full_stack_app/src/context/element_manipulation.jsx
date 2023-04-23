import { useState } from "react";
import database_changed from "./database_changed";

// this function the global context component and uses 
// it for checking if an element is added or not

export default function ElementManipulation(props) {
    const [changed,set_changed] = useState(false);
    console.log("initialized");
    return (
        <database_changed.Provider value={{changed,set_changed}}>
            {props.children}
        </database_changed.Provider>
    )
}
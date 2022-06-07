import React, { useContext, useState, useEffect } from "react"
const ExpandedContext = React.createContext({
    expanded: false, 
    AddExpanded: () => {},
    ClearExpanded: () => {},
    PrintExpanded: () => {}
});

const ExpandedProvider = (props) => {
    const [expanded,setExpanded] = useState(false);
    useEffect(() => {
        // setExpanded(localStorage.getItem("expanded"));
    }, []);
    const AddExpanded = (input) => {
        setExpanded(input);
        // localStorage.setItem("expanded",input);
    }
    const ClearExpanded = () => {
        setExpanded(false);
        // localStorage.removeItem("expanded");
    }
    const PrintExpanded = () => {
        // console.log(expanded);
    }
    return(
        <ExpandedContext.Provider value={{
            expanded,
            AddExpanded,
            ClearExpanded,
            PrintExpanded
        }} {...props}></ExpandedContext.Provider>
    )
}

const UseExpanded = () => {
    return useContext(ExpandedContext);
}

export { ExpandedProvider, UseExpanded};

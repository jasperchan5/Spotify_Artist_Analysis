import React, { useContext, useState, useEffect } from "react"
const ArtistNameContext = React.createContext({
    artistName: "", 
    AddArtistName: () => {},
    ClearArtistName: () => {},
    PrintArtistName: () => {}
});

const ArtistNameProvider = (props) => {
    const [artistName,setArtistName] = useState("");
    useEffect(() => {
        // setArtistName(localStorage.getItem("artistName"));
    }, []);
    const AddArtistName = (input) => {
        setArtistName(input);
        // localStorage.setItem("artistName",input);
    }
    const ClearArtistName = () => {
        setArtistName("");
        // localStorage.removeItem("artistName");
    }
    const PrintArtistName = () => {
        // console.log(artistName);
    }
    return(
        <ArtistNameContext.Provider value={{
            artistName,
            AddArtistName,
            ClearArtistName,
            PrintArtistName
        }} {...props}></ArtistNameContext.Provider>
    )
}

const UseArtistName = () => {
    return useContext(ArtistNameContext);
}

export { ArtistNameProvider, UseArtistName};

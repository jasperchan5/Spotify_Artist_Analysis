import React, { useContext, useState, useEffect } from "react"
const ArtistDataContext = React.createContext({
    artistData: [], 
    AddArtistData: () => {},
    ClearArtistData: () => {},
    PrintArtistData: () => {}
});

const ArtistDataProvider = (props) => {
    const [artistData,setArtistData] = useState(null);
    useEffect(() => {
        // setArtistData(localStorage.getItem("artistData"));
    }, []);
    const AddArtistData = (input) => {
        setArtistData(input);
        // localStorage.setItem("artistData",input);
    }
    const ClearArtistData = () => {
        setArtistData(null);
        // localStorage.removeItem("artistData");
    }
    const PrintArtistData = () => {
        // console.log(artistData);
    }
    return(
        <ArtistDataContext.Provider value={{
            artistData,
            AddArtistData,
            ClearArtistData,
            PrintArtistData
        }} {...props}></ArtistDataContext.Provider>
    )
}

const UseArtistData = () => {
    return useContext(ArtistDataContext);
}

export { ArtistDataProvider, UseArtistData};

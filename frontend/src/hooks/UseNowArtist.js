import React, { useContext, useState, useEffect } from "react"
const NowArtistContext = React.createContext({
    nowArtist: {}, 
    AddNowArtist: () => {},
    ClearNowArtist: () => {},
    PrintNowArtist: () => {}
});

const NowArtistProvider = (props) => {
    const [nowArtist,setNowArtist] = useState(null);
    useEffect(() => {
        // setNowArtist(localStorage.getItem("nowArtist"));
    }, []);
    const AddNowArtist = (input) => {
        setNowArtist(input);
        // localStorage.setItem("nowArtist",input);
    }
    const ClearNowArtist = () => {
        setNowArtist(null);
        // localStorage.removeItem("nowArtist");
    }
    const PrintNowArtist = () => {
        // console.log(nowArtist);
    }
    return(
        <NowArtistContext.Provider value={{
            nowArtist,
            AddNowArtist,
            ClearNowArtist,
            PrintNowArtist
        }} {...props}></NowArtistContext.Provider>
    )
}

const UseNowArtist = () => {
    return useContext(NowArtistContext);
}

export { NowArtistProvider, UseNowArtist};

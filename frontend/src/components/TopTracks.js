import '../App.css'
import { UseNowArtist } from '../hooks/UseNowArtist';
import { useEffect, useState } from 'react';

export default () => {
    const { nowArtist, AddNowArtist } = UseNowArtist();
    const [nowID,setNowID] = useState("");
    const [nowNum,setNowNum] = useState(0);
    
    return(
        <>
            <div style={{display: "flex"}}>
                <div style={{width: "50%"}}>
                    {nowArtist === null ? <></> : 
                    <>
                        {nowArtist.topTracks.map((e,i) => 
                        <div className='artist_top_tracks_frame'>
                            <div style={{width: "15%"}}><div className='artist_top_tracks'>{i+1}</div></div>
                            <div style={{width: "85%"}}><div className='artist_top_tracks' key={`song${i}`} id={e.id} onClick={() => setNowID(e.id)}>{e.name}</div></div>
                        </div> 
                        )}
                    </>
                    }
                </div>
                <div style={{width: "50%"}}>
                    {nowID !== "" ? 
                    <iframe 
                        id="iframe"
                        src={`https://open.spotify.com/embed/track/${nowID}?utm_source=generator`} 
                        width="95%" height="550" 
                        frameBorder="0" allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                    </iframe> : <></>}
                </div>
            </div>
        </>
    )
}
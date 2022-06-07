import '../App.css'
import { UseArtistData } from '../hooks/UseArtistData';
import { UseNowArtist } from '../hooks/UseNowArtist';
import { UseExpanded } from '../hooks/UseExpanded';
import { useEffect, useState } from 'react';
import instance from '../axios';
import rightArrow from '../img/right-arrow.png';
import leftArrow from '../img/left-arrow.png';

export default () => {
    const { nowArtist, AddNowArtist } = UseNowArtist();
    const { artistData } = UseArtistData();
    const { expanded, AddExpanded } = UseExpanded();
    const [nowID,setNowID] = useState("");
    const [nowNum,setNowNum] = useState(0);

    const handleClick = async(nowName, nowImg, nowID) => {
        const {data:{topTracks}} = await instance.get("/backend/getTracks",{ params:{ artistID: nowID }});
        AddNowArtist({ 
            topTracks: topTracks,
            name: nowName,
            image: nowImg
        });
        let cont = document.getElementsByClassName("artist_photo_name_container")[0];
        let col_left = document.getElementsByClassName("col_left")[0];
        let col_right = document.getElementsByClassName("col_right")[0];
        let artist_info = document.getElementsByClassName("artist_info_title")[0];
        if(cont.className === "artist_photo_name_container"){
            cont.classList += " artist_click_animation";
            col_left.classList += " collapse";
            col_right.classList += " expand";
            artist_info.classList += " appear";
            AddExpanded(true);
        }
        else{
            cont.className = "artist_photo_name_container";
            col_left.className = "col_left";
            col_right.className = "col_right";
            artist_info.className = "artist_info_title";
            AddExpanded(false);
        }
    }
    
    return(
        <>
            {artistData === null ? <></> :
            <>
                <div style={{display: "flex"}}>
                    <div className='col_left'>
                        <div style={expanded ? {width: "0%"} : {width: "20%", display: "flex", alignItems: "center"}}>
                            {expanded ? <></> : 
                            <>
                                {artistData.length !== 3 ? <></> : <>
                                    <img className='artist_carousel_arrow_left' src={leftArrow} onClick={() => {
                                        if(nowNum !== 0){
                                            setNowNum(nowNum-1);
                                        }
                                        else{
                                            setNowNum(2);
                                        }
                                    }}></img>
                                    <div className='artist_carousel_side_image'>
                                        <img className='artist_photo' src={artistData[nowNum === 0 ? 2 : nowNum-1].image}></img>
                                        <div className='artist_name side'>{artistData[nowNum === 0 ? 2 : nowNum-1].name}</div>
                                    </div>
                                </>}
                            </> }
                            
                        </div>
                        <div style={expanded ? {width: "100%"} : {width: "60%"}}>
                            <div className='artist_photo_name_container' onClick={() => handleClick(artistData[nowNum].name,artistData[nowNum].image,artistData[nowNum].id)}>
                                <img className='artist_photo' src={artistData[nowNum].image}></img>
                                <div className='artist_name'>{artistData[nowNum].name}</div>
                            </div>
                        </div>
                        <div style={expanded ? {width: "0%"} : {width: "20%", display: "flex", alignItems: "center"}}>
                            {expanded ? <></> : 
                            <>
                                {artistData.length !== 3 ? <></> : <>
                                    <img className='artist_carousel_arrow_right' src={rightArrow} onClick={() => {
                                        if(nowNum !== 2){
                                            setNowNum(nowNum+1);
                                        }
                                        else{
                                            setNowNum(0);
                                        }
                                    }}></img>
                                    <div className='artist_carousel_side_image'>
                                        <img className='artist_photo' src={artistData[nowNum === 2 ? 0 : nowNum+1].image}></img>
                                        <div className='artist_name side'>{artistData[nowNum === 2 ? 0 : nowNum+1].name}</div>
                                    </div>
                                </>}
                            </> }
                        </div>
                    </div> 
                    <div className='col_right'>
                        <div style={{width: "100%"}}>
                            <div className='artist_info_title'>
                                Top tracks
                            </div>
                        </div>
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
                    </div>
                </div>
            </>
            }
        </>
    )
}
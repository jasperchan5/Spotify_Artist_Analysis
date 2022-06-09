import '../App.css'
import { UseArtistData } from '../hooks/UseArtistData';
import { UseNowArtist } from '../hooks/UseNowArtist';
import { UseExpanded } from '../hooks/UseExpanded';
import { useEffect, useState } from 'react';
import instance from '../axios';
import rightArrow from '../img/right-arrow.png';
import leftArrow from '../img/left-arrow.png';
import TopTracks from './TopTracks';
import Albums from './Albums';

export default () => {
    const { nowArtist, AddNowArtist } = UseNowArtist();
    const { artistData } = UseArtistData();
    const { expanded, AddExpanded } = UseExpanded();
    const [nowID,setNowID] = useState("");
    const [nowNum,setNowNum] = useState(0);
    const [nowFunction,setNowFunction] = useState("");

    const functions = ['Top Tracks','Albums',''];

    const handleClick = async(nowName, nowImg, nowID) => {
        const {data:{topTracks}} = await instance.get("/backend/getTracks",{ params:{ artistID: nowID }});
        const {data:{albums}} = await instance.get("/backend/getAlbums",{ params:{ artistID: nowID }});
        AddNowArtist({ 
            topTracks: topTracks,
            name: nowName,
            image: nowImg,
            albums: albums
        });
        let cont = document.getElementsByClassName("artist_photo_name_container")[0];
        let col_left = document.getElementsByClassName("col_left")[0];
        let col_right = document.getElementsByClassName("col_right")[0];
        if(cont.className === "artist_photo_name_container"){
            cont.classList += " artist_click_animation";
            col_left.classList += " collapse";
            col_right.classList += " expand";
            AddExpanded(true);
        }
        else{
            cont.className = "artist_photo_name_container";
            col_left.className = "col_left";
            col_right.className = "col_right";
            AddExpanded(false);
        }
    }
    
    return(
        <>
            {artistData === null ? <></> :
            <>
                <div style={{display: "flex"}}>
                    <div className='col_left'>
                        <div style={expanded ? {width: "0%"} : {width: "30%", display: "flex", alignItems: "center"}}>
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
                        <div style={expanded ? {width: "100%"} : {width: "40%"}}>
                            <div className='artist_photo_name_container' onClick={() => handleClick(artistData[nowNum].name,artistData[nowNum].image,artistData[nowNum].id)}>
                                <img className='artist_photo' src={artistData[nowNum].image}></img>
                                <div className='artist_name'>{artistData[nowNum].name}</div>
                            </div>
                        </div>
                        <div style={expanded ? {width: "0%"} : {width: "30%", display: "flex", alignItems: "center", margin: "auto"}}>
                            {expanded ? <></> : 
                            <>
                                {artistData.length !== 3 ? <></> : <>
                                    <div className='artist_carousel_side_image'>
                                        <img className='artist_photo' src={artistData[nowNum === 2 ? 0 : nowNum+1].image}></img>
                                        <div className='artist_name side'>{artistData[nowNum === 2 ? 0 : nowNum+1].name}</div>
                                    </div>
                                    <img className='artist_carousel_arrow_right' src={rightArrow} onClick={() => {
                                        if(nowNum !== 2){
                                            setNowNum(nowNum+1);
                                        }
                                        else{
                                            setNowNum(0);
                                        }
                                    }}></img>
                                </>}
                            </> }
                        </div>
                    </div> 
                    <div className='col_right'>
                        <div style={{width: "100%", display: "flex"}}>
                            {functions.map((e,i) => 
                            <div key={`tag${i}`} id={`tag${i}`} className='artist_info_title_tag unclicked' style={{width: `${(100/functions.length)}%`}} 
                                onClick={() => {
                                    let tags = document.getElementsByClassName("artist_info_title_tag");
                                    for(let t = 0; t < tags.length; t++){
                                        if(t === i){
                                            tags[t].classList += " clicked";
                                            setNowFunction(e);
                                        }
                                        else{
                                            tags[t].className = "artist_info_title_tag unclicked";
                                        }
                                    }
                                }
                                }>
                                <div className='artist_info_title'>
                                    {e}
                                </div>
                            </div>)}
                        </div>
                        <div style={{width: "100%"}}>
                            {nowFunction === "Top Tracks" ?  <TopTracks/> : nowFunction === 'Albums' ? <Albums/> : <></>}
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}
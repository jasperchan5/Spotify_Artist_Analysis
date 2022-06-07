import instance from '../axios';
import search_icon from '../img/search.png';
import green_logo from '../img/Spotify_Logo_Green.png';
import no_image from '../img/no-image-icon.png';
import '../App.css';
import { UseArtistName } from '../hooks/UseArtistName';
import { UseArtistData } from '../hooks/UseArtistData';
import { UseNowArtist } from '../hooks/UseNowArtist';
import { UseExpanded } from '../hooks/UseExpanded';
import { useEffect } from 'react';

export default () => {
    const { artistName, AddArtistName, ClearArtistName } = UseArtistName();
    const { artistData, AddArtistData, ClearArtistData } = UseArtistData();
    const { ClearExpanded } = UseExpanded();
    const { ClearNowArtist } = UseNowArtist();
    const handleReset = () => {
        ClearArtistName();
        ClearArtistData();
        ClearNowArtist();
        ClearExpanded();
    }

    const handleSearch = async() => {
        if(artistName.length !== 0) {
            const {data:{artistInfo}} = await instance.get("/backend/getArtist",{ params:{ artistName: artistName }});
            const artistArr = artistInfo.map((e) => {
                return {
                name: e.name,
                id: e.id,
                image: e.images.length === 0 ? no_image : e.images[0].url,
                followers: e.followers.total,
            }});
            handleReset();
            AddArtistData(artistArr);
            let cont = document.getElementsByClassName("artist_photo_name_container")[0];
            let col_left = document.getElementsByClassName("col_left")[0];
            let col_right = document.getElementsByClassName("col_right")[0];
            let artist_info = document.getElementsByClassName("artist_info_title")[0];
            cont.className = "artist_photo_name_container";
            col_left.className = "col_left";
            col_right.className = "col_right";
            artist_info.className = "artist_info_title";
        }
    }
    return(
        <>
            <div style={{display: "flex"}}>
                <img className='spotify_logo' src={green_logo} onClick={handleReset}></img>
                <div className='title'>Artist Analysis</div>
                <div className='artist_search_bar'>
                    <div className='artist_search_bar_semi_circle'></div>
                    <input 
                        placeholder="Search for an artist..." 
                        className='artist_search_bar_rectangle'
                        onChange={(e) => {AddArtistName(e.target.value)}}
                        value={artistName}
                        onKeyUp={(e)=>{
                            if(e.key === 'Enter'){
                                document.getElementsByClassName("artist_search_bar_icon")[0].click();
                            }
                        }}
                    ></input>
                    <div className='artist_search_bar_semi_circle'>
                        <img className="artist_search_bar_icon" src={search_icon} onClick={handleSearch}></img>
                    </div>
                </div>
            </div>
        </>
    )
}
import instance from "../axios";
import { UseNowArtist } from "../hooks/UseNowArtist";
export default () => {
    const { nowArtist } = UseNowArtist();

    return(
        <>
            {nowArtist === null ? <></> :
            <div style={{display: "flex", flexDirection: 'row'}}>
                {nowArtist.albums.map((e,i) =>{
                    return <div className='artist_album_container' >
                        <img className='artist_album_photo' src={e.images[1].url}></img>
                        <div className='artist_album_name'>{e.name}</div>
                    </div>
                }
                )}
            </div>
            }
        </>
    )
}
import { useParams, useOutletContext } from "react-router-dom";
import type { OutletContext } from "../types/types";
import type { Makerspace } from "../types/types";
import supabase from "../lib/supabase";
import styles from '../styles/makerspaceDetail.module.css';

function MakerspaceDetail() {
    const { makerspaces }: OutletContext = useOutletContext();
    const { id } = useParams();
    let makerspace: Makerspace | undefined = makerspaces.find((mkspc) => mkspc["makerspace_id"] == id);
    let coverImage = "";

    if (makerspace && makerspace["cover_image"]) {
        const { data } = supabase
            .storage
            .from('makerspace-photos')
            .getPublicUrl(makerspace["cover_image"]);
        
        coverImage = data.publicUrl;
    }

    return (
        <>
            {
                makerspace ?
                <div>
                    <h1>{makerspace["makerspace_name"]}</h1>
                    <p>{makerspace.building}</p>
                    <p>{makerspace.rooms.map((room, index) => <span key={room}>{room}{index < makerspace.rooms.length - 1 && ', '}</span>)}</p>
                    <img src={coverImage} className={styles["main-image"]} />
                    <p>{makerspace.description}</p>
                </div>
                : <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default MakerspaceDetail;
import type { MakerspaceCardProps } from "../types/types";
import styles from '../styles/makerspaceCard.module.css';
import supabase from "../lib/supabase";
import { Link } from "react-router-dom";

function MakerspaceCard({ makerspace }: MakerspaceCardProps) {
    const detailPagePath = `/makerspace-detail/${makerspace.id}`;
    let coverImage = "";

    if (makerspace["cover_image"]) {
        const { data } = supabase
            .storage
            .from('makerspace-photos')
            .getPublicUrl(makerspace["cover_image"]);

        coverImage = data.publicUrl;
    }

    return (
        <Link to={detailPagePath} className={styles.card}>
            {coverImage !== "" && <img src={coverImage} />}
            <h1 className={styles.name}>{makerspace.name}</h1>
            <div className={styles.location}>
                <p>{makerspace.building}</p>
                <p>{makerspace.rooms.map((room, index) => <span key={room}>{room}{index < makerspace.rooms.length - 1 && ', '}</span>)}</p>
            </div>
            <p>{makerspace.description && (makerspace.description.length <= 200 ? makerspace.description : `${makerspace.description.substring(0, 200)}...`)}</p>
        </Link>
    );
}

export default MakerspaceCard;
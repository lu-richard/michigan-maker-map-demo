import type { MakerspaceCardProps } from "../types/types";
import styles from '../styles/makerspaceCard.module.css';
import supabase from "../lib/supabase";
import { Link } from "react-router-dom";

function MakerspaceCard({ makerspaceCard }: MakerspaceCardProps) {
    const makerspaceDetailPath = `/makerspace-detail/${makerspaceCard["makerspace_id"]}`;
    let coverImage: string | null = null;

    if (makerspaceCard["cover_image"]) {
        const { data } = supabase
            .storage
            .from('makerspace-photos')
            .getPublicUrl(makerspaceCard["cover_image"]);

        coverImage = data.publicUrl;
    }

    return (
        <Link to={makerspaceDetailPath} className={styles.card}>
            {coverImage && <img src={coverImage} />}
            <h1 className={styles.name}>{makerspaceCard["makerspace_name"]}</h1>
            <div className={styles.location}>
                <p>{makerspaceCard.building}</p>
                <p>{makerspaceCard.rooms?.map((room, index) => <span key={room}>{room}{index < makerspaceCard.rooms!.length - 1 && ', '}</span>)}</p>
            </div>
            <p>{makerspaceCard.description && (makerspaceCard.description.length <= 200 ? makerspaceCard.description : `${makerspaceCard.description.substring(0, 200)}...`)}</p>
        </Link>
    );
}

export default MakerspaceCard;
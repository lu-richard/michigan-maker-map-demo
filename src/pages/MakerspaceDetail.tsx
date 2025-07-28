import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { MakerspaceDetailData } from "../types/types";
import supabase from "../lib/supabase";
import styles from '../styles/makerspaceDetail.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Loading from "./Loading";

const useMakerspaceDetailData = () => {
    const { id } = useParams();
    const [makerspace, setMakerspace] = useState<MakerspaceDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMakerspace = async () => {
            try {
                const { data, error } = await supabase.from('view_makerspace_detail_pages').select().eq('makerspace_id', id!).maybeSingle();

                if (error) {
                    throw new Error("Failed to fetch makerspace");
                }
                
                setMakerspace(data as MakerspaceDetailData | null);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        };

        fetchMakerspace();
    }, []);

    return { makerspace, loading };
};

function MakerspaceDetail() {
    const { makerspace, loading } = useMakerspaceDetailData();
    let coverImage: string | null = null;

    if (makerspace && makerspace["cover_image"]) {
        const { data } = supabase
            .storage
            .from('makerspace-photos')
            .getPublicUrl(makerspace["cover_image"]);
    
        coverImage = data.publicUrl;
    }

    const toggleEquipmentList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        (e.currentTarget as HTMLElement).classList.toggle(styles.active);
    };

    return (
        <>
            {
                loading ? <Loading /> :
                makerspace ?
                <>
                    <div className={styles["top-bar"]}>
                        <div>
                            <h1>{makerspace["makerspace_name"]}</h1>
                            <p>{makerspace.building}</p>
                            {makerspace.rooms && <p>{makerspace.rooms.map((room, index) => <span key={room}>{room}{index < makerspace.rooms!.length - 1 && ', '}</span>)}</p>}
                            <div className={styles.tags}>
                                {makerspace.theme && makerspace.theme.map((tag) => <p key={tag} className={styles.tag}>{tag}</p>)}
                            </div>
                        </div>
                        <div className={styles.audience}>
                            <h3>Who Can Use This Space?</h3>
                            <ul>
                                {makerspace.audience?.map((aud, index) => <li key={index}>{aud}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className={styles["main-content"]}>
                        {coverImage && <img src={coverImage} className={styles["main-image"]} />}
                        <section className={styles["text-content"]}>
                            <p className={styles.status}>Current Status: {makerspace["makerspace_status"] || "N/A"}</p>
                            <p>{makerspace.description}</p>
                            <button type="button" className={styles.collapsible} onClick={toggleEquipmentList}>
                                <span className={styles["collapsible-title"]}>Equipment</span>
                                <KeyboardArrowDownIcon className={styles.expand} />
                                <KeyboardArrowUpIcon className={styles.collapse} />
                            </button>
                            <ul className={styles["equipment-list"]}>
                                {makerspace["equipment_list"].map((makerspaceEquipment) => <li key={makerspaceEquipment["equipment_id"]}>{makerspaceEquipment["equipment_name"]}</li>)}
                            </ul>
                            <div className={styles.contact}>
                                <h4 className={styles.h4}>Contact</h4>
                                <p>{makerspace["contact_email"]}<br />{`(${makerspace["contact_phone"].substring(0, 3)}) ${makerspace["contact_phone"].substring(3, 6)}-${makerspace["contact_phone"].substring(6)}`}</p>
                            </div>
                        </section>
                    </div>
                </>
                : <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default MakerspaceDetail;
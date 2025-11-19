import { useParams, Link } from "react-router-dom";
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
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [floorplanImage, setFloorplanImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMakerspace = async () => {
            try {
                const { data, error } = await supabase.from('view_makerspace_detail_pages').select().eq('makerspace_id', id!).maybeSingle();

                if (error) {
                    throw new Error(error.message);
                }
                
                setMakerspace(data as MakerspaceDetailData | null);

                if (data?.["cover_image"]) {
                    const { data: coverImg } = supabase
                        .storage
                        .from('makerspace-photos')
                        .getPublicUrl(data["cover_image"]);
                
                    setCoverImage(coverImg.publicUrl);
                }
                if (data?.["floorplan_image"]) {
                    const { data: floorplanImg } = supabase
                        .storage
                        .from('makerspace-photos')
                        .getPublicUrl(data["floorplan_image"]);
                    
                    setFloorplanImage(floorplanImg.publicUrl);
                }
            }
            catch (e) {
                console.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchMakerspace();
    }, []);

    return { makerspace, coverImage, floorplanImage, loading };
};

function MakerspaceDetail() {
    const { makerspace, coverImage, floorplanImage, loading } = useMakerspaceDetailData();
    
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
                            <p>{makerspace.rooms?.map((room, index) => <span key={room}>{room}{index < makerspace.rooms!.length - 1 && ', '}</span>)}</p>
                            <div className={styles.tags}>
                                {makerspace.theme?.map((tag) => <p key={tag} className={styles.tag}>{tag}</p>)}
                            </div>
                        </div>
                        <div className={styles.audience}>
                            <h3 className={styles["audience-heading"]}>Who Can Use This Space?</h3>
                            <ul>
                                {makerspace.audience?.map((aud, index) => <li key={index}>{aud}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className={styles["main-content"]}>
                        <div className={styles["cover-description"]}>
                            {coverImage && <img src={coverImage} className={styles["cover-image"]} />}
                            <section className={styles["text-content"]}>
                                <p className={styles.status}>Current Status: {makerspace["makerspace_status"] || "N/A"}</p>
                                <p>{makerspace.description}</p>
                                <button type="button" className={styles.collapsible} onClick={toggleEquipmentList}>
                                    <span className={styles["collapsible-title"]}>Equipment</span>
                                    <KeyboardArrowDownIcon className={styles.expand} />
                                    <KeyboardArrowUpIcon className={styles.collapse} />
                                </button>
                                <ul className={styles["equipment-list"]}>
                                    {makerspace["equipment_list"].map((makerspaceEquipment) => {
                                        const equipmentDetailPath = `/equipment-detail/${makerspaceEquipment["equipment_id"]}`;

                                        return <li key={makerspaceEquipment["equipment_id"]}><Link to={equipmentDetailPath}>{makerspaceEquipment["equipment_name"]}</Link></li>;
                                    })}
                                </ul>
                                <div className={styles.contact}>
                                    <h4 className={styles.h4}>Contact</h4>
                                    <p>{makerspace["contact_email"]}<br />{`(${makerspace["contact_phone"].substring(0, 3)}) ${makerspace["contact_phone"].substring(3, 6)}-${makerspace["contact_phone"].substring(6)}`}</p>
                                </div>
                            </section>
                        </div>
                        {
                            floorplanImage &&
                            <div className={styles.floorplan}>
                                <h4 className={styles["floorplan-heading"]}>Floor Plan</h4>
                                <div className={styles["floorplan-line"]}></div>
                                <img src={floorplanImage} className={styles["floorplan-image"]} />
                            </div>
                        }
                    </div>
                </>
                : <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default MakerspaceDetail;
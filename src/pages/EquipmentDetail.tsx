import { useParams } from "react-router-dom";
import type { EquipmentDetailData } from "../types/types";
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Loading from "./Loading";
import styles from '../styles/equipmentDetail.module.css';

const useEquipmentDetailData = () => {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<EquipmentDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const { data, error } = await supabase.from('view_equipment_detail_pages').select().eq('equipment_id', id!).maybeSingle();

                if (error) {
                    throw new Error("Failed to fetch equipment");
                }

                setEquipment(data);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    return { equipment, loading };
};

function EquipmentDetail() {
    const { equipment, loading } = useEquipmentDetailData();
    let coverImage: string | null = null;

    if (equipment?.manufacturer_image_urls?.length) {
        const { data } = supabase
            .storage
            .from('equipment-model-photos')
            .getPublicUrl(equipment["manufacturer_image_urls"][0]);
        
        coverImage = data.publicUrl;
    }
    
    return (
        <>
            {
                loading ? <Loading /> :
                equipment ?
                <>
                    <div className={styles["top-bar"]}>
                        <div>
                            <h1>{equipment["equipment_type"]}</h1>
                            <p>{equipment.building}</p>
                            {equipment.rooms && <p>{equipment.rooms.map((room, index) => <span key={room}>{room}{index < equipment.rooms!.length - 1 && ', '}</span>)}</p>}
                        </div>
                    </div>
                    <div className={styles["main-content"]}>
                        {coverImage && <img src={coverImage} className={styles["main-image"]} />}
                        <section className={styles["text-content"]}>
                            <p>{equipment["equipment_type"]}</p>
                        </section>
                    </div>
                </>
                : <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default EquipmentDetail;
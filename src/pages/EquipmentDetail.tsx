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
                            <h1 className={styles.title}>{equipment["equipment_type"]}<span className={styles["equipment-model-name"]}>{equipment["equipment_model_name"]}</span></h1>
                            <section className={styles["top-bar-subinfo"]}>
                                <p className={styles.subheading}>{equipment["makerspace_name"]}</p>
                                <p>{equipment.building}</p>
                                <p>{equipment.rooms?.map((room, index) => <span key={room}>{room}{index < equipment.rooms!.length - 1 && ', '}</span>)}</p>
                            </section>
                        </div>
                        <div className={styles["top-bar-side-info"]}>
                            <h4 className={`${styles.subheading} ${styles.functions}`}>Functions</h4>
                            <p>{equipment.capabilities?.map((capability, index) => <span key={capability}>{capability}{index < equipment.capabilities!.length - 1 && ', '}</span>)}</p>
                            <h4 className={`${styles.subheading} ${styles["credential-model"]}`}>Necessary Credential:</h4>
                            <p>{equipment["credential_model_name"]}</p>
                        </div>
                    </div>
                    <div className={styles["main-content"]}>
                        {coverImage && <div className={styles["image-container"]}><img src={coverImage} className={styles["cover-image"]} /></div>}
                        <section className={styles["text-content"]}>
                            <section className={styles["text-content-section"]}>
                                <h2 className={styles["text-content-heading"]}>Status & Usage</h2>
                                <p>Current Status: {equipment["equipment_status"] || "N/A"}</p>
                                {equipment.materials && <p>Materials: {equipment.materials.map((material, index) => <span key={material}>{material}{index < equipment.materials!.length - 1 && ', '}</span>)}</p>}
                                <p>CNC: {equipment["is_cnc"] ? "Yes" : "No"}</p>
                                {typeof equipment["equipment_specific_specs"] === "object" && equipment["equipment_specific_specs"] && Object.entries(equipment["equipment_specific_specs"]).map(([key, value], index) => typeof value === "string" && <p key={index}>{key}: {value}</p>)}
                                <p>{equipment.notes}</p>
                            </section>
                            <section className={styles["text-content-section"]}>
                                <h2 className={styles["text-content-heading"]}>Specifications</h2>
                                <p>Model: {equipment.model}</p>
                                <p>Make: {equipment.make}</p>
                                {typeof equipment["equipment_model_specific_specs"] === "object" && equipment["equipment_model_specific_specs"] && Object.entries(equipment["equipment_model_specific_specs"]).map(([key, value], index) => typeof value === "string" && <p key={index}>{key}: {value}</p>)}
                            </section>
                        </section>
                    </div>
                </>
                : <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default EquipmentDetail;
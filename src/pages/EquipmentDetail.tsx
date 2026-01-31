import { useParams } from "react-router-dom";
import type { EquipmentDetailData } from "../types/types";
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Loading from "./Loading";
// import styles from '../styles/equipmentDetail.module.css';
import labels from "../constants/labels";

const useEquipmentDetailData = () => {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<EquipmentDetailData | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const { data, error } = await supabase.from('view_equipment_detail_pages').select().eq('equipment_id', id!).maybeSingle();

                if (error) {
                    throw new Error(error.message);
                }

                setEquipment(data);

                if (data?.manufacturer_image_urls?.length) {
                    const { data: image } = supabase
                        .storage
                        .from('equipment-model-photos')
                        .getPublicUrl(data["manufacturer_image_urls"][0]);
                    
                    setCoverImage(image.publicUrl);
                }
            }
            catch (e) {
                console.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    return { equipment, coverImage, loading };
};

function EquipmentDetail() {
    const { equipment, coverImage, loading } = useEquipmentDetailData();
    
    return (
        <>
            {
                loading ? <Loading /> :
                equipment ?
                <>
                    <div className="py-12 px-80 bg-arb-blue text-[#fff] flex justify-between font-light">
                        <div>
                            <h1 className="text-4xl font-semibold">{equipment["equipment_type"]}<span className="ml-6 italic font-light text-2xl">{equipment["equipment_model_name"]}</span></h1>
                            <section className="mt-4">
                                <p className="font-medium">{equipment["makerspace_name"]}</p>
                                <p>{equipment.building}</p>
                                <p>{equipment.rooms?.map((room, index) => <span key={room}>{room}{index < equipment.rooms!.length - 1 && ', '}</span>)}</p>
                            </section>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium underline">Functions</h4>
                            <p>{equipment.capabilities?.map((capability, index) => <span key={index}>{capability}{index < equipment.capabilities!.length - 1 && ', '}</span>)}</p>
                            <h4 className="text-lg font-medium mt-8">Necessary Credential:</h4>
                            <p>{equipment["credential_model_name"]}</p>
                        </div>
                    </div>
                    <div className="py-12 px-16 flex">
                        {coverImage && <div className="block mx-auto w-1/2 px-36 self-start"><img src={coverImage} className="w-full" /></div>}
                        <section className="text-xl ml-8 w-1/2">
                            <section className="mb-12">
                                <h2 className="font-medium underline mb-2">Status & Usage</h2>
                                <p>Current Status: {equipment["equipment_status"] || "N/A"}</p>
                                {equipment.materials && <p>Materials: {equipment.materials.map((material, index) => <span key={material}>{material}{index < equipment.materials!.length - 1 && ', '}</span>)}</p>}
                                {typeof equipment["equipment_specific_specs"] === "object" && equipment["equipment_specific_specs"] && Object.entries(equipment["equipment_specific_specs"]).map(([key, value], index) => typeof value === "string" && <p key={index}>{key}: {value}</p>)}
                                {
                                    equipment.notes &&
                                    <>
                                        <br />
                                        <p>{equipment.notes}</p>
                                    </>
                                }
                            </section>
                            <section className="mb-12">
                                <h2 className="font-medium underline mb-2">Specifications</h2>
                                <p>Model: {equipment.model}</p>
                                <p>Make: {equipment.make}</p>
                                <p>CNC: {equipment["is_cnc"] ? "Yes" : "No"}</p>
                                {typeof equipment["equipment_model_specific_specs"] === "object" && equipment["equipment_model_specific_specs"] && Object.entries(equipment["equipment_model_specific_specs"]).map(([key, value], index) => typeof value === "string" && <p key={index}>{labels[key as keyof typeof labels] || key}: {value}</p>)}
                            </section>
                        </section>
                    </div>
                </> :
                <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default EquipmentDetail;
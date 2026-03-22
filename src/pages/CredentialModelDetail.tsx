import { Link, useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Loading from "./Loading";
import type { CredentialModel, EquipmentLink, SkillTreeContext } from "../types/types";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useCredentialModelDetailData = () => {
    const { id } = useParams();
    const [unlockedEquipment, setUnlockedEquipment] = useState<EquipmentLink[]>([]);
    const [credentialModel, setCredentialModel] = useState<CredentialModel | null>(null);
    const [loading, setLoading] = useState(true);
    const { selectedMakerspace, prereqMap } = useOutletContext<SkillTreeContext>();

    useEffect(() => {
        const credentialModelQuery = supabase.from('credential_models').select().eq('credential_model_id', id!).maybeSingle();
        const unlockedEquipmentQuery = supabase.from('equipment').select('equipment_id, equipment_name').eq('credential_model_id', id!);

        const fetchCredentialModelDetailData = async () => {
            try {
                const [
                    { data: credModelData, error: credModelError },
                    { data: unlockEqData, error: unlockEqError }
                ] = await Promise.all([credentialModelQuery, unlockedEquipmentQuery]);

                if (credModelError) {
                    throw new Error(credModelError.message);
                }
                if (unlockEqError) {
                    throw new Error(unlockEqError.message);
                }

                setCredentialModel(credModelData);
                setUnlockedEquipment(unlockEqData);
            }
            catch (e) {
                console.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchCredentialModelDetailData();
    }, [id]);

    return { credentialModel, unlockedEquipment, selectedMakerspace, prereqMap, loading };
};

function CredentialModelDetail() {
    const { credentialModel, unlockedEquipment, selectedMakerspace, prereqMap, loading } = useCredentialModelDetailData();

    return (
        <>
            {
                loading ? <div className="h-[80vh]"><Loading /></div> :
                credentialModel ?
                <div className="relative w-full h-full">
                    <Link to="/dashboard/trainings" className="absolute top-5 left-5 text-[#fff]">
                        <ArrowBackIosIcon />
                    </Link>
                    <div className="h-[40vh] bg-arb-blue py-16 pl-24 pr-32 text-[#fff]">
                        <div className="flex justify-between items-center mb-3">
                            <h1 className="text-4xl font-semibold">{credentialModel["credential_model_name"]}</h1>
                            <div>
                                <h3 className="text-2xl font-semibold">Prerequisites:</h3>
                                {
                                    prereqMap?.[credentialModel["credential_model_id"]]?.prerequisite_models ?
                                    <>
                                        {
                                            prereqMap[credentialModel["credential_model_id"]].prerequisite_models.map((prereqModel) =>
                                                <Link to={`/dashboard/trainings/training-detail/${prereqModel["credential_model_id"]}`} className="flex justify-center items-center gap-1 text-xl" key={prereqModel["credential_model_id"]}>
                                                    <p>{prereqModel["credential_model_name"]}</p>
                                                    <ArrowForwardIcon />
                                                </Link>
                                            )
                                        }
                                    </>:
                                    <p className="text-xl">None</p>
                                }
                            </div>
                        </div>
                        <Link to={`/makerspace-detail/${selectedMakerspace["makerspace_id"]}`} className="text-2xl font-semibold flex justify-center items-center gap-1 w-fit">
                            <h3>{selectedMakerspace["makerspace_name"]}</h3>
                            <ArrowForwardIcon />
                        </Link>
                        <h4 className="text-xl">{selectedMakerspace.building}</h4>
                        <p className="text-lg font-light">{selectedMakerspace.rooms?.map((room, index) => <span key={room}>{room}{index < selectedMakerspace.rooms!.length - 1 && ', '}</span>)}</p>
                    </div>
                    <div className="py-16 pl-24 pr-32 flex justify-center gap-20">
                        <section className="flex-2">
                            <h3 className="text-xl text-navy-blue font-semibold">Description:</h3>
                            <p className="text-xl">{credentialModel.description}</p>
                        </section>
                        <section className="flex-1">
                            <h3 className="text-xl text-navy-blue font-semibold">Equipment Unlocked:</h3>
                            {
                                unlockedEquipment.map(
                                    (equipment) =>
                                    <Link to={`/equipment-detail/${equipment["equipment_id"]}`} key={equipment["equipment_id"]} className="text-xl flex justify-center items-center w-fit my-2 gap-1">
                                        <p className="font-medium">{equipment["equipment_name"]}</p>
                                        <ArrowForwardIcon />
                                    </Link>
                                )
                            }
                        </section>
                    </div>
                </div> :
                <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default CredentialModelDetail;
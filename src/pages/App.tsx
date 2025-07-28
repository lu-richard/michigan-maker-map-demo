import styles from '../styles/app.module.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';

// // Custom, reusable hook for fetching all data from Supabase necessary for UI
// const useAllData = () => {
//   const [makerspaces, setMakerspaces] = useState<MakerspacesById>({});
//   const [equipment, setEquipment] = useState<EquipmentById>({});
//   const [equipmentModels, setEquipmentModels] = useState<EquipmentModelById>({});
//   const [loading, setLoading] = useState(true);

//   // Helper function for fetching makerspace rows
//   const fetchMakerspaces = async (): Promise<Makerspace[]> => {
//     const { data, error } = await supabase.from('makerspaces').select();

//     if (error) {
//       throw Error("Failed to fetch makerspace data");
//     }

//     return data;
//   };

//   // Helper function for fetching equipment rows
//   const fetchEquipment = async (): Promise<Equipment[]> => {
//     const { data, error } = await supabase.from('equipment').select();

//     if (error) {
//       throw Error("Failed to fetch equipment data");
//     }

//     return data;
//   };

//   const fetchEquipmentModels = async(): Promise<EquipmentModel[]> => {
//     const { data, error } = await supabase.from('equipment_models').select();

//     if (error) {
//       throw Error("Failed to fetch equipment model data");
//     }

//     return data;
//   };

//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         const [makerspaceData, equipmentData, equipmentModelData] = await Promise.all([fetchMakerspaces(), fetchEquipment(), fetchEquipmentModels()]);

//         let makerspacesObj: MakerspacesById = {};
//         let equipmentObj: EquipmentById = {};
//         let equipmentModelObj: EquipmentModelById = {};

//         makerspaceData.forEach((makerspace) => makerspacesObj[makerspace["makerspace_id"]] = makerspace);
//         equipmentData.forEach((eq) => equipmentObj[eq["equipment_id"]] = eq);
//         equipmentModelData.forEach((eqModel) => equipmentModelObj[eqModel["equipment_model_id"]] = eqModel);

//         setMakerspaces(makerspacesObj);
//         setEquipment(equipmentObj);
//         setEquipmentModels(equipmentModelObj);
//       }
//       catch (e) {
//         console.error(e);
//       }
//       finally {
//         setLoading(false);
//       }
//     };

//     fetchAllPosts();
//   }, []);

//   return { makerspaces, equipment, equipmentModels, loading };
// };

function App() {
  const [session, setSession] = useState<Session | null>(null);
  // const { makerspaces, equipment, equipmentModels, loading } = useAllData();
  // const outletContext = { session, setSession, makerspaces, equipment, equipmentModels };

  return (
    <>
      <div>
        <Navbar />
        {/* Any child or granchild component rendered by this Outlet will have access to the outletContext object through the useOutletContext() hook */}
        <Outlet />
      </div>
    </>
  )
}

export default App;

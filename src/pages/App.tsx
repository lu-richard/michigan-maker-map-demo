import styles from '../styles/app.module.css';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type { Makerspace, Equipment } from '../types/types';
import Loading from './Loading';

// Custom, reusable hook for fetching all data from Supabase necessary for UI
const useAllData = () => {
  const [makerspaces, setMakerspaces] = useState<Makerspace[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function for fetching makerspace rows
  const fetchMakerspaces = async (): Promise<Makerspace[]> => {
    const { data, error } = await supabase.from('makerspaces').select();

    if (error) {
      throw Error("Failed to fetch makerspace data");
    }

    return data;
  };

  // Helper function for fetching equipment rows
  const fetchEquipment = async (): Promise<Equipment[]> => {
    const { data, error } = await supabase.from('equipment').select();

    if (error) {
      throw Error("Failed to fetch equipment data");
    }

    return data;
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const [makerspaceData, equipmentData] = await Promise.all([fetchMakerspaces(), fetchEquipment()]);
        
        setMakerspaces(makerspaceData);
        setEquipment(equipmentData);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  return { makerspaces, equipment, loading };
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const { makerspaces, equipment, loading } = useAllData();
  const outletContext = { session, setSession, makerspaces, equipment };

  return (
    <>
      {
        loading ? <Loading /> :
        <>
          <p>This is the main page</p>
          {/* Any child or granchild component rendered by this Outlet will have access to the outletContext object through the useOutletContext() hook */}
          <Outlet context={outletContext} />
        </>
      }
    </>
  )
}

export default App;

import styles from '../styles/catalog.module.css';
import { useState, useEffect } from 'react';
import type { EquipmentCardData } from '../types/types';
// import { useOutletContext } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';
import supabase from '../lib/supabase';
import Loading from './Loading';

const useEquipmentCatalogData = () => {
  const [equipmentCards, setEquipmentCards] = useState<EquipmentCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipmentCards = async () => {
      try {
        const { data, error } = await supabase.from('view_equipment_cards').select();

        if (error) {
            throw new Error("Failed to fetch equipment cards");
        }

        setEquipmentCards(data);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    };

    fetchEquipmentCards();
  }, []);

  return { equipmentCards, loading };
};

function EquipmentCatalog() {
    const [searchValue, setSearchValue] = useState("");
    const { equipmentCards, loading } = useEquipmentCatalogData();

    return (
        <>
            {
                loading ? <Loading /> :
                <div className={styles.container}>
                    <h1 className={styles["main-heading"]}>U-M Equipment</h1>
                    <input type="text" value={searchValue} placeholder="Search equipment by model, make, type, function, material, or  other specifications" className={styles["search-bar"]} onChange={(e) => setSearchValue(e.target.value)} />
                    <div className={styles["equipment-grid"]}>
                        {equipmentCards.map((equipmentCard) => <EquipmentCard key={equipmentCard["equipment_id"]} equipmentCard={equipmentCard} />)}
                    </div>
                </div>
            }
        </>
    );
}

export default EquipmentCatalog;
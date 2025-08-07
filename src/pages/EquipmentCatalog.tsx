import styles from '../styles/catalog.module.css';
import { useState, useEffect } from 'react';
import type { EquipmentCardData } from '../types/types';
// import { useOutletContext } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';
import supabase from '../lib/supabase';
import Loading from './Loading';
import SearchIcon from '@mui/icons-material/Search';

const useEquipmentCatalogData = () => {
  const [equipmentCards, setEquipmentCards] = useState<EquipmentCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchValue(searchValue), 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    const fetchEquipmentCards = async () => {
      try {
        setLoading(true);
        
        let query = supabase.schema('private').from('view_equipment_cards').select();

        if (debouncedSearchValue !== "") {
          query = query.textSearch('fts', debouncedSearchValue, {
            type: 'websearch',
            config: 'english',
          });
        }

        const { data, error } = await query;

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
  }, [debouncedSearchValue]);

  return { searchValue, setSearchValue, equipmentCards, loading };
};

function EquipmentCatalog() {
    const { searchValue, setSearchValue, equipmentCards, loading } = useEquipmentCatalogData();

    return (
        <>
            {
                loading ? <Loading /> :
                <div className={styles.container}>
                    <div className={styles["top-bar"]}>
                      <h1 className={styles["main-heading"]}>U-M Equipment</h1>
                      <div className={styles["search-bar"]}>
                        <div className={styles["search-icon"]}><SearchIcon /></div>
                        <input type="text" value={searchValue} placeholder="Search equipment by model, make, type, function, material, or location" className={styles["text-field"]} onChange={(e) => setSearchValue(e.target.value)} />
                      </div>
                    </div>
                    {
                      equipmentCards.length > 0 ?
                      <div className={styles["equipment-grid"]}>
                        {equipmentCards.map((equipmentCard) => <EquipmentCard key={equipmentCard["equipment_id"]} equipmentCard={equipmentCard} />)}
                      </div> :
                      <p className={styles["no-results-message"]}>No results found.</p>
                    }
                </div>
            }
        </>
    );
}

export default EquipmentCatalog;
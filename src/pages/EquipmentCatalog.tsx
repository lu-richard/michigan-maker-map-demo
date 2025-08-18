import styles from '../styles/catalog.module.css';
import { useState, useEffect } from 'react';
import type { EquipmentCardData } from '../types/types';
import EquipmentCard from '../components/EquipmentCard';
import supabase from '../lib/supabase';
import Loading from './Loading';
import SearchIcon from '@mui/icons-material/Search';

// Reusable hook for fetching equipment catalog data: equipment cards based on search value, limit, and order
const useEquipmentCatalogData = () => {
  const [equipmentCards, setEquipmentCards] = useState<EquipmentCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [searchLimit, setSearchLimit] = useState(20);
  const [isDescending, setIsDescending] = useState(false);
  const [isOrderedByModelName, setIsOrderedByModelName] = useState(false);

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

        const { data, error } = await query.order(isOrderedByModelName ? 'equipment_model_name' : 'equipment_type', { ascending: !isDescending }).limit(searchLimit);

        if (error) {
            throw new Error(`${error}`);
        }

        setEquipmentCards(data);
      }
      catch (e) {
        console.error(e);
        setErrorMessage("An error occurred. Please refresh this page.");
      }
      finally {
        setLoading(false);
      }
    };

    fetchEquipmentCards();
  }, [debouncedSearchValue, searchLimit, isDescending, isOrderedByModelName]);

  return { searchValue, setSearchValue, searchLimit, setSearchLimit, isDescending, setIsDescending, isOrderedByModelName, setIsOrderedByModelName, equipmentCards, loading, errorMessage };
};

function EquipmentCatalog() {
    const { searchValue, setSearchValue, searchLimit, setSearchLimit, isDescending, setIsDescending, isOrderedByModelName, setIsOrderedByModelName, equipmentCards, loading, errorMessage } = useEquipmentCatalogData();

    return (
        <>
            {
                loading ? <Loading /> :
                errorMessage ? <p className={styles["error-message"]}>{errorMessage}</p> :
                <div className={styles.container}>
                    <div className={styles["side-bar"]}>
                      <h3 className={styles["side-bar-heading"]}>Filters</h3>
                      <label className={styles.filter}>
                        <input type="checkbox" checked={isDescending} className={styles.checkbox} onChange={() => setIsDescending((isDescending) => !isDescending)} />
                        Reverse Alphabetical
                      </label>
                      <label className={styles.filter}>
                        <input type="checkbox" checked={isOrderedByModelName} className={styles.checkbox} onChange={() => setIsOrderedByModelName((isOrderedByModelName) => !isOrderedByModelName)} />
                        Model Name
                      </label>
                    </div>
                    <div className={styles["top-bar"]}>
                      <h1 className={styles["main-heading"]}>U-M Equipment</h1>
                      <div className={styles["search-bar"]}>
                        <div className={styles["search-icon"]}><SearchIcon /></div>
                        <input type="text" value={searchValue} placeholder="Search equipment by model, make, type, function, material, or location" className={styles["text-field"]} onChange={(e) => setSearchValue(e.target.value)} />
                      </div>
                    </div>
                    {
                      equipmentCards.length > 0 ?
                      <>
                        <div className={styles["equipment-grid"]}>
                          {equipmentCards.map((equipmentCard) => <EquipmentCard key={equipmentCard["equipment_id"]} equipmentCard={equipmentCard} />)}
                        </div>
                        <p className={styles["num-results"]}>Results 1-{equipmentCards.length}</p>
                        {
                          equipmentCards.length == searchLimit &&
                          <button type="button" className={styles["more-results-button"]} onClick={() => setSearchLimit((searchLimit) => searchLimit + 20)}>See More</button>
                        }
                      </> :
                      <p className={styles["no-results-message"]}>No results found.</p>
                    }
                </div>
            }
        </>
    );
}

export default EquipmentCatalog;
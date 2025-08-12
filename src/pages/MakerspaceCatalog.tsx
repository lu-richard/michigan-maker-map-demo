// import { useOutletContext } from "react-router-dom";
import type { MakerspaceCardData } from "../types/types";
import MakerspaceCard from "../components/MakerspaceCard";
import styles from '../styles/catalog.module.css';
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Loading from "./Loading";
import SearchIcon from '@mui/icons-material/Search';

// Reusable hook for fetching makerspace catalog data: makerspace cards based on search value, limit, and order
const useMakerspaceCatalogData = () => {
  const [makerspaceCards, setMakerspaceCards] = useState<MakerspaceCardData[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [searchLimit, setSearchLimit] = useState(9);
  const [isDescending, setIsDescending] = useState(false);
  const [isOrderedByBuilding, setIsOrderedByBuilding] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchValue(searchValue), 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    const fetchMakerspaceCards = async () => {
      try {
        setLoading(true);

        let query = supabase.schema('private').from('view_makerspace_cards').select();

        if (debouncedSearchValue !== "") {
          query = query.textSearch('fts', debouncedSearchValue, {
            type: 'websearch',
            config: 'english',
          });
        }

        const { data, error } = await query.order(isOrderedByBuilding ? 'building' : 'makerspace_name', { ascending: !isDescending}).limit(searchLimit);

        if (error) {
            throw new Error("Failed to fetch makerspace cards");
        }

        setMakerspaceCards(data);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    };

    fetchMakerspaceCards();
  }, [debouncedSearchValue, searchLimit, isDescending, isOrderedByBuilding]);

  return { searchValue, setSearchValue, searchLimit, setSearchLimit, isDescending, setIsDescending, isOrderedByBuilding, setIsOrderedByBuilding, makerspaceCards, loading };
};

function MakerspaceCatalog() {
    const { searchValue, setSearchValue, searchLimit, setSearchLimit, isDescending, setIsDescending, isOrderedByBuilding, setIsOrderedByBuilding, makerspaceCards, loading } = useMakerspaceCatalogData();

    return (
        <>
            {
                loading ? <Loading /> :
                <div className={styles.container}>
                    <div className={styles["side-bar"]}>
                      <h3 className={styles["side-bar-heading"]}>Filters</h3>
                      <label className={styles.filter}>
                        <input type="checkbox" checked={isDescending} className={styles.checkbox} onChange={() => setIsDescending((isDescending) => !isDescending)} />
                        Reverse Alphabetical
                      </label>
                      <label className={styles.filter}>
                        <input type="checkbox" checked={isOrderedByBuilding} className={styles.checkbox} onChange={() => setIsOrderedByBuilding((isOrderedByBuilding) => !isOrderedByBuilding)} />
                        Building
                      </label>
                    </div>
                    <div className={styles["top-bar"]}>
                      <h1 className={styles["main-heading"]}>U-M Makerspaces</h1>
                      <div className={styles["search-bar"]}>
                        <div className={styles["search-icon"]}><SearchIcon /></div>
                        <input type="text" value={searchValue} placeholder="Search makerspaces by name, description, location, equipment, or theme" className={styles["text-field"]} onChange={(e) => setSearchValue(e.target.value)} />
                      </div>
                    </div>
                    {
                      makerspaceCards.length > 0 ?
                      <>
                        <div className={styles["makerspace-grid"]}>
                          {makerspaceCards.map((makerspaceCard) => <MakerspaceCard key={makerspaceCard["makerspace_id"]} makerspaceCard={makerspaceCard} /> )}
                        </div>
                        <p className={styles["num-results"]}>Results 1-{makerspaceCards.length}</p>
                        {
                          makerspaceCards.length === searchLimit &&
                          <button type="button" className={styles["more-results-button"]} onClick={() => setSearchLimit((searchLimit) => searchLimit + 9)}>See More</button>
                        }
                      </> :
                      <p className={styles["no-results-message"]}>No results found.</p>
                    }
                </div>
            }
        </>
    );
}

export default MakerspaceCatalog;
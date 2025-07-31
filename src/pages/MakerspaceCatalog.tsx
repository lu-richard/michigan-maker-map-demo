// import { useOutletContext } from "react-router-dom";
import type { MakerspaceCardData } from "../types/types";
import MakerspaceCard from "../components/MakerspaceCard";
import styles from '../styles/catalog.module.css';
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Loading from "./Loading";
import SearchIcon from '@mui/icons-material/Search';

const useMakerspaceCatalogData = () => {
  const [makerspaceCards, setMakerspaceCards] = useState<MakerspaceCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchValue(searchValue), 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    const fetchMakerspaceCards = async () => {
      try {
        setLoading(true);

        let query = supabase.from('makerspaces').select('makerspace_id, makerspace_name, cover_image, building, rooms, description');

        if (debouncedSearchValue !== "") {
          query = query.textSearch('makerspace_name', debouncedSearchValue, {
            type: 'websearch',
            config: 'english',
          });
        }

        const { data, error } = await query;

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
  }, [debouncedSearchValue]);

  return { searchValue, setSearchValue, makerspaceCards, loading };
};

function MakerspaceCatalog() {
    const { searchValue, setSearchValue, makerspaceCards, loading } = useMakerspaceCatalogData();

    return (
        <>
            {
                loading ? <Loading /> :
                <div className={styles.container}>
                    <h1 className={styles["main-heading"]}>U-M Makerspaces</h1>
                    <div className={styles["search-bar"]}>
                      <div className={styles["search-icon"]}><SearchIcon /></div>
                      <input type="text" value={searchValue} placeholder="Search makerspaces by name, description, location, equipment, theme, or audience" className={styles["text-field"]} onChange={(e) => setSearchValue(e.target.value)} />
                    </div>
                    <div className={styles["makerspace-grid"]}>
                        {makerspaceCards.map((makerspaceCard) => <MakerspaceCard key={makerspaceCard["makerspace_id"]} makerspaceCard={makerspaceCard} /> )}
                    </div>
                </div>
            }
        </>
    );
}

export default MakerspaceCatalog;
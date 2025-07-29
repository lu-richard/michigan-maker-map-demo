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

  useEffect(() => {
    const fetchMakerspaceCards = async () => {
      try {
        const { data, error } = await supabase.from('makerspaces').select('makerspace_id, makerspace_name, cover_image, building, rooms, description');

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
  }, []);

  return { makerspaceCards, loading };
};

function MakerspaceCatalog() {
    const [searchValue, setSearchValue] = useState("");
    const { makerspaceCards, loading } = useMakerspaceCatalogData();
    // const { makerspaces }: OutletContext = useOutletContext();

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
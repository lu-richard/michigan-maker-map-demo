import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../types/types";

function MakerspaceCatalog() {
    const { makerspaces }: OutletContext = useOutletContext();

    return (
        <>
            <p>This is the makerspace catalog</p>
        </>
    );
}

export default MakerspaceCatalog;
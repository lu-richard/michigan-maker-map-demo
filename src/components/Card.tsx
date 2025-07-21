import type { Makerspace } from "../types/types";
import styles from '../styles/card.module.css';

interface CardProps {
    makerspace: Makerspace;
};

function Card({ makerspace }: CardProps) {
    return (
        <div className={styles.card}>
            <h1>{makerspace["makerspace_name"]}</h1>
        </div>
    );
}

export default Card;
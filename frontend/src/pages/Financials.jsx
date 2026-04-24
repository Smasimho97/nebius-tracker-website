import FinancialsHeader from "../components/Header/FinancialsHeader/FinancialsHeader.jsx";
import Placeholder from "../components/Placeholder/Placeholder.jsx";
import Ratings from "../components/Financials/Ratings.jsx";
import styles from "./Financials.module.css";

export default function Financials() {

    

    return (
        <div className={styles.financialsPage}>
            <Placeholder/>
            <FinancialsHeader/>
            <div className={styles.financialsContainer}>
                <Ratings/>
            </div>
        </div>
    );
}
import styles from "./Progress.module.scss"
import {motion} from "framer-motion"

export default function Progress() {
    return (
        <div className={styles.progress}>
            <motion.div
                className={styles.progressBar}
                initial={{width: "0%"}}
                animate={{width: "100%"}}
                transition={{duration: 5, ease: "linear"}}
            />
        </div>
    );
}

import "./Notification.css"
import {motion} from "framer-motion"
import Progress from "../Progress/Progress";

export default function Notification() {

    return (
        <motion.div
            className="notification"
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: 300, opacity: 0}}
            transition={{
                duration: 0.4,
                ease: "easeOut"
            }}
        >
            <p>La recette a été ajoutée avec succès.</p>
            <Progress/>
        </motion.div>
    )
}

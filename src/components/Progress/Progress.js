import "./Progress.css"
import {motion} from "framer-motion"

export default function Progress() {

    return (
        <div
            className="progress"
        >
            <motion.div
                className="progress-bar"
                initial={{width: "0%"}}
                animate={{width: "100%"}}
                transition={{duration: 5, ease: "linear"}}
            />
        </div>
    )
}

import {type ButtonHTMLAttributes, type ReactNode} from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function Button({children, ...props}: ButtonProps) {
    return (
        <button className={styles.button} {...props}>{children}</button>
    );
}

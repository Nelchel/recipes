import {type ButtonHTMLAttributes, type ReactNode} from "react";
import {Link} from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    to?: string;
}

export default function Button({children, to, ...props}: ButtonProps) {
    if (to) {
        return <Link to={to} className={styles.button}>{children}</Link>;
    }
    return (
        <button className={styles.button} {...props}>{children}</button>
    );
}

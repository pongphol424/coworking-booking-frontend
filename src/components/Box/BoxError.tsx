import styles from "./BoxError.module.css"

interface BoxErrorProps{
    error?: string;
}


export function BoxEror({error}:BoxErrorProps){
    const className = error ? `${styles.box} ${styles.active}` : styles.box
    return  <div className={className}>{error}</div>
}
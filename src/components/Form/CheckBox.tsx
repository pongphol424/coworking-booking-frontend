import styles from './CheckBox.module.css'


interface CheckBoxProps {
    name: string
    label: string
    checkList: {
        id: number;
        name: string;
    }[]
}



export function CheckBox({ label, checkList, name }: CheckBoxProps) {

    return (
        <div className={styles.header}>{label}
            <div className={styles.box}>
                {checkList.map((item) =>
                    <label key={item.id}>
                        <input
                            className={styles.checkBox}
                            name={name}
                            value={item.id}
                            type="checkbox" />
                            {` ${item.name}`}
                    </label>
                )}
            </div>
        </div>
    )
}
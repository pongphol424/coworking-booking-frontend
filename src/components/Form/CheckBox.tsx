import styles from './CheckBox.module.css'


interface CheckBoxProps {
    name: string
    label: string
    checkList: {
        id: number;
        name: string;
    }[]
    checkedIds?: number[]
}



export function CheckBox({ label, checkList, name, checkedIds }: CheckBoxProps) {
    return (
        <div className={styles.box}>
            <div className={styles.header}>{label}</div>
            <div className={styles.item}>
                {checkList.map((item) =>
                    <label className={styles.itemLabel} key={item.id}>
                            <input
                                key={`${item.id}-${checkedIds?.includes(item.id)}`}
                                className = {styles.checkBox}
                                name = {name}
                                value = {item.id}
                                defaultChecked = {checkedIds?.includes(item.id)}
                                type="checkbox" />
                        {` ${item.name}`}
                    </label>
                )}
            </div>
        </div>
    )
}
interface Time {
    id: string
    name: string
}

export const Time: Time[] = []

for( let i = 0 ; i < 15 ; i++){
    const time: Time = {
        id: `${String(i+8).padStart(2,"0")}`,
        name: `${String(i+8).padStart(2,"0")}:00`
    }
    Time.push(time)
}
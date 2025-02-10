import { useEffect, useState } from "react"

export default function (props) {
    const [renderHabitInformation,setRenderHabitInformation] = useState(false)

    const [strikeToDo,setStrikeToDo] = useState(false)

    const [daysRemaining, setDaysRemaining] = useState(props.initialdays ? props.days-props.initialdays : props.days)

    const [currentStreak, setCurrentStreak] = useState(0)

    const [lastRecordedDate, setLastRecordedDate] = useState(null)
    const [completed, setCompleted] = useState(false)


    useEffect(()=>{
        if(daysRemaining == 0){
            setCompleted(true)
        }
    },[TodoCalled])

    function UpdateStreak(){
        let today = new Date()
        if(lastRecordedDate && lastRecordedDate.toDateString() != today.toDateString()){
            setStrikeToDo(false)
        }

        if(lastRecordedDate){
            const differenceOfTime = today.getTime()-lastRecordedDate.getTime()
            const diffDates = differenceOfTime/(86400*1000)
            if(diffDates > 1){
                setCurrentStreak(0)
            }
            else if(diffDates == 1){
                setCurrentStreak((prev) => prev+1)
            }
        }
        else{
            setCurrentStreak(0)
        }
    }

    function TodoCalled(){
        if(!strikeToDo){
            const today = new Date()
            setStrikeToDo(true)
            setDaysRemaining((prev) => prev-1)
            setLastRecordedDate(today)
            setCurrentStreak((prev) =>prev+1)
        }
        else{
            alert("Already registered Today's Activity")
        }
    }
    
    return (
        <>
            {completed ? 
            <>
                <div className="habit">
                    <div className="habit-progress">
                        <h1>{props.habit}</h1>
                    </div>
                    <button id="DropdownBtn" onClick={() => {
                        setRenderHabitInformation((prev)=>!prev)
                    }}>Show/Hide Progress</button>
                </div>

                <div className={`HabitInformation ${renderHabitInformation ? "active":""}`}>

                    <div className="Flex">
                        <h5>Progress: </h5>
                        <progress value={1}/>
                        <p>100%</p>
                    </div>
                    <h3>Final streak: {currentStreak}</h3>
                    <p>Completed Task: {props.Todo}</p>

                </div>
            </>
            
            :
                <>
                    <div className="habit">
                        <div className="habit-progress">
                            <h1>{props.habit}</h1>
                        </div>

                        <button id="DropdownBtn" onClick={() => {
                            UpdateStreak()
                            setRenderHabitInformation((prev)=>!prev)
                        }}>Show/Hide Progress</button>

                    </div>

                    <div className={`HabitInformation ${renderHabitInformation ? "active":""}`}>
                    
                        <div className="Flex">
                            <h5>Progress: </h5>
                            <progress value={1-((daysRemaining)/props.days)}/>
                            <p>{Math.floor((1-((daysRemaining)/props.days))*100)}%</p>
                        </div>
                            
                        <h3>Current streak: {currentStreak}</h3>
                        <p>Number of days left: {daysRemaining}</p>

                        <div className="Flex">
                            <input type="checkbox" id="checkbox-todo" onClick={() => TodoCalled()} />
                            {!strikeToDo ? <p>To Do: {props.Todo} </p> : <s>To Do: {props.Todo}</s>}
                        </div>
                    </div>
                </>
            }
                       
        </>
    )
}
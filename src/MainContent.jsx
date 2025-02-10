import Habits from "./Habits"
import { useState } from "react"
// MainContent function which will get exported to app
export default function () {


    // state "variables" to re-render the page
    const [listHabits,setListHabits] = useState([])
    const [renderHabitForm,setRenderHabitForm] = useState(false)

    // eventlistener of form to make a new habit container for the added habit
    function Make_new_habit(Event){
        Event.preventDefault()
        const formdata = new FormData(Event.currentTarget)
        const HabitName = formdata.get("HabitName")
        if (!HabitName){
            alert("Please enter A Habit name")
            setRenderHabitForm(false)
        }

        else {
            const Processdays = Number(formdata.get("ProcessDays"))
            if (isNaN(Processdays) || Processdays < 1) {
                alert("Please enter a valid number of days (Positive Integer) you want to continue habit.")
                setRenderHabitForm(false)
            } else {
                const Initdays = Number(formdata.get("InitDays"))
                if (!isNaN(Initdays) && Initdays < 0) {
                    alert("Please enter a valid non-negative number or leave the field blank.")
                    setRenderHabitForm(false)
                } else if (!isNaN(Initdays) && Initdays >= Processdays) {
                    alert("Please enter a number less than the total number of days.")
                    setRenderHabitForm(false)
                }
                else {
                    let Activity = formdata.get("ToDo")
                    if (!Activity){Activity=HabitName}
                    setListHabits([...listHabits,{habit:HabitName,days:Processdays,initialdays:Initdays,Todo:Activity}])

                    Event.currentTarget.reset()
                    setRenderHabitForm(false)
                }
            }
        }
            
    }

    // a button container to make new habit form render 
    function AddHabits () {
        return (
            <div className="habit" id="add_habit">
                <button onClick = {() => {
                    setRenderHabitForm((prev) => !prev)
                    }}>
                    +
                </button>
            </div>
        )
    }

    return (
        <div className="Main-Container">
            <h3>Your Habits</h3>
            {listHabits.map((elements)=>{
                return(
                    <Habits {...elements} />
                )
            })}

            <form className={`HabitForm ${renderHabitForm ? "active":""}`} onSubmit={Make_new_habit}>
                <ul id="Form-inputs">
                    <li className="formListItem"><p>Enter New Habit:</p><input type="text" placeholder="e.g: Jogging" name="HabitName"></input></li>
                    <li className="formListItem"><p>Enter the number of days to finish:</p><input type="integer" placeholder="e.g: 20" name="ProcessDays"></input></li>
                    <li className="formListItem"><p>Enter number if already started the habit before:</p><input type="text" placeholder="e.g: 3(leave blank if not started)" name="InitDays"></input></li>
                    <li className="formListItem"><p>Enter The Activity u want to Record: </p><input type="text" placeholder="e.g: Jog 2 km" name="ToDo"></input></li>
                </ul>
                <button id="submit-form">Submit</button>  
            </form>

            <AddHabits />
        </div>
    )
}
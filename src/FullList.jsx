import { useState, useEffect, useRef } from "react"
import List from "./components/List";

// -------- basically the listApp
export function FullList() {
    const [list, setList] =  useState(() => {
        const savedList = localStorage.getItem('UndoneTasks');
        return savedList ? JSON.parse(savedList) : []
    });

    const [newTask, setNewTask] = useState('');

    // save to localStorage whenever list changes
    useEffect(() => {
        localStorage.setItem('UndoneTasks', JSON.stringify(list));
    }, [list]);

    //task input section toggle
    const [showAddTask, setShowAddTask] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (showAddTask && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showAddTask]);



    // -------list functions
    function deleteTask(id) {
        setList(list.filter(l => l.id !== id));
    }
    function addNewTask(e) {
        e.preventDefault();
        if (newTask.trim() === '') return;
        setList([...list, {item: newTask, id:crypto.randomUUID(), completed: false}]);
        setNewTask('')
        setShowAddTask(false)
    }
    function toggleCompleted(id) {
        setList(list.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        ))
    }
    function clearCompletedTasks() {
        setList(list.filter((task) => {return !task.completed}))
    }



    // -------- Pre calculations
    const undoneTasks = list.filter((task) => !task.completed);
    const completedTasks = list.filter((task) => task.completed);



    // --------renders
    return (
        <div className="p-2 flex flex-col">
            {/* Uncompleted tasks section */}
            <h1 className="font-extralight text-xl">
                Curent Tasks ({undoneTasks.length})
            </h1>
            <List
                list={undoneTasks}
                onToggle={toggleCompleted}
                onDelete={deleteTask}
            />


            {/* New Task Form */}
            {showAddTask && (
                <form
                className="flex gap-2 border border-gray-500 py-2 px-3 rounded"
                onSubmit={addNewTask}>
                    <input
                        ref={inputRef}
                        className="flex-1 font-light outline-none border-b border-gray-400"
                        type="text"
                        placeholder="Add New Task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />

                    <button
                    className="text-white bg-purple-500 py-1 px-2 rounded"
                    type="submit">
                        Add Task
                    </button>
                </form>
            )}

            {/* New task button */}
            <div>
                <button
                    className="bg-purple-500 text-white px-2 py-1 mt-2 rounded"
                    onClick={() => setShowAddTask(prev => !prev)}>
                    {!showAddTask && (
                        <span>Add New Task</span>
                    )}
                    {showAddTask && (
                        <span>Cancel</span>
                    )}
                </button>
            </div>



            {/* Completed tasks section */}
            {completedTasks.length > 0 && (
            
                <div className="mt-4">
                    <h1 className="font-extralight text-xl">
                        Completed Tasks {"(" + completedTasks.length + ")"}
                    </h1>
                    <List
                        list={completedTasks}
                        onToggle={toggleCompleted}
                        onDelete={deleteTask}
                    />

                    <button
                        onClick={clearCompletedTasks}
                        className="bg-purple-500 py-1 px-2 text-white w-fit rounded mt-2">
                        Clear Completed Tasks
                    </button>
                </div>
            )}

        </div>
    )
}

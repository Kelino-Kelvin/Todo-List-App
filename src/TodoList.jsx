import { useState, useEffect } from "react"
import closeIcon from './assets/closeIcon.svg'

// stateless Item
function ListItem( {itemId, todoItem, onDelete }) {
    return(
        <li
            key={itemId}
            className="p-1.5 px-4 flex gap-2 items-center bg-neutral-300 my-1">
            <span className="flex-1">
                {todoItem}
            </span>
            <button
                onClick={() => onDelete(itemId)}
                className="bg-red-500 text-white h-8 w-8 flex items-center justify-center rounded-full">
                <img src={closeIcon} alt="close" />
            </button>
        </li>
    )
}

// stateless list holder
function List({ list, onDelete }) {
    if (!list || list.length === 0) {
        return <p className="text-2xl font-extralight">No Tasks Added</p>
    } else {
        return (
            <ul>
                {list.map((itemOnlIst) => {
                    return <ListItem
                            key={itemOnlIst.id}
                            itemId={itemOnlIst.id}
                            todoItem={itemOnlIst.item}
                            onDelete={onDelete}
                        />
                })}
            </ul>
        )
    }
}

// basically the listApp
export function FullList() {
    const [list, setList] =  useState(() => {
        const savedList = localStorage.getItem('todoList');
        return savedList ? JSON.parse(savedList) : []
    });

    const [newTask, setNewTask] = useState('');

    // save to localStorage whenever list changes
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list));
    }, [list]);

    // Add task input section toggle
    const [showAddTask, setShowAddTask] = useState(false);


    // list functions
    function deleteTask(id) {
        setList(list.filter(l => l.id !== id));
    }
    function addNewTask(e) {
        e.preventDefault();
        if (newTask.trim() === '') return;
        setList([...list, {item: newTask, id:crypto.randomUUID()}]);
        setNewTask('')
        setShowAddTask(false)
    }


    // renders
    return (
        <div className="p-2 flex flex-col">
            <List list={list} onDelete={deleteTask} />

            {showAddTask && (
                <form
                className="flex px-1 gap-2"
                onSubmit={addNewTask}>
                    <input
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
        </div>
    )
}

import ListItem from "./ListItem"

// ------ stateless list holder
export default function List({ list, onDelete, onToggle }) {
    if (!list || list.length === 0) {
        return <p className="text-2xl font-extralight">No Tasks Added</p>
    } else {
        return (
            <div>
                <ul>
                    {list.map((itemOnlIst) => {
                        return <ListItem
                                key={itemOnlIst.id}
                                itemId={itemOnlIst.id}
                                todoItem={itemOnlIst.item}
                                itemIsCompleted={itemOnlIst.completed}
                                onDelete={onDelete}
                                onToggle={onToggle}
                            />
                    })}
                </ul>
            </div>
        )
    }
}
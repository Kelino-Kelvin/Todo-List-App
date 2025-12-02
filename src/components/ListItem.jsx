import closeIcon from '../assets/closeIcon.svg'
import checkMark from '../assets/check-mark.svg'
import upArrow from '../assets/up-arrow.svg'

// ------- stateless ListItem
export default function ListItem( {itemId, todoItem, itemIsCompleted, onDelete, onToggle }) {
    return(
        <li
            className="p-1.5 px-4 flex gap-2 items-center bg-neutral-300 my-1">
            <span className="flex-1">
                {todoItem}
            </span>

            {!itemIsCompleted ? (
                <button
                    onClick={() => onToggle(itemId)}
                    className="item-icon bg-green-500">
                        <span className="hidden md:inline">
                            Mark Complete
                        </span>
                        <img src={checkMark} />
                </button>
            ) : (
                <button
                    onClick={() => onToggle(itemId)}
                    className="item-icon bg-blue-500">
                        <span className="hidden md:inline">
                            Revert
                        </span>
                        <img src={upArrow} />
                </button>
            )}

            {!itemIsCompleted && (
                <button
                    onClick={() => onDelete(itemId)}
                    className="item-icon bg-red-500">
                    <img src={closeIcon} alt="close" />
                </button>
            )}
        </li>
    )
}
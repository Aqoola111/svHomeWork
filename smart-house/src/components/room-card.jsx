import {Link} from "react-router-dom";

export const RoomCard = ({room}) => {
    return (
        <div className='room-card' style={{backgroundColor: room.color}}>
            <Link to={`/room/${room.name}`}>
                <h1>{room.name}</h1>
            </Link>
        </div>
    )
}

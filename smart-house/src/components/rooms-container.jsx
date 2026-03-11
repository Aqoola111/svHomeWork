import React, {useContext} from "react";
import {RoomCard} from "./room-card.jsx";
import {SmartContext} from "./smart-context.jsx";

export const RoomsContainer = () => {
    const {rooms} = useContext(SmartContext)
    return (
        <div className='rooms-container'>
            {rooms.map((room) => (
                <RoomCard key={room.name + room.color} room={room}/>
            ))}
        </div>
    )
}

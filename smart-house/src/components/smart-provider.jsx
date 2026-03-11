import {useEffect, useState} from 'react'
import {SmartContext} from "./smart-context.jsx";
import LZString from 'lz-string';

export const SmartProvider = ({children}) => {
    const [rooms, setRooms] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        const data = params.get('data')
        if (data) {
            try {
                const decompressed = LZString.decompressFromEncodedURIComponent(data)
                if (decompressed) {
                    setTimeout(() => window.history.replaceState({}, '', window.location.pathname), 10);
                    return JSON.parse(decompressed);
                }
            } catch (e) {
                console.error("CRITICAL ERROR: DATA CORRUPTED!", e);
            }
        }
        return []
    })

    const addRoom = (room) => {
        setRooms([...rooms, room])
    }

    const updateRoom = (updatedRoom) => {
        setRooms(rooms.map(r => r.name === updatedRoom.name ? updatedRoom : r))
    }

    const getShareableLink = () => {
        const stringData = JSON.stringify(rooms)
        const compressed = LZString.compressToEncodedURIComponent(stringData)
        return `${window.location.origin}/?data=${compressed}`
    }



    const toggleItem = (itemID, roomName) => {
        console.log(itemID, roomName)
        setRooms(prevRooms =>
            prevRooms.map((room) => {
                if (room.name === roomName) {
                    return {
                        ...room,
                        items: room.items.map((item) => {
                            if (item.id === itemID) {
                                return {...item, on: !item.on};
                            }
                            return item;
                        })
                    };
                }
                return room;
            })
        );

    }

    return (
        <SmartContext.Provider value={{rooms, addRoom, updateRoom, toggleItem, getShareableLink}}>
            {children}
        </SmartContext.Provider>
    );
}


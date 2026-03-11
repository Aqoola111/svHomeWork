import {createContext} from "react";

export const SmartContext = createContext({
    rooms: [],
    addRoom: () => {},
    updateRoom: () => {},
    toggleItem: () => {},
    getShareableLink: () => ""
});
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/home'
import Room from './components/room'
import AddRoomForm from './components/add-room-form'
import {SmartProvider} from "./components/smart-provider.jsx";

function App() {
    return (
        <SmartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/room/:name" element={<Room/>}/>
                    <Route path="/add-room" element={<AddRoomForm/>}/>
                </Routes>
            </BrowserRouter>
        </SmartProvider>
    )
}

export default App

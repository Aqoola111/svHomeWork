import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {SmartContext} from "./smart-context.jsx";
import Swal from 'sweetalert2'

const roomTypes = [
    {value: 'Bedroom', label: 'Bedroom'},
    {value: 'Bathroom', label: 'Bathroom'},
    {value: 'Kitchen', label: 'Kitchen'},
]

function AddRoomForm() {
    const [roomType, setRoomType] = useState('Bedroom');
    const {addRoom} = useContext(SmartContext)
    const nav = useNavigate()

    const handleChange = (e) => {
        setRoomType(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const roomName = formData.get('room-name');
        const roomColor = formData.get('room-color')
        const roomType = formData.get('room-type');

        if (roomName.length > 9) {
            Swal.fire({
                title: 'Error',
                text: 'Error',
                icon: 'error',

            })
            nav('/')
            return
        }

        addRoom({
            name: roomName,
            color: roomColor,
            type: roomType,
            items: []
        })
        nav('/')

    }

    return <div className='page-container'>
        <div className='room-form-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <label htmlFor='roomType'>Room Type:</label>
                    <select required value={roomType} onChange={handleChange} id='roomType' name='room-type'>
                        {
                            roomTypes.map(roomType => (
                                <option key={roomType.value} value={roomType.value}>{roomType.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='input-box'>
                    <label htmlFor="room-name">Room name:</label>
                    <input required id='room-name' name='room-name'/>
                </div>
                <div className='input-box'>
                    <label htmlFor="room-color">Room color:</label>
                    <input required type='color' id='room-color' defaultValue='#fff4ff' name='room-color'/>
                </div>
                <button type='submit' className='submit-button'>
                    Create room
                </button>
            </form>
        </div>
    </div>
}

export default AddRoomForm

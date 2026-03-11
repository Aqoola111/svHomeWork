import React, {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {ProductCard} from "./product-card.jsx";
import {SmartContext} from "./smart-context.jsx";

const products = [
    {id: 0, name: 'Air Conditioner'},
    {id: 1, name: 'Lamp'},
    {id: 2, name: 'Stereo System'},
    {id: 3, name: 'Boiler'}
];

function Room() {
    const {name} = useParams();
    const {rooms, updateRoom, toggleItem} = useContext(SmartContext)

    const currentRoom = rooms.find((room) => room.name === name)
    const [addingProduct, setAddingProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState('Air Conditioner')
    const nav = useNavigate()


    useEffect(() => {
        if (!currentRoom || !rooms) {
            nav('/')
        }
    }, [rooms, currentRoom, nav])

    if (!currentRoom) {
        return <div className='page-container'>
            <div className='no-room-found'>
                No room found.
            </div>
        </div>
    }


    const currentProducts = currentRoom?.items


    const handleChange = (e) => {
        setSelectedProduct(e.target.value)
    }

    const handleAdd = () => {
        setAddingProduct(false)
        if (!selectedProduct) return

        if (currentProducts && currentProducts.length >= 5) {
            Swal.fire({
                text: 'Too much products in one room',
                icon: 'error'
            })
            return;
        }

        if (currentRoom.type !== 'Bathroom' && selectedProduct === 'Boiler') {
            Swal.fire({
                text: `Can not add Boiler to ${currentRoom.type}`,
                icon: 'error'
            })
            return;
        }
        const stereoExists = currentProducts.some(product => product.name === 'Stereo System');
        if (stereoExists && selectedProduct === 'Stereo System') {
            Swal.fire({
                text: 'Only one stereo system is enabled in a room',
                icon: 'warning'
            })
            return;
        }

        updateRoom({
            ...currentRoom,
            items: [...currentProducts, {
                name: selectedProduct,
                on: false,
                id: Math.random().toString(36)
            }]
        })


    }


    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>
                    Smart House
                </h1>
            </div>
            <div className='room-page-content'>
                <div className='room-page-right'>
                    <button className='back-button' onClick={() => nav('/')}>
                        ← BACK
                    </button>
                    <h1>
                        Room Name: {currentRoom.name}
                    </h1>
                    <h1>
                        Room type: {currentRoom.type}
                    </h1>
                    <button
                        onClick={() => setAddingProduct(!addingProduct)}
                        className={`add-product-button ${addingProduct ? 'Cancel' : ''}`}
                    >
                        {!addingProduct ? 'Add Product' : 'Cancel'}
                    </button>
                    {addingProduct &&
                        <div className='add-product-form'>
                            <select value={selectedProduct} onChange={handleChange}>
                                {products.map((product) => (
                                    <option key={product.id} value={product.name}>{product.name}</option>
                                ))}
                            < /select>
                            <button onClick={() => handleAdd()}>
                                Add
                            </button>
                        </div>
                    }
                </div>
                <div className='room-page-left'>
                    {currentProducts.map((product) => (
                        <ProductCard key={product} toggleItem={toggleItem} product={product} room={currentRoom}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Room

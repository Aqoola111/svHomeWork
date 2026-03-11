import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {RoomsContainer} from "./rooms-container.jsx";
import {SmartContext} from "./smart-context.jsx";

function Home() {
    const {getShareableLink} = useContext(SmartContext)
    const handleShare = () => {
        const link = getShareableLink();
        navigator.clipboard.writeText(link);
        Swal.fire({
            title: 'BOOM! COPIED!',
            text: 'Your comic house link is in the clipboard!',
            icon: 'success',
            background: '#222',
            color: '#ffee00',
            iconColor: '#00ff44',
            confirmButtonText: 'GOT IT!',
            buttonsStyling: false,
            customClass: {
                popup: 'comic-swal-popup',
                confirmButton: 'comic-swal-confirm',
                title: 'comic-swal-title'
            }
        });
    }
    return <div className='page-container'>
        <div className='home-container'>
            <div className='home-container-header'>
                <h1>
                    Smart House
                </h1>
                <button onClick={() => handleShare()} className='share-button'>
                    Share your house
                </button>
            </div>
            <RoomsContainer/>
            <button className='main-add-button'>
                <Link to={'/add-room'}>
                    Add Room
                </Link>
            </button>
        </div>
    </div>
}

export default Home

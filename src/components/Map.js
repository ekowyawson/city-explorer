import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const GMAP_KEY = process.env.REACT_APP_GMAP_API_KEY
const libraries = ['places'];
const mapContainerStyle = {
    width: '60vw',
    height: '60vh',
};

// EXPORTS
function Map(props) {
    // =========================== GMAP FUNCTION
    let lat = Number(props.lat);
    let long = Number(props.long);

    const center = {
        lat: lat, // default latitude
        lng: long, // default longitude
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GMAP_KEY,
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <>
            <section className='map'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={center}>
                    <Marker position={center} />
                </GoogleMap>
            </section>
        </>
    )
}

export default Map;
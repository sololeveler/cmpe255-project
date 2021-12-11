import { useState } from 'react';
import MapGL, {
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

import ControlPanel from './ControlPanel';
import Pins from './Pins';
import PopupDetails from "./PopupDetails"

import CITIES from '../cities.json';

const TOKEN = ''; // Set your mapbox token here

const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px'
};

const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px'
};

const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
};

export default function MarkerMap() {
    const [viewport, setViewport] = useState({
        latitude: 40,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
    });
    const [popupInfo, setPopupInfo] = useState(null);

    return (
        <>
            <MapGL
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={setViewport}
                mapboxApiAccessToken={TOKEN}
            >
                <Pins data={CITIES} onClick={setPopupInfo} />

                {popupInfo && (
                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                    >
                        <PopupDetails info={popupInfo} />
                    </Popup>
                )}

                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </MapGL>

            <ControlPanel />
        </>
    );
}

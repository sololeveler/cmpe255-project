import { useState } from 'react';
import ReactMapGL, {
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
        width: "70vw",
        height: "100vh",
        zoom: 2
    });
    const [popupInfo, setPopupInfo] = useState(null);

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
            </ReactMapGL>

            <ControlPanel />
        </>
    );
}

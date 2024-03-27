
import { useState } from 'react'
import GoogleMapReact from 'google-map-react';



export function About() {
    const [coords, serCoords] = useState({ lat: 32.794044, lng: 34.989571 })

    const AnyReactComponent = ({ text }) => <div style={{fontSize:'3em'}}>{text}</div>;
    const zoom = 11

  function handleClick({lat,lng}){
    serCoords({lat,lng})

  }
    // const defaultProps = {
    //     center: {
    //         coords
    //     },
    // };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '400px', width: '400px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                center={coords}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <AnyReactComponent
                   {...coords}
                    text="🎈"
                />
            </GoogleMapReact>
        </div>
    );


}


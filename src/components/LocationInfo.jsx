import React from 'react';

const LocationInfo = ({ location }) => {
    return (
        <div className='dflex-column'>
            <h1>{location.name}</h1>
            <div className='location-info'>
                <div className='dimension'>
                    <p>DIMESION: </p>
                    <h3>{location.dimension}</h3>
                </div>
                <div className='type'>
                    <p>TYPE: </p>
                    <h3>{location.type}</h3>
                </div>
                <div className='residents'>
                    <p>RESIDENTS: </p>
                    <h3>{location.residents?.length}</h3>
                </div>
            </div>
        </div>
    );
};

export default LocationInfo;
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

const ResidentInfo = ({ charUrl }) => {

    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios.get(charUrl)
            .then(res => setCharacter(res.data))
    }, [])


    const statusColor = (ReStatus) => {
        if (ReStatus === 'Alive') {
            return 'green';
        }
        if (ReStatus === 'Dead') {
            return 'red';
        }
        else {
            return 'gray'
        }
    }


    return (
        <li>
            <div className='rsdnt-card'>
                <div
                    className='image'
                    style={{ backgroundImage: `url(${character.image})` }}>
                    <div className='status'>
                        <div
                            className='circle'
                            style={{ backgroundColor: `${statusColor(character.status)}` }}
                        >
                        </div>
                        {character.status}
                    </div>
                </div>
                <h2>{character.name}</h2>
                <div className='rsdnt-info'>
                    <h4>SPECIE</h4>
                    <p>{character.species}</p>
                    <h4>ORIGIN</h4>
                    <p>{character.origin?.name}</p>
                    <h4>APPEARENCES</h4>
                    <p>{character.episode?.length}</p>
                </div>
            </div>
        </li>
    );
};

export default ResidentInfo;
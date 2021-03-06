import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LocationInfo from './LocationInfo';
import ResidentInfo from './ResidentInfo';
import locations from '../locations.json';
import Pagination from './Pagination';

const RickAndMorty = () => {
    const [location, setLocation] = useState({});
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [residentsPerPage, setResidentsPerPage] = useState(9)

    useEffect(() => {
        const random = Math.floor(Math.random() * 126) + 1;
        axios.get(`https://rickandmortyapi.com/api/location/${random}`)
            .then(res => setLocation(res.data))
    }
        , [])

    const searchLocation = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${searchValue}`)
            .then(res => setLocation(res.data))
        setSearchValue('')
    }

    const onSearch = (loc) => {
        setSearchValue(loc.name)
        axios.get(`https://rickandmortyapi.com/api/location/${loc.id}`)
            .then(res => setLocation(res.data))
        setSearchValue('')
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const indexOfLastResident = currentPage * residentsPerPage
    const indexOfFirstResident = indexOfLastResident - residentsPerPage
    const currentResidents = location.residents?.slice(indexOfFirstResident, indexOfLastResident)


    return (
        <div>
            <div className='hero dflex-column'>
                <img className='logo' src="/assets/Rick-and-Morty.png" />
                <input
                    className={searchValue === '' ? 'search-bar' : 'search-bar-drop'}
                    type={'text'}
                    placeholder={'Type a location or id..'}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            searchLocation()
                        }
                    }}
                />
                <div className='dropdown'>
                    {locations.filter(loc => {
                        const searchVal = searchValue.toLocaleLowerCase()
                        const name = loc.name.toLocaleLowerCase()
                        return name.startsWith(searchVal) &&
                            name !== searchVal &&
                            '' !== searchVal
                    })
                        .slice(0, 10)
                        .map(loc => (
                            <div
                                onClick={() => onSearch(loc)}
                                className='dropdown-row'
                                key={loc.id}>
                                {loc.name}
                            </div>
                        ))}
                </div>
            </div>
            <LocationInfo location={location} />
            <div className='rsdnt-container'>
                <ul>
                    {currentResidents?.map(charUrl => (
                        <ResidentInfo charUrl={charUrl}
                            key={charUrl} />
                    ))}
                </ul>
            </div>
            <Pagination
                residentsPerPage={residentsPerPage}
                totalResidents={location.residents?.length}
                currentPage={currentPage}
                paginate={paginate}
            />
            <div className='coded-by'>
                <p>Coded by Oscar Solorzano</p>
            </div>
        </div>
    );
};

export default RickAndMorty;
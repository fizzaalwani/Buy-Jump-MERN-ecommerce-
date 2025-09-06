import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import './SearchEngine.css'
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchEngine = ({ setShowSearchBar }) => {
    const { url } = useContext(ShopContext)
    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (query.trim() === '') return
        const timer = setTimeout(async () => {
            try {
                let response = await axios.get(`${url}/product/search?query=${query}`)
                setSearchResults(response.data.products)
                console.log(response.data.products)
            } catch (err) {
                setError("Something went wrong .Please Try again later")
                setError(err.response.data.message)
                console.log(err.message || err.response.data.message)
            }
        }, 300)

        return () => clearTimeout(timer)

    }, [query])

    //manual search
    const search = async () => {
        console.log("clicked")
        if (query.trim() === '') return
        try {
            let response = await axios.get(`${url}/product/search?query=${query}`)
            setSearchResults(response.data.products)
            console.log(response.data)
        } catch (err) {
            setError("Something went wrong .Please Try again later")
            setError(err.response.data.message)
            console.log(err.message || err.response.data.message)
        }
    }
    //search on enter key
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }
    return (
        <div className='searchEngine'>

            <div className="searchbar">
                <div className='search-desc'>
                    <p>Search our site</p>
                    <RxCross2 onClick={() => setShowSearchBar(false)} />
                </div>

                <div className='search-input'>
                    <div className='searchbar-input'>
                        <input type="text" placeholder='Search'
                            value={query} onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        <div style={{ display: "flex", alignItems: "center", padding: "0 3px" }} onClick={search}><IoIosSearch /></div>
                    </div>
                    <div className='quick-search'>
                        <span className='quickSearch'>Quick Search: </span> women, men, stitched ...
                    </div>
                </div>

                <div className="search-results">
                    {searchResults.length === 0 ? (
                        <p style={{ textAlign: "center", color: "var(--color-body)" }}>
                            No results found
                        </p>
                    ) : (
                        searchResults.map((item) => {
                            return (
                                <Link to={`/product/${item.id}`} style={{textDecoration:"none"}} key={item.id}>
                                <div key={item.id} className='search-item' onClick={()=>setShowSearchBar(false)}>
                                    <div className='search-image'>
                                        <img src={item.image[0]} alt={item.name} />
                                    </div>
                                    <div className='search-info'>
                                        <p>{item.name}</p>
                                        <p>
                                            <span className='old'>Rs {item.old_price || ''}</span>
                                            <span className='new'>Rs {item.new_price || ''}</span>
                                        </p>
                                    </div>
                                </div>
                                </Link>
                            );
                        })
                    )}
                </div>

            </div>

        </div>
    )
}

export default SearchEngine

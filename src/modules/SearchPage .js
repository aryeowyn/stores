import { useState } from 'react';
import storesData from '../stores.json';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [response, setResponse] = useState(null);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (response) {
        setResponse(null);
        }
        const filtered = storesData.filter((element) =>
        element.Tienda.toLowerCase().includes(searchTerm)
        );

        setFilteredArray(filtered);
    };

    const handleClick = async (element) => {
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => {
            controller.abort();
        }, 10000);
        try {
            const response = await fetch('https://mercaderista-nmex-pp-origenesmx-dh-usea-rgp.azurewebsites.net/inventario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tienda: element.Tienda }),
                signal
            });
            const data = await response.json();
            setSearchTerm('');
            setFilteredArray([]);
            setResponse(data);
            console.log(response);
        } catch (error) {
            alert(error);
        }
  };

  const handleClearResponse = () => {
    setResponse(null);
  };

  return (
    <div>
        <input type="text" onChange={handleSearch} value={searchTerm} />
        {response != null ? (
            <div className='response'>
                <p>{JSON.stringify(response)}</p>
                <button className='responseBtn' onClick={handleClearResponse}>Clear response</button>
            </div>
        ) : <div className="container">
                {
                    searchTerm &&
                    filteredArray.map((element) => (
                    <button key={element.Tienda} onClick={() => handleClick(element)}>
                        {element.Tienda}
                    </button>
                    ))
                }
            </div>
        }
    </div>
  );
};

export default SearchPage;

import { useState } from 'react';
import storesId from '../stores.json';
import ProductTable from './ProductTable';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [storeData, setStoreData] = useState(null);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (storeData) {
            setStoreData(null);
        }
        const filtered = storesId.filter((element) =>
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
                body: JSON.stringify({ Tienda: element.Tienda }),
                signal
            });
            const responseData = await response.json();
            setSearchTerm('');
            setFilteredArray([]);
            setStoreData(responseData);
            setStoreData(prevState => ({
                ...prevState,
                storeName: element.Tienda
              }));
        } catch (error) {
            alert(error);
        }
    };

  const handleClearstoreData = () => {
    setStoreData(null);
  };

  return (
    <div>
        <input type="text" onChange={handleSearch} value={searchTerm} />
        {storeData != null ? (
            <div className='storeData'>
                <h2>{storeData.storeName}</h2>
                <button className='storeDataBtn' onClick={handleClearstoreData}>Clear Store Data</button>
                {storeData.data.length > 0 ? (
                    <ProductTable storeData={storeData} />
                ) : (
                    <p>No products found.</p>
                )}
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

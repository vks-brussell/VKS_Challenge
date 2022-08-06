import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';


const ByBreed = () => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [imageLink, setImageLink] = useState('');
    const [imgContainerClass, setImageContainerClass] = useState('img-container hidden');

    useEffect(() => {
        const getDogBreed = async () => {
            const result = await axios('/api/getDogBreeds');
            setDogBreeds(Object.keys(result.data.message));
        }
        getDogBreed()
    }, [])

    const generateImage = async (event) => {
        setImageContainerClass('img-container hidden')
        const result = await axios(`/api/getRandomImageByDogBreed/${event.target.value}`);
        setImageLink(result.data.message);
        setImageContainerClass('img-container');
    };

    return (
        <div className='container'>
            <CssBaseline />
            <h2>Select a breed to generate an image</h2>
            <select id='list' onChange={generateImage} className='select'>
                <option value=''>Select a breed</option>
                {
                    dogBreeds.map((dogBreed) => (<option key={dogBreed} value={dogBreed}>{dogBreed}</option>))
                }
            </select>
            <img
                src={imageLink}
                alt='Random dog'
                className={imgContainerClass}
                id='imgContainer'
            />
        </div>
    );
};

export default ByBreed;

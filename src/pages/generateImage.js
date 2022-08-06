import React, {useState} from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';


const Random = () => {
    const [imageLink, setImageLink] = useState('')
    const [imgContainerClass, setImageContainerClass] = useState('img-container hidden')

    const generateImage = async () => {
        setImageContainerClass('img-container hidden')
        const result = await axios('api/getRandomDogImage');
        setImageLink(result.data.message);
        setImageContainerClass('img-container');
    };

    return (
        <div className='container'>
            <CssBaseline />
            <h2>Click the button to generate a new picture</h2>
            <Button
                variant='contained'
                onClick={generateImage}
                className='button'
            >
                Click Me!
            </Button>
            <img
                src={imageLink}
                alt='Random dog'
                className={imgContainerClass}
                id='imgContainer'
            />
        </div>
    )
};

export default Random;


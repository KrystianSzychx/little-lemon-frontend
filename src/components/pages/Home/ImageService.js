// imageService.js

import axios from 'axios';

const getImageUrlByName = async (imageName) => {
    try {
        const response = await axios.get('https://localhost:7051/api/Image/all-images');
        const imageUrl = response.data.find(image => image.name === imageName)?.url;
        return imageUrl || '';
    } catch (error) {
        console.error(error);
        return ;
    }
};

export const fetchImages = async (imageNames) => {
    try {
        const imageUrls = await Promise.all(imageNames.map(imageName => getImageUrlByName(imageName)));
        return imageUrls;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};

export default getImageUrlByName;
import Compressor from 'compressorjs';

export const handleError = (err) => {
	console.warn(err);
}

export const handleInput = (e, setState) => {
	const {name, value} = e.target;
	setState((prevState) => ({
		...prevState,
		[name]: value,
	}))
}

export const handleImage = (e, state, setState, imageKey, setPreview) => {
	setPreview('spinner');
    
    const upload = (uploadImage) => {
        setState({...state, [imageKey]: uploadImage});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(uploadImage);
    }
    
    const image = e.target.files[0];
    
    let quality;
    const minQuality = 0.3;
    if (image.size > 1000000) {
        quality = minQuality;
    }
    else {
        quality = ((-minQuality/1000000) * image.size) + 1;
    }

    new Compressor(image, {
        quality: quality,
        success(result) {
            const newImage = new File([result], result.name);
            upload(newImage);
        },
        error(error) {
            upload(image);
            console.error(error.message);
        }
    });
}

export const locationDefault = 'Select location...';
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
	const upload = (uploadImage) => {
        setState({...state, [imageKey]: uploadImage});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        console.log(uploadImage)
        reader.readAsDataURL(uploadImage);
    }
    
    const image = e.target.files[0];

    new Compressor(image, {
        quality: 0.2,
        success(result) {
            const newImage = new File([result], result.name);
            upload(newImage)
        },
        error(error) {
            upload(image)
            console.error(error.message);
        }
    });
	
}

export const locationDefault = 'Select location...';
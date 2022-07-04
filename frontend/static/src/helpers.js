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
	const file = e.target.files[0];
	setState({...state, [imageKey]: file});

	const reader = new FileReader();
	reader.onloadend = () => {
		setPreview(reader.result);
	}

	reader.readAsDataURL(file);
}
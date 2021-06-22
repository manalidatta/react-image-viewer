import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './index.css';

const App = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);

	const handleImageChange = (e) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
			setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file)
			);
		}
	};

	const renderPhotos = (source) => {
		console.log('source: ', source);
		return source.map((photo) => {
			return (
				<TransformWrapper>
					<TransformComponent>
						<img src={photo} alt="" key={photo} />;
					</TransformComponent>
				</TransformWrapper>
			)
		});
	};

	return (
		<div className="app">
			<h1 className="heading">Image Viewer</h1>
			<div>
				<input type="file" id="file" multiple onChange={handleImageChange} />
				<div className="label-holder">
					<label htmlFor="file" className="label">
						<p>Add Photos</p>
					</label>
				</div>
				<div className="result">{renderPhotos(selectedFiles)}</div>
			</div>
		</div>
	);
};

export default App;
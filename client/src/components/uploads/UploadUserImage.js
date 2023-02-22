import React, { useState } from "react"
import Dropzone from "react-dropzone"

const UploadUserImage = ({ userPayload, setUserPayload }) =>{

	const [source, setSource] = useState("")

	const handleImageUpload = (acceptedImage) => {
		setSource(URL.createObjectURL(acceptedImage[0]))
		setUserPayload({
			...userPayload,
			image: acceptedImage[0]
		})
	}

	return (
		<>
			<h5>Profile Image Uploads</h5>
			<Dropzone onDrop={handleImageUpload}>
				{({getRootProps, getInputProps})=>(
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Upload your profile Image- drag 'n' drop or click to upload</p>
						</div>
					</section>
				)}
			</Dropzone>
			<p>
				Preview: <img src={source} />
			</p>
		</>
	)
}

export default UploadUserImage
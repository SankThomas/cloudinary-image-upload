import { useState } from "react"
import axios from "axios"
import { Image } from "cloudinary-react"

export default function App() {
  const [selectedImages, setSelectedImages] = useState([])
  const [imageData, setImageData] = useState(null)

  const uploadImage = () => {
    const formData = new FormData()
    formData.append("file", selectedImages)
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET")
    // Replace YOUR_UPLOAD_PRESET with your cloudinary upload_preset which looks something like this: sdfmpeitro

    const postImage = async () => {
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
          formData
          // Replace YOUR_CLOUD_NAME with your cloudName which you can find in your Dashboard
        )
        setImageData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    postImage()
  }

  return (
    <>
      <div className="wrapper">
        <h1 className="heading">Cloudinary Image Upload</h1>
        <article className="article">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setSelectedImages(e.target.files[0])}
            className="input"
          />
          <button onClick={uploadImage} className="button">
            Upload Image
          </button>
        </article>

        <article className="image-container">
          <Image
            cloudName="sankara"
            publicId={`https://res.cloudinary.com/sankara/image/upload/v1649427526/${imageData.public_id}`}
          />
        </article>
      </div>
    </>
  )
}

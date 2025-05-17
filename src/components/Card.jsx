import services from "../Appwrite/C"
import { Link } from 'react-router-dom'

function Card({ $id, "Featured-Images": featuredImage, Title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 transition duration-300 border border-gray-200'>
        <div className='w-full mb-4 flex justify-center items-center'>
          {featuredImage && (
           console.log("Image ID:", featuredImage),
            
            <img
              src={services.getFilePreview(featuredImage)}
              alt={Title}
              className="rounded-xl w-full h-48 object-cover"
            />
          )}
        </div>
        <h1 className='text-xl font-semibold text-gray-800 text-center'>{Title}</h1>
      </div>
    </Link>
  )
}

export default Card

import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Container from '../components/container/Container'
import services from "../Appwrite/C";

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        services.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
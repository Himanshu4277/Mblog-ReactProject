import { useEffect, useState } from 'react'
import services from "../Appwrite/C";
import Container from '../components/container/Container';
import Card from "../components/Card"

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        services.getPosts().then((posts) => {
            if (posts) {
                services.getPosts().then(posts => {
                    if (posts) setPosts(posts.documents);
                });
            } else {
                setPosts([]);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-12  text-center h-[320px] bg-amber-50">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-semibold text-gray-600 hover:text-gray-800 transition border border-blue-600 rounded p-12 ">
                            Login to read posts
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <Card key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;

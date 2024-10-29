import React, { useEffect, useState } from 'react';
import appwriteservice from '../appwrite/conf.js';
import { PostCard } from '../components/index';

function Home() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteservice.getPosts();
                // console.log('Fetched data:', response);
                // Check if response has the expected 'documents' property
                if (response && Array.isArray(response.documents)) {
                    setPosts(response.documents);
                } else {
                    console.error('Expected an array, but got:', response);
                    setPosts([]); // Ensure posts is always an array
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
                setPosts([]); // Handle errors by setting posts to an empty array
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            {error || 'No posts available'}
                        </h1>
                    </div>
                </div>
            
        );
    }

    return (
        <div className='w-full py-8'>
            
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='p-2 w-1/4' key={post.$id}>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            
        </div>
    );
}

export default Home;

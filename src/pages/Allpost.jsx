import React, { useEffect, useState } from 'react';
import appwriteservice from '../appwrite/conf';
import { PostCard } from '../components/index';

function Allpost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteservice.getPosts().then((response) => {
            // console.log('Fetched posts:', response);
            if (response && Array.isArray(response.documents)) {
                setPosts(response.documents);
            } else {
                console.error('Unexpected response format:', response);
                setPosts([]);
            }
        }).catch((error) => {
            console.error('Error fetching posts:', error);
            setPosts([]);
        });
    }, []);

    return (
        <div className='w-full py-8'>
            
                <div className='flex flex-wrap'>
                    {(
                        posts.map((post) => (
                            <div className='p-2 w-1/4' key={post.$id}>
                                <PostCard post={post} />
                            </div>
                        ))
                    )}
                </div>
            
        </div>
    );
}

export default Allpost;

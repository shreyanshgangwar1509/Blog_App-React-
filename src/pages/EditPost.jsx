import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteservice from '../appwrite/conf';
import { Container, PostForm } from '../components/index';
function EditPost() {
    const[posts,setposts] = useState(null);
    const {slug}= useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if(slug)appwriteservice.getPost(slug).then((post)=>{
            if(post)setposts(post)
        })
    else navigate('/')
    }, [slug,navigate])
    
  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ):null
}

export default EditPost
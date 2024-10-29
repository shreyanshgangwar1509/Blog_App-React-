import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteservice from '../appwrite/conf';
import { Button } from '../components/index';
function Post() {
    const [posts,setposts] =useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData)
    const isAuthor = posts && userData ? posts.userId ===userData.$id : false
    useEffect(()=>{
        if(slug){
            appwriteservice.getPost(slug).then((post)=>
            {
                if(post) setposts(post);
            else navigate("/")}
        )
        }
        else navigate('/')
    },[slug,navigate])

    const deletepost = ()=>{
        appwriteservice.deletePost(posts.$id).then((status)=>{
            if(status){
                appwriteservice.deleteFile(posts.featuredImage);
                navigate('/')
            }
        })
    }
  return posts ? (
    <div className='py-8'>
        
            <div className=' w-full flex justify-center mb-4 relativr border rounded-xl p-2'>
                <img src={appwriteservice.getFilePreview(posts.featuredImage)}
                alt={posts.title}
                className='rounde-xl'/>
                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`edit-post/${posts.$id}`}>
                        <Button bgColor='bg-green-500'
                        className='mr-3'>Edit</Button>
                        </Link>
                        <Button bgColor='bg-green-500'
                        onClick={deletepost}></Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>
                    {posts.title}
                </h1>
            </div>
            <div className='browser-css'>{parse(posts.contenet)}</div>
        
    </div>
  )
  :null
}

export default Post
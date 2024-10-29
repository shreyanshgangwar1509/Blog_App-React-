import HTMLReactParser from 'html-react-parser/lib/index';
import React, { useEffect, useState } from 'react';
import appwriteservice from '../appwrite/conf';
const PostCard = ({ post }) => {
    const { title, contenet, featuredImage } = post;
    // const imageUrl = appwriteservice.getFilePreview(featuredImage);
    // console.log("Image and Postform is called ",imageUrl)
    // console.log("Post:", post); // Added to log the entire post object
    
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            if (featuredImage) {
                try {
                    const url = await appwriteservice.getFilePreview(featuredImage);
                    setImageUrl(url);
                } catch (error) {
                    console.error("Error fetching image URL:", error);
                    setImageUrl(null);
                }
            }
        };

        fetchImageUrl();
    }, [featuredImage]);
    return (
        <div className="post-card">
            {imageUrl ? (
                <img src={imageUrl.href} alt={title} className="post-card__image" />
            ) : (
                <p>Image not available</p>
            )}
            <h2 className="post-card__title">{title}</h2>
            <div className="post-card__content">{HTMLReactParser(contenet)}</div>
        </div>
    );
};

export default PostCard;

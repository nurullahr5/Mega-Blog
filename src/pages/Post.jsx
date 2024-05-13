import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';;
import { Container, Button } from '../component';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

function Post() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate('/');
            })
        } else navigate('/')
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate('/');
            }
        })
    }


    return post ? (
        <div className="py-8 ">
            <Container>
                <div className=" w-[420px] flex justify-center mb-4 relative border rounded-xl p-2 mx-auto">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[400px]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" classname='px-6 mr-1'>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className='browser-css'>
                    {parse(JSON.stringify(post.content))}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post
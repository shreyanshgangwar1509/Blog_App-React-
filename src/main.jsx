import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Protected from './components/AuthLayout.jsx';
// import { Login, } from './components/index.js';
import './index.css';
// import Addpost from './pages/Addpost.jsx';
import App from './App.jsx';
import Addpost from './pages/Addpost.jsx';
import Allpost from './pages/Allpost.jsx';
import EditPost from "./pages/EditPost";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Post from "./pages/Post";
import Signup from './pages/Signup';
import store from './store/store.js';
const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:(
                    <Protected authentication={false}>
                        <Login/>
                    </Protected>
                )
            },
            {
                path:'/signup',
                element:(
                    <Protected authentication={false}>
                        <Signup/>
                    </Protected>
                )
            },
            {
                path:'/all-posts',
                element:(
                    <Protected authentication>
                        {" "}
                        <Allpost/>
                    </Protected>
                )
            },
            {
                path:'/add-post',
                element:(
                    <Protected authentication>
                        {" adding a post "}
                        <Addpost/>
                    </Protected>
                )
            },
            {
                path:'/edit-post/:slug',
                element:(
                    <Protected authentication>
                        {" "}
                        <EditPost/>
                    </Protected>
                )
            },
            {
                path:'/post/:slug',
                element:(
                    <Post/>
                )
            }
        ]
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
)

import React, { Component } from 'react';
// import axios from 'axios';
import {Route, NavLink,Switch,Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';//hoc関数
//NewPostコンポーネントのみをlazyLoadingさせる
const AsyncNewPost = asyncComponent(()=>{//返り値はクラスComponent
    //この関数が実行されたときだけimportが実行されるというロジック
    return import('./NewPost/NewPost');
});


class Blog extends Component {
    state = {
        auth:true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                    to="/posts/" 
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color:'#fa923f',
                                        textDecoration:'underline'
                                    }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* exact属性をpropsに指定するとcompletePathとして認識する */}
                {/* <Route path="/" exact render={()=> <h1>Home</h1>} />
                <Route path="/" render={()=> <h1>Home２</h1>} /> */}
                {/* componentというpropsに直接componentを渡すこともできる */}
                {/* Switchコンポーネントはラップされたようそのうち最初に条件とマッチする一つのComponentのみを描出する */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Route render={()=> <h1>Not found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts}/> */}
                </Switch>

            </div>
        );
    }
}

export default Blog;
import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state ={
        loadedPost:null
    }
    componentDidUpdate(){//componentDIdUpdate内でsetStateを実行するときにはinfiniteLoopに注意
        if(this.props.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                //stateが更新され、同じidの場合はhttpリクエストが実行されないようにする
                axios.get('/posts/'+ this.props.id)
                .then(response=>{
                    //console.log(response);
                    this.setState({loadedPost:response.data});
                });
            }

        }
    }
    deletePostHandler=()=>{
        axios.delete('/posts/' + this.props.id)
            .then(response=>{
                console.log(response);
            });
    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.props.id){ //loadedPostはcomponentDidUpdate時に取得されるため最初のrendering時には表示すべきでない
            post = <p style={{textAlign:'center'}}>Loading...!</p>;
        }
        if(this.state.loadedPost){//loadedPostはcomponentDidUpdate時に取得されるため、最初のrendering時にはnull

            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;
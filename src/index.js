import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// axiosのdefaultsオブジェクトを用いることでグローバル定数(プロパティ)をセットできる
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


// axiosのinterceptorsオブジェクトはグローバルに共有することができる
axios.interceptors.request.use(request=>{//axiosを使用したすべてのrequestで実行されるmiddleware
    console.log(request);

    return request;//最後にreturnしないとブロッキングされてしまう
},error=>{
    console.log(error);
    return Promise.reject(error);
});

//responseでも同様にinterceptorsを追加できる
axios.interceptors.response.use(response=>{
    console.log(response);

    return response;//最後にreturnしないとブロッキングされてしまう
},error=>{
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

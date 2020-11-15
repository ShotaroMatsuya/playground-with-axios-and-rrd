import axios from 'axios';

// instanceを用いれば適用させたいコンポーネントのみで値を共有できる(今回はBLogコンポーネントのみで使用する)
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'

});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';


const site = 'https://vue3-course-api.hexschool.io/';
const api_path = 'bananacake';

//1. 建立環境
const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{}
        }
    },
    methods: {
    //3 確認是否登入
        checkLogin(){
            //console.log(`${site} api/user/check`);
            
            axios.post(`${site}v2/api/user/check`)
            .then((res) => {
                console.log(res)
                this.getProduct();
            })
            .catch((err) => {
                console.log(err)
                window.location = '/login.html'
            })
        },
        //4 取得產品
        getProduct(){
            //console.log(`${site}api/${path}/admin/products/all`)
            const url = `${site}v2/api/${api_path}/admin/products`;
            axios.get(url)
            .then((res) => {
                console.log(res)
                this.products = res.data.products
            })
            .catch(err =>{
                console.log(err);
            })
        },
    },
    //2. 取出Token
    mounted() {
       const cookieValue = document.cookie
       .split(';')
       .find((row) => row.startsWith('myToken=')) 
       ?.split('=')[1]
       //console.log(cookieValue);
    //3. 將Token 加到headers
    axios.defaults.headers.common['Authorization'] = cookieValue;
    this.checkLogin();
    },
});

app.mount('#app')
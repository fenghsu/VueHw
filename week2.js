import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';


const site = 'https://vue3-course-api.hexschool.io/';
const path = 'hsufengss';

//1. 建立環境
const app = createApp({
    data(){
        return{
            products:[]
        }
    },
    methods: {
    //3 確認是否登入
        checkLogin(){
            console.log(`${site}/v2/api/user/check`);
            const url = `${site}/v2/api/user/check`;
            axios.post(url)
            .then((res) => {
                console.log(res)
                this.getProduct();
            })
            .catch((err) => {
                console.log(err)
                //window.location = '/login.html'
            })
        },
        //4 取得產品
        getProduct(){
            console.log(`${site}/v2/api/${path}/admin/products/all`)
            //const url = `${site}/v2/api/${api_path}/admin/products/all`;
            // axios.get(url)
            // .then((res) => {
            //     console.log(res)
            //     this.products = res.data.products
            // })
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
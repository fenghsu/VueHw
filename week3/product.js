import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js"

const site = 'vue3-course-api.hexschool.io/v2/' 
const path = 'bananacake'

//1. 在外層宣告Modal，全域皆會使用Modal，元件化會用到
let productModal ={};
let delproductModal ={};

const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imagesUrl:[],
            },
            isNew: false,
        }
    },
    methods: {
    //3. 取得產品列表
    getProducts(){
        const url = `${site}api/${path}/admin/products/all`;
        axios.get(url)
        .then( (res) => {
            console.log(res)
        })
        .catch( (err) => {
            console.log(err)
        })
    }
    },
    mounted() {
    //console.log(`${site}api/${path}/admin/products/all`)    
    //2. Token存取至headers
    const cookieValue = document.cookie
    .split(';')
    .find((row) => row.startsWith('myToken=')) 
    ?.split('=')[1]
    //console.log(cookieValue);
    axios.defaults.headers.common['Authorization'] = cookieValue;
        
    this.getProducts();
    },
}).mount('#app')
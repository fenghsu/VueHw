import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js"

const site = 'https://vue3-course-api.hexschool.io/v2/' 
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
    //4. Html key入值
    getProducts(){  
        const url = `${site}api/${path}/admin/products/all`;
        axios.get(url)
        .then( (res) => {
            console.log(res)
            this.products = res.data.products;
        })
        .catch( (err) => {
            console.log(err)
        })
    },
    //6. 更新data
    updateProduct(){
        console.log('hi');
        //console.log(`${site}api/${path}/admin/product`)
        const url = `${site}/api/${path}/admin/product`;
        axios.post(url, { data: this.tempProduct }) //res帶出{data:this.tempProduct}內容
        .then(res => {
            console.log(res);
            this.getProducts(); //更新完要重新填寫
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

    //5. Bootstrap 方法
    //console.log(bootstrap)
    //5.1 初始化new
    //第7行已宣告productModal物件
    productModal = new bootstrap.Modal('#productModal');
    //5.2 呼叫方法 show, hide
    productModal.show();
    },
}).mount('#app')
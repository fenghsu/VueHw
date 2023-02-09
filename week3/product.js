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
            isNew: false, //確認編輯或新增所使用
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
    //7. 打開Modal
    //8. 區分新增及編輯的modal
    openModal(status, product){
        
       // console.log(status)
       if(status === 'create'){
        productModal.show();
        this.isNew = true;
        //會帶入初始化資料
        this.tempProduct = {
            imagesUrl:[],
        }
       }else if( status === 'edit'){
        productModal.show();
        this.isNew = false;
        //會帶入當前要編輯的資料
        this.tempProduct ={...product} ;
       }else if( status === 'delete'){
        delproductModal.show();
        this.tempProduct ={...product} ; //等等取id使用
       }

    },
    //6. 建立新產品
    updateProduct(){
        //console.log('hi');
        let url = `${site}api/${path}/admin/product`;
        //9. 用 this.New 判斷api怎麼進行
        let method = 'post'
        if(!this.isNew){
            url = `${site}api/${path}/admin/product/${this.tempProduct.id}`;
            method = 'put'
        }

        axios[method](url, { data: this.tempProduct }) //res帶出{data:this.tempProduct}內容
        .then(res => {
            console.log(res);
            this.getProducts(); //更新完要重新填寫
            productModal.hide();
        })
    },
    //12. 刪除產品
    deleteProduct(){
        const url = `${site}api/${path}/admin/product/${this.tempProduct.id}`;
        axios.delete(url) 
        .then(() => {
            this.getProducts(); 
            productModal.hide();
        });
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
    //productModal.show();
    delproductModal = new bootstrap.Modal('#delProductModal')
    },
}).mount('#app')
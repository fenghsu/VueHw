//1. 匯入Vue 環境
// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// 讀取外部的資源
loadLocaleFromURL('./zh_TW.json');
// Activate the locale
configure({
    generateMessage: localize('zh_TW'),
  //validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const apiUrl = 'https://vue3-course-api.hexschool.io/';
const paith = 'bananapie';

//5. 製作 productModal並渲染頁面
const productModal = { 
    //6. 當id變動時，取得遠端資料並呈現modal
    props:['id', 'addToCart', 'openModal'],
    data(){
        return{
            modal:{},//置放實體化結果
            tempProduct:{},
            qty:1

        }
    },
    //html 使用x-template
    template:"#userProductModal",

    //watch 監聽prps傳入的值，生命週期沒做任何事
    watch:{
        id(){
            if(this.id){
            //console.log(`內層執行`,this.id);
            axios.get(`${apiUrl}v2/api/${paith}/product/${this.id}`)
            .then( res => {
            console.log("單一產品",res.data.product)
            this.tempProduct = res.data.product
            this.modal.show()
            });
            }
        }
    },
    methods:{
        hide(){
            this.modal.hide();
        }
    },
    mounted() {
        //5. new 將bootstrap 實體後賦予到modal(11行)變數上，.show()展開modal
        this.modal = new bootstrap.Modal(this.$refs.modal);
        //監聽dom 當modal關閉時要做其他事情
        this.$refs.modal.addEventListener('hidden.bs.modal',(event)=>{
            console.log('modal被關閉')
            this.openModal('');
        })
    }

};

Vue.createApp({
    data(){
        return{
            //2. 新增productes 空陣列，串接取得產品Api，並將產品傳入陣列
            products:[],
            //6. 選擇productId
            productId:'',
            cart:{},
            loadingItem:'', //存id
            form: {
                user: {
                  name: '',
                  email:'',
                  tel: '',
                  address: '',
                },
                message: '',
              },
        }
    },
    methods:{
        getProducts(){
            axios.get(`${apiUrl}v2/api/${paith}/products/all`)
            .then( res => {
                console.log("產品列表",res.data.products)
                this.products = res.data.products
                //push使用時機是加入單一產品，等於用法是直接覆蓋全部賦予值
            })
        },
        //6. 點選按鈕，傳入id
        openModal(id){
            this.productId = id;
            console.log(`外層執行`,id)
        },
        //7. 加入購物車
        addToCart(product_id, qty=1){ //qty=1參數預設值，當沒有傳入值時，qty=1
            const data = {
                product_id,
                qty
             }
            axios.post(`${apiUrl}v2/api/${paith}/cart`, {data:data})
            .then( res => {
                console.log("加入購物車",res.data)
                this.$refs.productModal.hide();
                this.getCart();
            })
        },
        //8. 取得購物車
        getCart(){
            axios.get(`${apiUrl}v2/api/${paith}/cart`)
            .then( res => {
                console.log("購物車",res.data.data)
                this.cart = res.data.data
            }) 
        },
        //9. 調整數量
        updateItem(item){ //購物車id, 產品id
            const data = {               
                    "product_id": item.product.id,
                    "qty": item.qty                   
            };
            this.loadingItem = item.id
            console.log(data, item.id )
            axios.put(`${apiUrl}v2/api/${paith}/cart/${item.id}`, {data})
            .then( res => {
                console.log("更新購物車", res.data)
                this.getCart();
                this.loadingItem = '';
            }) 
         },
         //10. 刪除數量
         deletItem(item){ //購物車id, 產品id
            axios.delete(`${apiUrl}v2/api/${paith}/cart/${item.id}`)
            this.loadingItem = item.id
            .then( res => {
                console.log("刪除購物車", res.data)
                //this.cart = res.data.data
                this.getCart();
                this.loadingItem = '';
            }) 
         },
         onSubmit(){
            console.log('onSubmit')
         }
    },
    mounted(){
        this.getProducts();
        this.getCart();
    },
    components:{
        productModal, 
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    }
}).mount('#app')

import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';


const site = 'https://vue3-course-api.hexschool.io';
const api_path = 'hsufengss';


const app = createApp({
    data(){
        return{
            user:{
                username:'',
                password:'',
            }
        }
    },
    methods: {
        login() {            
            
            const url = `${site}/v2/admin/signin`;
            axios.post(url, this.user)
            .then((res)=>{
                const expired = res.data.expired;
                const token = res.data.token;
                console.log(expired, token);
                document.cookie= `myToken=${token}; expires=${new Date(expired)}`;
                window.location = './product.html'
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        //console.log('hi')
        //console.log(`${site}/admin/signin`);        
    }
})
app.mount('#app')
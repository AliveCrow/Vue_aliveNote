import Vue from 'vue';
import Component from 'vue-class-component';



@Component
export default class CommonData extends Vue{
    public $refs!:{
        box__right_input:HTMLElement;
        input_title:HTMLInputElement;
        input_2:HTMLElement;
    }

    allTags: [] = [];
    cardShow:boolean = false;
    cardTagShow:boolean = false;
    colorArr:string[]=[
        '#FFFFFF','#FD382D','#0473F8','#EB8000',
        '#77e7df','#e57066','#eed974','#c6d7c7',
        '#b1fdeb','#EEB800','#727176','#7579e7'
    ]



    closeCard(){
        this.cardShow = false
    }
    closeTagCard(){
        this.cardTagShow = false
    }


    getTags(){
        this.axios.get('/tags').then(res=>{
            if (res.data.stateCode === 0) {
                this.allTags = res.data.res;
            }
        }).catch(error => {
            console.log(error);
        });
    }


    created(){
        this.getTags()
    }


}
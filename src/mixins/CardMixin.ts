import Vue from 'vue';
import Component from 'vue-class-component';
import ArchiveTip from '@/components/ArchiveTip.vue';


@Component
export default class CardMixin extends Vue {
    public $refs!: {
        box__right_input: HTMLDivElement;
        input_2: HTMLDivElement;
        input_title: HTMLInputElement;
    };

    isTop: boolean = false;
    cardShow: boolean = false;
    cardTagShow: boolean = false;
    colorArr: string[] = [
        '#fff', '#99b898', '#feceab', '#ff847c', '#e84a5f',
        '#de7119', '#dee3e2', '#116979', '#18b0b0',
        '#8fcfd1', '#df5e88', '#f6ab6c'
    ];
    allTags: [] = [];
    selectedColor: string = '#fff';

    selectColor(item: string) {
        // this.$refs.box__right_input.style.backgroundColor = item;
        // this.$refs.input_title.style.backgroundColor = item;
        this.selectedColor = item;
    }
    showCard() {
        this.cardShow = !this.cardShow;
    };
    showTagCard(){
        this.cardTagShow = !this.cardTagShow;
    }

    cardShowModel:boolean=false
    showCardModel() {
        console.log('2');
        this.cardShowModel = !this.cardShowModel;
    };
    cardTagShowModel:boolean=false
    showTagCardModel(){
        this.cardTagShowModel = !this.cardTagShowModel;
    }
    closeCardModel() {
        this.cardShowModel = false
    };
    closeTagCardModel(){
        this.cardTagShowModel = false
    }
    closeTagCard(){
        this.cardTagShow = false;
    }
    closeCard() {
        this.cardShow = false;
    };
    topBtn() {
        this.isTop = !this.isTop;
    };
    archive() {
        console.log('23');
        this.$toast(ArchiveTip, {
            //@ts-ignore
            position: 'bottom-left'
        });
    }
    getTags() {
        this.axios('/tag').then(res => {
            if (res.data.stateCode === 0) {
                this.allTags = res.data.res;
            }
        }).catch(error => {
            console.log(error);
        });
    }

    created(){
        this.getTags();
    }


}

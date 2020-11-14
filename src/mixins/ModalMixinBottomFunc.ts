import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit} from 'vue-property-decorator';
import {NoteDataType} from '@/typs';
import ArchiveTip from '@/components/ArchiveTip.vue';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';




@Component
export default class ModalMixinBottomFunc extends Vue {

    colorArr: string[] = [
        '#fff', '#99b898', '#feceab', '#ff847c', '#e84a5f',
        '#de7119', '#dee3e2', '#116979', '#18b0b0',
        '#8fcfd1', '#df5e88', '#f6ab6c'
    ];

    created(){
        this.getTags()
    }

    allTags: [] = [];
    getTags() {
        this.axios('/tags').then(res => {
            if (res.data.stateCode === 0) {
                this.allTags = res.data.res;
            }
        }).catch(error => {
            console.log(error);
        });
    }


    //tagCard
    cardShow: boolean = false;
    closeCard(){
        this.cardShow = false;
    }
    showCard(){
        this.cardShow = !this.cardShow;
    }

    //TagCard
    cardTagShow:boolean = false;
    closeTagCard(){
        this.cardTagShow = false;
    }
    showTagCard(){
        this.cardTagShow = !this.cardTagShow;
    }

    @Emit('updateWaterFall')
    SyncWaterFall(type:string){
        return type
    };

    @Emit('dataChange')
    dataChange(e:string,id:number){
        return arguments
    }

}

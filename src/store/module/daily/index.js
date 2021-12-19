import {request} from '@/service/request'
import {formatMinuteSecond} from "@/utils";

export default {
    namespaced: true,
    state(){
        return{
            dailyList: []
        }
    },
    mutations:{
        changeDailyList(state, data){
            state.dailyList = data
        }
    },
    actions:{
        async getDailyRecommendList({commit}){
            const result = await request('/recommend/songs')
            //   处理时间
            const formatdata = result.data.data.dailySongs
            formatdata.forEach((item, index) => {
                 formatdata[index].dt = formatMinuteSecond(item.duration)
                formatdata[index].duration = formatMinuteSecond(item.duration)
                formatdata[index].al = item.album
                 formatdata[index].ar = item.artists
            })
            commit('changeDailyList', formatdata)
        }
    }
}
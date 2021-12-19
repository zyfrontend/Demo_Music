import {request} from '@/service/request'

export default {
    namespaced: true,
    state(){
        return{
            UserPlayList: []
        }
    },
    mutations: {
        changeUserPlayList(state, data){
            state.UserPlayList = data
        }
    },
    actions: {
    // 获取个人歌单
       async getUserMusicList({commit, rootState }){
           const uId = rootState.login.profile.userId
           const result = await request(`/user/playlist?uid=${uId}`)
           if(result&& result.data){
               commit('changeUserPlayList', result.data.playlist)
           }
       }
    }
}
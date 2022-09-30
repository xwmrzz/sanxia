import Vue from 'vue'
import Vuex from 'vuex'
import menus from "@/store/modules/menus";
import tab from "./tab";
import axios from 'axios'
Vue.use(Vuex)

//用于响应组件中的动作
const actions = {
  async getWarningDataArray(context){
    await axios.get('http://120.26.61.220:8083/weather/test2').then((result) => {
                      context.commit('GetWarningDataArray',result.data);
                    }).catch((err) => {
                      console.log(err)
                    });
  },
  changeIndexTimer(context){
    context.commit('ChangeIndexTimer');
  },
  changeDot(context,value){
    context.commit('ChangeDot',value);
  },
  changeAdjacentPlaneTime(context,value){
    context.commit('ChangeAdjacentPlaneTime',value);
  },
  changeAdjacentVerticalTime(context,value){
    context.commit('ChangeAdjacentVerticalTime',value);
  },
  changeFirstPlaneTime(context,value){
    context.commit('ChangeFirstPlaneTime',value);
  },
  changeFirstVerticalTime(context,value){
    context.commit('ChangeFirstVerticalTime',value);
  },
  changePrecipitationTime(context,value){
    context.commit('ChangePrecipitationTime',value);
  },
  changeYangtzeWaterlevelTime(context,value){
    context.commit('ChangeYangtzeWaterlevelTime',value);
  },
  changeδxAdjacentTime(context,value){
    context.commit('ChangeδxAdjacentTime',value);
  },
  changeδxFirstTime(context,value){
    context.commit('ChangeδxFirstTime',value);
  },
  changeδyAdjacentTime(context,value){
    context.commit('ChangeδyAdjacentTime',value);
  },
  changeδyFirstTime(context,value){
    context.commit('ChangeδyFirstTime',value);
  },
}
//用于操作数据（state）
const mutations = {
  GetWarningDataArray(state,value){
    state.data = value.res;
    state.levelcount[0] = value.level0;
    state.levelcount[1] = value.level1;
    state.levelcount[2] = value.level2;
    state.levelcount[3] = value.level3;
    state.levelcount[4] = value.level4;
    state.levelcount[5] = value.level5;
    state.dot = value.isMessageInsert;
    console.log("state:"+state.levelcount);
  },
  ChangeIndexTimer(state){
    state.indextimer = state.indextimer+1;
  },
  ChangeDot(state,value){
    state.dot = value;
  },
  ChangeAdjacentPlaneTime(state,value){
    state.AdjacentPlane.recordStartTime = value.recordStartTime;
    state.AdjacentPlane.recordEndTime = value.recordEndTime;
  },
  ChangeAdjacentVerticalTime(state,value){
    state.AdjacentVertical.recordStartTime = value.recordStartTime;
    state.AdjacentVertical.recordEndTime = value.recordEndTime;
  },
  ChangeFirstPlaneTime(state,value){
    state.FirstPlane.recordStartTime = value.recordStartTime;
    state.FirstPlane.recordEndTime = value.recordEndTime;
  },
  ChangeFirstVerticalTime(state,value){
    state.FirstVertical.recordStartTime = value.recordStartTime;
    state.FirstVertical.recordEndTime = value.recordEndTime;
  },
  ChangePrecipitationTime(state,value){
    state.Precipitation.recordStartTime = value.recordStartTime;
    state.Precipitation.recordEndTime = value.recordEndTime;
  },
  ChangeYangtzeWaterlevelTime(state,value){
    state.YangtzeWaterlevel.recordStartTime = value.recordStartTime;
    state.YangtzeWaterlevel.recordEndTime = value.recordEndTime;
  },
  ChangeδxAdjacentTime(state,value){
    state.δxAdjacent.recordStartTime = value.recordStartTime;
    state.δxAdjacent.recordEndTime = value.recordEndTime;
  },
  ChangeδxFirstTime(state,value){
    state.δxFirst.recordStartTime = value.recordStartTime;
    state.δxFirst.recordEndTime = value.recordEndTime;
  },
  ChangeδyAdjacentTime(state,value){
    state.δyAdjacent.recordStartTime = value.recordStartTime;
    state.δyAdjacent.recordEndTime = value.recordEndTime;
  },
  ChangeδyFirstTime(state,value){
    state.δyFirst.recordStartTime = value.recordStartTime;
    state.δyFirst.recordEndTime = value.recordEndTime;
  }
  
}
//用于存储数据
const state = {
  data:[[]],
  levelcount:[],
  indextimer:0,
  messageflag1:0,
  messageflag2:0,
  messageflag3:0,
  messageflag4:0,
  messageflag5:0,
  dot:false,
  AdjacentPlane:{
    recordStartTime:null,
    recordEndTime:null,
  },
  AdjacentVertical:{
    recordStartTime:null,
    recordEndTime:null,
  },
  FirstPlane:{
    recordStartTime:null,
    recordEndTime:null,
  },
  FirstVertical:{
    recordStartTime:null,
    recordEndTime:null,
  },
  Precipitation:{
    recordStartTime:null,
    recordEndTime:null,
  },
  YangtzeWaterlevel:{
    recordStartTime:null,
    recordEndTime:null,
  },
  δxAdjacent:{
    recordStartTime:null,
    recordEndTime:null,
  },
  δxFirst:{
    recordStartTime:null,
    recordEndTime:null,
  },
  δyAdjacent:{
    recordStartTime:null,
    recordEndTime:null,
  },
  δyFirst:{
    recordStartTime:null,
    recordEndTime:null,
  }
}

export default new Vuex.Store({
  // state: {
  //   token:''
  //
  //
  // },
  // mutations: {
  //   SET_TOKEN:(state,token) =>{
  //     state.token=token
  //     localStorage.setItem("token",token)
  //   },
  //
  //
  // },
  // actions: {
  // },
  actions,
  mutations,
  state,
  modules: {
    tab,
    menus
  }
})

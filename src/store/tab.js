export default
{
  state:{
    isCollapse: false,
    currentMenu:null
  },
  mutations:{
    collapseMenu(state){
      state.isCollapse=!state.isCollapse
    }
  },
  // selecMenu(state,val) {
  //   val.name==='Index'?(this.state.currentMenu=null):state.currentMenu=val
  // }
}

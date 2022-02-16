import Index from "@/views";
import model from "@/views/sys/Dmodel";

const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}

Mock.mock('/captcha', 'get', () => {

    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('120x40', 'p7n5w')
    }
    return Result
})

Mock.mock('/login', 'post', () => {

    // 无法在header中传入数jwt

    Result.code = 400
    Result.msg = "验证码错误"

    return Result
})
Mock.mock('/sys/userInfo', 'get', () => {
    Result.data = {
        id:"1",
        username:"test",
        avater:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }

    return Result
})
Mock.mock('/logout', 'post', () => {


    return Result
})
Mock.mock('/sys/menu/nav', 'get', () => {
    let nav=[
        {
            title:'预测预警模型',
            name:'Dmodel',
            icon:'iconfont icon-icon_RD_circle',
            path:'/Dmodel',
            component:'sys/Dmodel',
            children:[

            ]
        },
        {
            title:'预测模型',
            name:'Prediction',
            icon:'iconfont icon-sujuyuce',
            path:'/prediction',
            component:'sys/Prediction-model',
            children:[]
        },
        {
            title:'泄洪模拟',
            name:'Flood',
            icon:'iconfont icon-hongshui_lan',
            path:'/flood',
            component:'sys/Flood-simulation',
            children:[]
        },
        {
            title:'设备数据',
            name:'Equipment',
            icon:'iconfont icon-shebeishuju1',
            path:'/equipment',
            component:'sys/Equipment-data',
            children:[]
        },
    ]
    let authoritys=[]

    Result.data={
        nav:nav,
        authoritys:authoritys
    }

    return Result
})

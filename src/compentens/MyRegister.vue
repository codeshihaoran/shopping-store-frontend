<!-- 项目注册组件  -->



<!-- 注册成功时弹出注册成功框不显示 -->
<template>
    <!-- 这里需要v-model来绑定isRegister的值 -->
    <el-dialog title="注册" width="300px" center v-model="isRegister">
        <el-form :model="RegisterUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
                <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="RegisterUser.name"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input prefix-icon="el-icon-view" type="password" placeholder="请输入密码"
                    v-model="RegisterUser.pass"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPass">
                <el-input prefix-icon="el-icon-view" type="password" placeholder="请再次输入密码"
                    v-model="RegisterUser.confirmPass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="Register" style="width:100%;" class="btn">注册</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { getRegisterModel } from '../service/index'
import { checkRegister } from '../service/index'
export default {
    name: 'MyRegister',
    props: ['register'],
    data() {
        // 账号校验
        let validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'))
            }
            // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
            const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
            if (userNameRule.test(value)) {
                // 判断数据库中是否存在该用户名
                checkRegister(this.RegisterUser.name).then(res => {
                    // code 为001是表示可以注册
                    if (res.data.code == '001') {
                        this.$refs.ruleForm.validateField("checkPass");
                        return callback()
                    } else {
                        return callback(new Error(res.data.msg));
                    }
                })
            } else {
                return callback(new Error('用户名以字母开头,长度在5-16之间,允许字母数字下划线'))
            }
        };
        // 密码校验
        let validatePass = (rule, value, callback) => {
            if (value == '') {
                return callback(new Error('请输入密码'))
            }
            const passwordRule = /^[a-zA-Z]\w{5,17}$/;
            if (passwordRule.test(value)) {
                this.$refs.ruleForm.validateField('checkPass')
                return callback()
            } else {
                return callback(new Error('字母开头,长度5-16之间,允许字母数字下划线'))
            }
        };
        // 确认密码校验
        let validateConfirmPass = (rule, value, callback) => {
            if (value == '') {
                return callback(new Error('请输入确认密码'))
            }
            // 确认密码需要验证是否与输入的密码一致
            if (this.RegisterUser.pass === this.RegisterUser.confirmPass) {
                this.$refs.ruleForm.validateField('checkPass')
                return callback()
            } else {
                callback(new Error('您输入的俩次密码不一致'))
            }
        }
        return {
            isRegister: false,
            RegisterUser: {
                name: '',
                pass: '',
                confirmPass: ''
            },
            rules: {
                // 用户校验规则 validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
                name: [{ validator: validateName, trigger: "blur" }], // 账号验证方法和触发方式
                pass: [{ validator: validatePass, trigger: "blur" }],// 密码验证
                confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }] // 确认密码校验
            }
        }
    },
    watch: {
        // 当点击按钮时 传过来的register的值会变成ture 使用watch监听这个这个数据的变化 
        // 当数据发生变化时 会调用下面这个函数 并传过来ture这个参数  让子组件中的isRegister也变成ture 弹出对话框
        // 当我们关闭对话框时 会发现此时子组件中的isRegister又变成了false 此时我们需要监听isRegister的变化
        // 当isRegister变为false时 调用第二个函数 触发在父组件中定义的fromChild事件 向父组件传ture这个参数 
        // 使父组件中的register的值变为ture

        // val : ture
        // 监听了父组件传过来的的值 设置this.isRegister的值
        register: function (val) {
            if (val) {
                this.isRegister = val
            }
        },
        //    TODO 告诉父组件val发生变化 让父组件决定去做些什么
        isRegister: function (val) {
            if (!val) {
                // 注册完成之后 点击注册发现账号信息初始值还在  
                // 重置整个表单 回到初始值
                this.$refs['ruleForm'].resetFields()
                this.$emit("fromChild", val);
            }
        }
    },
    methods: {
        Register() {
            //对整个表单进行提交
            this.$refs['ruleForm'].validate(valid => {
                // 通过验证时开始注册
                if (valid) {
                    getRegisterModel(this.RegisterUser.name, this.RegisterUser.pass).then(res => {
                        // code 为001时注册成功
                        // 注册成功关闭注册组件
                        this.isRegister = false
                        // 弹出注册成功提示框
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style></style>
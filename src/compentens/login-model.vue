<!-- 项目登录组件 -->
<template>
    <el-dialog v-model="isLogin" title="登录" width="300px" center>
        <el-form ref="ruleForm" :model="LoginUser" :rules="rules" status-icon class="demo-ruleForm">
            <el-form-item prop="name">
                <el-input v-model="LoginUser.name" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input v-model="LoginUser.pass" prefix-icon="el-icon-view" type="password"
                    placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" style="width:100%;" class="btn" @click="Login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { loginUser } from '../service/index'
export default {
    data() {
        // 账号验证
        let validateName = (rule, value, callbcak) => {
            if (!value) {
                return callbcak(new Error('请输入用户名'))
            }
            const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
            if (userNameRule.test(value)) {
                this.$refs.ruleForm.validateField("checkPass");
                return callbcak()
            } else {
                return callbcak(new Error('"字母开头,长度5-16之间,允许字母数字下划线"'))
            }

        }
        // 密码验证
        let validatePass = (rule, value, callbcak) => {
            if (!value) {
                return callbcak(new Error('请输入密码'))
            }
            const passwordRule = /^[a-zA-Z]\w{5,17}$/;
            if (passwordRule.test(value)) {
                this.$refs.ruleForm.validateField('checkPass')
                return callbcak()
            } else {
                return callbcak(new Error('字母开头,长度5-16之间,允许字母数字下划线'))
            }
        }

        return {
            isLogin: false,
            LoginUser: {
                name: '',
                pass: ''
            },
            rules: {
                name: [{ validator: validateName, trigger: "blur" }], // 账号验证方法和触发方式
                pass: [{ validator: validatePass, trigger: "blur" }],// 密码验证
            }
        }
    },
    computed: {
        // 获取vuex中的showLogin，vuex中的状态发生变化时 可以控制登录组件
        isLogin: {
            get() {
                return this.$store.getters.getShowLogin;
            },
            set(val) {
                this.$refs["ruleForm"].resetFields();
                this.$store.commit('setShowLogin', val)
            }
        }
    },
    methods: {
        Login() {
            //  validate: 对整个表单校验方法
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    loginUser(this.LoginUser.name, this.LoginUser.pass).then(res => {
                        if (res.data.code == '001') {
                            this.isLogin = false
                            // 登录信息存到本地
                            let user = JSON.stringify(res.data.user);
                            localStorage.setItem("user", user);
                            // 触发自定义事件将登录信息传送给父组件
                            this.$store.commit('setUser', res.data.user)
                        } else {
                            this.$refs.ruleForm.resetFields()
                        }
                    })
                }
            })
        }
    }
}

</script>
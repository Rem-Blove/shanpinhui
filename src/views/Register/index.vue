<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          autocomplete="on"
          v-model="phone"
          type="text"
          placeholder="请输入你的手机号"
          name="phone"
          v-validate="{ required: true, regex: /^(?:(?:\+|00)86)?1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first('phone') }}</span>
        <span style="color: slategray">手机号至少11位且1开头</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          v-model="code"
          type="text"
          placeholder="请输入验证码"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          v-model="password"
          type="password"
          placeholder="请输入你的登录密码"
          name="password"
          v-validate="{
            required: true,
            regex:
              /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{6,18}/,
          }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first('password') }}</span>
        <span style="color: slategray"
          >密码6~18且包含大写、小写字母、特殊字符、数字</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          v-model="password1"
          type="password"
          placeholder="请输入你的确认密码"
          name="password1"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first('password1') }}</span>
        <span style="color: slategray">与登录密码一致即可</span>
      </div>
      <div class="controls">
        <!-- <input name="m1" type="checkbox" :checked="agree" /> -->
        <input
          v-model="agree"
          type="checkbox"
          name="agree"
          v-validate="{ required: true, 'tongyi': true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('agree') }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: true
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        this.phone &&
          (await this.$store.dispatch('getRegisterCode', this.phone))
        this.code = this.$store.state.User.code
      } catch (error) {
        alert(error.message)
      }
    },
    // 注册账号
    async userRegister() {
      const success = await this.$validator.validateAll()
      // 表单验证通过发请求
      if (success) {
        const { phone, code, password } = this
        try {
          await this.$store.dispatch('RegisterUser', { phone, code, password })
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>

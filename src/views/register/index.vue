<template>
  <div class="login-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('register.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          :placeholder="$t('register.email')"
          name="email"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          :placeholder="$t('register.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="confirmPassword"
          v-model="registerForm.confirmPassword"
          :type="passwordType"
          :placeholder="$t('register.confirmPassword')"
          name="confirmPassword"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >
        {{ $t('register.register') }}
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vuex'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import LangSelect from '@/components/LangSelect/index.vue'

@Component({
  components: {
    LangSelect
  }
})
export default class Register extends Vue {
  private registerForm = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  private passwordType = 'password'
  private loading = false
  private showDialog = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  private mounted() {
    if (this.registerForm.email === '') {
      ;(this.$refs.email as Input).focus()
    } else if (this.registerForm.password === '') {
      ;(this.$refs.password as Input).focus()
    }
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      ;(this.$refs.password as Input).focus()
    })
  }

  private async handleRegister() {
    try {
      this.loading = true
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        return alert('Password confirmation does not match')
      }
      await UserModule.Register(this.registerForm)
      this.loading = false
      this.$router.push({
        path: this.redirect || '/',
        query: this.otherQuery
      })
    } catch (error) {
      this.loading = false
    }
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce(
      (acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      },
      {} as Dictionary<string>
    )
  }
}
</script>

<style lang="scss">
@import 'src/styles/variables.scss';

@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

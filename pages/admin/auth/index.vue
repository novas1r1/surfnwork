<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <label>E-Mail</label>
          <b-form-input type="text" v-model="email"
            >E-Mail Addresse</b-form-input
          >
        </div>
        <div class="input-control">
          <label>Passwort</label>
          <b-form-input type="password" v-model="password"
            >E-Mail Addresse</b-form-input
          >
        </div>
        <b-button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</b-button>
        <!--<b-button
          type="button"
          variant="outline-dark"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}
        </b-button>-->
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/admin');
        });
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>

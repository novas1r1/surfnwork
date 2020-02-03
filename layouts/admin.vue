<template>
  <div>
    <section class="new-post">
      <b-button @click="$router.push('/')" variant="outline-light"
        >Zum Blog
      </b-button>
      <b-button @click="$router.push('/admin/new-post')" variant="outline-light"
        >Neuer Eintrag
      </b-button>
      <b-button @click="onLogout" variant="outline-light">Logout </b-button>
    </section>
    <nuxt />
  </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth');
    }
  }
};
</script>
<style>
body {
  margin: 0;
}

.new-post {
  background-color: black;
  padding: 20px;
  text-align: center;
}

.existing-posts {
  width: 60%;
  padding-top: 40px;
  margin: auto;
}
</style>

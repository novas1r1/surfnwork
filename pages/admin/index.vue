<template>
  <b-container>
    <h1>Bisherige Posts</h1>
    <PostList isAdmin :posts="loadedPosts" v-if="loadedPosts.length > 0" />
    <p v-else>
      Gähnende Leere... Jetzt wirds aber höchste Zeit mal was zu schreiben!
    </p>
  </b-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth');
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>

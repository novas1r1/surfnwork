<template>
  <b-container>
    <h1>Beitrag bearbeiten</h1>
    <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
  </b-container>
</template>

<script>
import axios from 'axios';
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: { AdminPostForm },
  asyncData(context) {
    return axios
      .get(
        'https://surfnwork-blog.firebaseio.com/posts/' +
          context.params.postId +
          '.json'
      )
      .then(res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch(error => context.error(error));
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost).then(() => {
        this.$router.push('/admin');
      });
    }
  }
};
</script>

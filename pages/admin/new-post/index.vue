<template>
    <b-container>
      <AdminPostForm @submit="onSubmitted" />
    </b-container>
</template>

<script>
import axios from 'axios';
import AdminPostForm from '@/components/Admin/AdminPostForm';
import Quill from 'quill';

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch('addPost', postData).then(() => {
        this.$router.push('/admin');
      });
    }
  }
};
</script>

<style scoped>
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

<template>
  <form @submit.prevent="onSave">
    <div class="input-control">
      <label>Autor</label>
      <b-form-input type="text" v-model="editedPost.author" />
    </div>

    <div class="input-control">
      <label>Überschrift</label>
      <b-form-input type="text" v-model="editedPost.title" />
    </div>

    <div class="input-control">
      <label>Thumbnail Link</label>
      <b-form-input type="text" v-model="editedPost.thumbnailLink" />
    </div>

    <div class="input-control">
      <label>Text</label>
      <client-only>
        <div
          class="quill-editor"
          :content="editedPost.content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption"
        ></div>
      </client-only>
    </div>

    <div class="input-control">
      <label>Zusammenfassung</label>
      <b-form-textarea rows="3" v-model="editedPost.previewText" />
    </div>

    <div class="input-control">
      <label>Datum</label>
      <b-form-input type="date" v-model="editedPost.created"
        >Datum</b-form-input
      >
    </div>

    <b-button variant="outline-dark" type="submit">Speichern</b-button>

    <b-button type="button" variant="danger" @click="onCancel"
      >Abbrechen
    </b-button>
  </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['image']
          ]
          // imageResize: true
        }
      },
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            created: '',
            updated: '',
            thumbnailLink: '',
            previewText: '',
            content: ''
          }
    };
  },
  methods: {
    onSave() {
      // save post to firebase
      this.$emit('submit', this.editedPost);
    },
    onCancel() {
      this.$router.push('/admin');
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor);
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor);
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor);
    },
    onEditorChange({ editor, html, text }) {
      this.editedPost.content = html;
    }
  }
};
</script>

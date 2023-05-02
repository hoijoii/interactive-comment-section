<template>
  <div id="alert" v-if="dialogsStore.dialogs.length !== 0">
    <alert-modal />
  </div>
  <div id="container">    
    <div class="comment-list mg-tb12" v-for="(comment, idx) in commentsStore.comments" :key="idx">
      <comment-component 
        :id="idx"
        :content="comment.content"
        :createdAt="comment.createdAt"
        :score="comment.score"
        :user="comment.user"
        :replies="comment.replies"
      />
    </div>
    <input-form />
  </div>
</template>

<script lang="ts" setup>
import CommentComponent from '@/components/CommentComponent.vue'
import AlertModal from '@/components/AlertModal.vue'
import InputForm from '@/components/InputForm.vue'
import { useCommentsStore } from '@/stores/comments'
import { useDialogsStore } from './stores/dialogs'

// pinia stores
const commentsStore = useCommentsStore()
const dialogsStore = useDialogsStore()

// filters
</script>

<style lang="scss">
@import '@/assets/scss/default.scss';
@import '@/assets/scss/commons.scss';
</style>
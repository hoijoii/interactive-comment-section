<template>
  <div id="container">
    <div class="mg-tb12" v-for="(comment, idx) in commentsStore.comments" :key="idx">
      <comment-component 
        :id="idx"
        :content="comment.content"
        :createdAt="comment.createdAt"
        :score="comment.score"
        :user="comment.user"
        :replies="comment.replies"
      />
    </div>
    <div class="my-comment comment">
      <div>
        <img class="my-profile" :src="require(`@/assets/images/avatars/${commentsStore.currentUser.image.png}`)">
      </div>
      <div>
        <textarea placeholder="Add a comment ..." />
      </div>
      <div>
        <button class="submit-btn">SEND</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommentComponent from '@/components/CommentComponent.vue'
import { useCommentsStore } from '@/stores/comments'
import { IComment, IUser } from './types/comments'

const commentsStore = useCommentsStore()

</script>

<style lang="scss">
@import '@/assets/scss/default.scss';
@import '@/assets/scss/commons.scss';
</style>
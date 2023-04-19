<template>
  <div id="container">
    <comment-component 
        v-for="(comment, idx) in comments" :key="idx"
        :id="idx"
        :content="comment.content"
        :createdAt="comment.createdAt"
        :score="comment.score"
        :user="comment.user"
        :replies="comment.replies"
        class="comment-com"
    />
  </div>
</template>

<script lang="ts" setup>
import CommentComponent from '@/components/CommentComponent.vue'
import { useCommentsStore } from '@/stores/comments'
import { IComment, IUser } from './types/comments'

const commentsStore = useCommentsStore()

const comments: Array<IComment> = commentsStore.data.comments
const currentUser: IUser = commentsStore.data.currentUser

</script>

<style lang="scss">
@import '@/assets/scss/default.scss';
@import '@/assets/scss/commons.scss';
</style>
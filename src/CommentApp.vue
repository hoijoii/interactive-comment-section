<template>
  <div id="container">
    <div class="mg-tb12" v-for="(comment, idx) in commentsStore.comments" :key="idx">
      <comment-component 
        :id="idx"
        :content="comment.content"
        :createdAt="setDateFormat(comment.createdAt)"
        :score="comment.score"
        :user="comment.user"
        :replies="comment.replies"
      />
    </div>
    <div class="my-comment comment">
      <div class="image">
        <img class="my-profile" :src="require(`@/assets/images/avatars/${commentsStore.currentUser.image.png}`)">
      </div>
      <div>
        <textarea placeholder="Add a comment ..." v-model="newContent"/>
      </div>
      <div>
        <button class="submit-btn" @click="submit">SEND</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommentComponent from '@/components/CommentComponent.vue'
import { useCommentsStore } from '@/stores/comments'
import { onMounted, reactive, ref, Ref } from 'vue'
import { IComment, IUser, IReplies } from './types/comments'
import moment from 'moment'
import StringUtils from '@/utils/string-utils'

// pinia stores
const commentsStore = useCommentsStore()

// filters
const setDateFormat = (date: string) => {
  return StringUtils.dateFormat(date)
}

const newContent: Ref<string> = ref('')

const submit = () => {
  let newComment : IComment = {
    id: commentsStore.comments[commentsStore.comments.length-1].id + 1,
    content: newContent.value,
    createdAt: moment().format('YYYY-MM-DD HH:mm'),
    score: 0,
    user: commentsStore.currentUser,
    replies: []
  }

  commentsStore.addComment(newComment)
  newContent.value = ''
} 

onMounted(()=>{
})

</script>

<style lang="scss">
@import '@/assets/scss/default.scss';
@import '@/assets/scss/commons.scss';
</style>
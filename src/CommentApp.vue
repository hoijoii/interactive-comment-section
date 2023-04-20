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
        <textarea placeholder="Add a comment ..." v-model="content"/>
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
import { onMounted, reactive, ref, Ref } from 'vue'
import { IComment, IUser } from './types/comments'
import moment from 'moment'
import StringUtils from '@/utils/string-utils'

const commentsStore = useCommentsStore()
const comments = commentsStore.comments

const content: Ref<string> = ref('')
const newComment = reactive({
  id: comments.indexOf(comments[comments.length]) + 1,
  content: '',
  createdAt: moment(),

})

const submit = () => {
  
}

const setDateFormat = (date: string) => {
  return StringUtils.dateFormat(date)
}

onMounted(()=>{
  setDateFormat('2020')
})

</script>

<style lang="scss">
@import '@/assets/scss/default.scss';
@import '@/assets/scss/commons.scss';
</style>
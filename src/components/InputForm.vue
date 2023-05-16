<template>
  <div>
    <div class="my-comment comment input">
      <div class="image">
        <img class="my-profile" :src="require(`@/assets/images/avatars/${commentsStore.currentUser.image.png}`)">
      </div>
      <div class="add-text">
        <textarea placeholder="Add a comment ..." v-model="newContent"/>
      </div>
      <div class="image submit">
        <img class="hidden-profile" :src="require(`@/assets/images/avatars/${commentsStore.currentUser.image.png}`)">
        <button class="submit-btn" @click="submit">SEND</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useCommentsStore } from '@/stores/comments';
import { IComment, IReplies } from '@/types/comments';
import { ref, Ref } from 'vue'
import moment from 'moment'

// stores
const commentsStore = useCommentsStore()

// props & emits
const props = defineProps({
  comment_id: Number,
  isReply: Boolean,
  replyOption: Object
})

const emit = defineEmits(['submit'])

// Add comment & reply
const newContent: Ref<string> = ref('')

const submit = () => {
  props.isReply ? sendReply() : sendComment()
  emit('submit')
}

const sendComment = () => {
  let newComment: IComment = {
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

const sendReply = () => {
  let target = commentsStore.findComment(props.comment_id)
  let newComment : IReplies = {
    id: target && target.replies.length !== 0 ? target.replies[target?.replies.length-1].id+1 : 1,
    content: newContent.value,
    createdAt: moment().format('YYYY-MM-DD HH:mm'),
    score: 0,
    replyingTo: props.replyOption ? props.replyOption.replyingTo : target.user.username, //props.replyingTo ? props.replyingTo : 
    user: commentsStore.currentUser,
  }

  commentsStore.addReply(props.comment_id, newComment)
  newContent.value = ''
} 

</script>
<template>
  <div class="msg">
    <div class="pop-up">
      <div class="title">Delete comment</div>
      <div class="warning grayish-blue">
        Are you sure you want to delete this comment? 
        This will remove the comment and can't be undone.
      </div>
      <div class="btns">
        <button class="no">NO, CANCEL</button>
        <button class="yes" @click="deleteComment">YES, DELETE</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useCommentsStore } from '@/stores/comments';

const commentsStore = useCommentsStore()

const deleteComment = () => {
  commentsStore.deletePopup = false
  commentsStore.deleteComment()
}
</script>
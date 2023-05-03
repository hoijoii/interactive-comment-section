<template>
  <div class="msg">
    <div class="pop-up">
      <div class="title">{{ dialog.title }}</div>
      <div class="warning grayish-blue">
        {{ dialog.message }}
      </div>
      <div class="btns" v-if="dialog.type === DIALOG_TYPE.CONFIRM">
        <button class="no" @click="onClose">NO, CANCEL</button>
        <button class="yes" @click="deleteComment">YES, DELETE</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useCommentsStore } from '@/stores/comments';
import { useDialogsStore } from '@/stores/dialogs';
import { DIALOG_TYPE } from '@/types/dialogs';

const commentsStore = useCommentsStore()
const dialogsStore = useDialogsStore()
const dialog = dialogsStore.dialogs[0]

const deleteComment = () => {
  !dialog.target.reply_id ? commentsStore.deleteComment(dialog.target) : commentsStore.deleteReply(dialog.target)
  onClose()
}

const onClose = () => {
  dialogsStore.removeDialog(dialog.id)
}
</script>
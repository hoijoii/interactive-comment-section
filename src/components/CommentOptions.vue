<template>
  <div class="buttons mg-auto">
    <div class="not-me reply" v-if="user.username !== commentsStore.currentUser.username">
      <button class="reply-btn top-btn" @click="emit('replyBtn')">
        <ReplyIcon />
        <!-- <inline-svg :src="require('../assets/images/icon-reply.svg')" /> -->
        <span class="mg-lft7">Reply</span>
      </button>
    </div>
    <div class="my-btn" v-else>
      <button class="delete top-btn" @click="deleteBtn">
        <DeleteIcon />
        <!-- <inline-svg :src="require('../assets/images/icon-delete.svg')" /> -->
        <span class="mg-lft7">Delete</span>
      </button>
      <button class="edit top-btn mg-lft13" @click="emit('editBtn')">
        <EditIcon />
        <!-- <inline-svg :src="require('../assets/images/icon-edit.svg')" /> -->
        <span class="mg-lft7">Edit</span>
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import InlineSvg from 'vue-inline-svg'
import { useCommentsStore } from '@/stores/comments'
import { useDialogsStore } from '@/stores/dialogs';
import { defineEmits } from 'vue';
import { DIALOG_TYPE } from '@/types/dialogs';
import ReplyIcon from '@/assets/images/icon-reply.svg'
import DeleteIcon from '@/assets/images/icon-delete.svg'
import EditIcon from '@/assets/images/icon-edit.svg'

// stores
const commentsStore = useCommentsStore()
const dialogsStore = useDialogsStore()

// props & emits
const props = defineProps({
  comment_id: Number,
  reply_id: Number,
  user: {
    Type: Object,
    default: {
      image: { png: '', webp: ''},
      username: ''
    }
  },
  isReply: Boolean
})

const emit = defineEmits(['replyBtn', 'editBtn'])

// delete comment
const deleteBtn = () => {
  dialogsStore.addDialog({
    id: "DELETE_COMMENT",
    title: "Delete comment",
    message: "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
    type: DIALOG_TYPE.CONFIRM,
    target: {
      comment_id: props.comment_id,
      reply_id: props.reply_id ? props.reply_id : 0
    }
  })
}

</script>
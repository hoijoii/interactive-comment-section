<template>
  <div class="buttons mg-auto">
    <div class="not-me reply" v-if="user.username !== commentsStore.currentUser.username">
      <button class="reply-btn top-btn" @click="emit('replyBtn')">
        <inline-svg :src="require('@/assets/images/icon-reply.svg')" />
        <span class="mg-lft7">Reply</span>
      </button>
    </div>
    <div class="my-btn" v-else>
      <button class="delete top-btn" @click="emit('deleteBtn')">
        <inline-svg :src="require('@/assets/images/icon-delete.svg')" />
        <span class="mg-lft7">Delete</span>
      </button>
      <button class="edit top-btn mg-lft13" @click="emit('editBtn')">
        <inline-svg :src="require('@/assets/images/icon-edit.svg')" />
        <span class="mg-lft7">Edit</span>
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import InlineSvg from 'vue-inline-svg'
import { useCommentsStore } from '@/stores/comments'
import { defineEmits } from 'vue';

const commentsStore = useCommentsStore()

const props = defineProps({
  content: String,
  createdAt: String,
  score: Number,
  user: {
    Type: Object,
    default: {
      image: { png: '', webp: ''},
      username: ''
    }
  },
  replyingTo: String,
  isReply: Boolean
})

const emit = defineEmits(['replyBtn', 'deleteBtn', 'editBtn'])

</script>
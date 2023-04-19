<template>
  <div class="comment">
    <div class="comment-content">
      <div class="score">
        <div class="score-wrapper">
          <inline-svg :src="require('@/assets/images/icon-plus.svg')" />
          <div class="num">{{ score }}</div>
          <inline-svg :src="require('@/assets/images/icon-minus.svg')"/>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="top">
          <img :src="require(`@/assets/images/avatars/${user.image.png}`)" class="profile"/>
          <div class="mg-lft13">{{ user.username }}</div>
          <div class="mg-lft13 grayish-blue">{{ createdAt }}</div>
          <div class="reply mg-auto" v-if="user.username !== commentsStore.currentUser.username">
            <button class="reply-btn">
              <inline-svg :src="require('@/assets/images/icon-reply.svg')" />
              <span class="mg-lft7">Reply</span>
            </button>
          </div>
        </div>
        <div class="body">
          <div class="text grayish-blue">{{ content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps } from 'vue'
import InlineSvg from 'vue-inline-svg'
import { useCommentsStore } from '@/stores/comments'

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
})
</script>

<style lang="scss">

</style>
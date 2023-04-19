<template>
  <div id="container" class="comment">
    <div class="content">
      <div class="score">
        <div class="score-wrapper">
          <div><img src="@/assets/images/icon-plus.svg"></div>
          <div class="num">{{ score }}</div>
          <div><img src="@/assets/images/icon-minus.svg"></div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="top">
          <img :src="require(`@/assets/images/avatars/${user.image.png}`)" class="profile"/>
          <div class="mg-lft8">{{ user.username }}</div>
          <div class="created-at mg-lft8">{{ createdAt }}</div>
          <button class="reply-btn">
            <img src="@/assets/images/icon-reply.svg">
            <span class="mg-lft8">Reply</span>
          </button>
        </div>
        <div class="body">
          <div class="text">{{ content }}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps } from 'vue'

const props = defineProps({
  id: Number,
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
  replies: {
    Type: Array,
    default: () => [{
      id: 0,
      content: '',
      createdAt: '',
      score: 0,
      replyingTo: '',
      user: {},
    }]
  }
})


</script>
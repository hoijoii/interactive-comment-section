<template>
  <div>
    <div class="comment-area">
      <comment-layout
        :content=content
        :createdAt="createdAt"
        :score="score"
        :user="user"
      />
    </div>
    <div class="wrapper">
      <div class="reply-area" v-if="replies.length !== 0">
        <comment-layout 
            v-for="(reply, idx) in replies" :key="idx"
            :content="reply.content"
            :createdAt="reply.createdAt"
            :score="reply.score"
            :user="reply.user"
            :replyingTo="reply.replyingTo"
            :isReply="true"
            class="comment"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps } from 'vue'
import InlineSvg from 'vue-inline-svg'
import { useCommentsStore } from '@/stores/comments'
import CommentLayout from './CommentLayout.vue'

const commentsStore = useCommentsStore()

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
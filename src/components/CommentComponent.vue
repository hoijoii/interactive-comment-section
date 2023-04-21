<template>
  <div>
    <div class="comment-area">
      <comment-layout
        :content=content
        :createdAt="createdAt"
        :score="score"
        :user="user"
        ref="refEditContent"
        @update="updateComment(id+1, edit)"
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
            ref="refEditContent"
            @update="updateComment()"
            class="comment"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps, computed } from 'vue'
import InlineSvg from 'vue-inline-svg'
import { useCommentsStore } from '@/stores/comments'
import CommentLayout from './CommentLayout.vue'

const commentsStore = useCommentsStore()

const refEditContent: Ref<any> = ref(null)

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

const testEmit = () => {
  console.log('emit')
}

const edit = computed(() => refEditContent.value.editContent)

const updateComment = (comment_id: number, comment_content?: string, reply_id?: number, reply_content?: string) => {
  console.log('component: ', comment_content)
  commentsStore.updateComment(comment_id, comment_content, reply_id, reply_content)
}

</script>
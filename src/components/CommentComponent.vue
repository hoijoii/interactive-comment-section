<template>
  <div>
    <div class="comment-area">
      <comment-layout
        :content=content
        :createdAt="createdAt"
        :score="score"
        :user="user"
        ref="refEditContent"
        @update="updateComment(id+1, edit())"
        @delete="deleteComment()"
        @plus="updateScore('plus', id+1)"
        @minus="updateScore('minus', id+1)"
      />
    </div>
    <div class="wrapper">
      <div class="reply-area" v-if="replies.length !== 0">
        <div v-for="(reply, idx) in replies" :key="idx">
          <comment-layout 
            :content="reply.content"
            :createdAt="reply.createdAt"
            :score="reply.score"
            :user="reply.user"
            :replyingTo="reply.replyingTo"
            :isReply="true"
            ref="refEditContent"
            @update="updateComment(id+1, '', reply.id, edit(reply.id))"
            @delete="deleteComment(id+1, reply.id)"
            @plus="updateScore('plus', id+1, reply.id)"
            @minus="updateScore('minus', id+1, reply.id)"
            class="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps, computed } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import CommentLayout from './CommentLayout.vue'
import _ from 'lodash'

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
const edit = (reply_id?:number): string =>{
  // If comment component is case of reply, refEditContent is Array => [ {editContent: ''}, {editContent: ''} ]
  return refEditContent.value.editContent ? refEditContent.value.editContent
                                        : refEditContent.value[_.findIndex(props.replies, { 'id': reply_id })].editContent
}

const updateComment = (comment_id: number, comment_content?: string, reply_id?: number, reply_content?: string) => {
  commentsStore.updateComment(comment_id, comment_content, reply_id, reply_content)
}

// Delete action is in AlertComponent.vue
const deleteComment = (comment_id:number, reply_id?:number) => {
  commentsStore.deletePopup = true
  commentsStore.target = { comment_id: comment_id, reply_id: reply_id }
}

const updateScore = (operate:string, comment_id:number, reply_id?:number) => {
  commentsStore.pmScore(operate, comment_id, reply_id)
}

</script>
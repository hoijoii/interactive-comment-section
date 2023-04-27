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
        @reply="replyActive=!replyActive"
      />
    </div>
    <div class="wrapper">
      <div class="reply-area" v-if="replies.length !== 0 || replyActive">
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
            @delete="deleteComment(reply.id)"
            @plus="updateScore('plus', id+1, reply.id)"
            @minus="updateScore('minus', id+1, reply.id)"
            @reply="replyActive=!replyActive"
            class="comment"
          />
        </div>
        <div class="add-reply" v-if="replyActive">
          <div class="my-comment comment input">
            <div class="image">
              <img class="my-profile" :src="require(`@/assets/images/avatars/${commentsStore.currentUser.image.png}`)">
            </div>
            <div class="add-text">
              <textarea :placeholder="'@'+commentsStore.commenter" v-model="replyContent"/>
            </div>
            <div>
              <button class="submit-btn" @click="sendReply">SEND</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps, computed } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import CommentLayout from './CommentLayout.vue'
import { IComment, IReplies } from '@/types/comments'
import moment from 'moment'
import _ from 'lodash'
import { classPrivateMethod } from '@babel/types'

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

// Variables & methods of comments
const edit = (reply_id?:number): string =>{
  // If comment component is case of reply, refEditContent is Array => [ {editContent: ''}, {editContent: ''} ]
  return refEditContent.value.editContent ? refEditContent.value.editContent
                                        : refEditContent.value[_.findIndex(props.replies, { 'id': reply_id })].editContent
}

const updateComment = (comment_id: number, comment_content?: string, reply_id?: number, reply_content?: string) => {
  commentsStore.updateComment(comment_id, comment_content, reply_id, reply_content)
}

// Delete action is in AlertComponent.vue
const deleteComment = (reply_id?:number) => {
  commentsStore.deletePopup = true
  commentsStore.target = { comment_id: props.id+1, reply_id: reply_id }
}

const updateScore = (operate:string, comment_id:number, reply_id?:number) => {
  commentsStore.pmScore(operate, comment_id, reply_id)
}


// Variables & methods of reply
const replyActive: Ref<boolean> = ref(false)
const replyContent : Ref<string | any> = ref()

const sendReply = () => {
  let target = commentsStore.findComment(props.id+1)
  let newComment : IReplies = {
    id: target && target.replies.length !== 0 ? target.replies[target?.replies.length-1].id+1 : 1,
    //id: commentsStore.comments[commentsStore.comments.length-1].id + 1,
    content: replyContent.value,
    createdAt: moment().format('YYYY-MM-DD HH:mm'),
    score: 0,
    replyingTo: commentsStore.commenter,
    user: commentsStore.currentUser,
  }

  commentsStore.addReply(props.id+1, newComment)

  replyContent.value = ''
  replyActive.value = false
} 

</script>
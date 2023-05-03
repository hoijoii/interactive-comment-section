<template>
  <div>
    <div class="comment-area">
      <div class="comment">
        <div class="comment-content">

          <div class="score">
            <div class="score-wrapper">
              <inline-svg :src="require('@/assets/images/icon-plus.svg')" @click="commentsStore.pmScore('plus', id)"/>
              <div class="num">{{ score }}</div>
              <inline-svg :src="require('@/assets/images/icon-minus.svg')" @click="commentsStore.pmScore('minus', id)" />
            </div>
          </div>

          <div class="content-wrapper">
            <div class="top">
              <img :src="require(`@/assets/images/avatars/${user.image.png}`)" class="profile"/>
              <div class="mg-lft13 name">{{ user.username }}</div>
              <div v-if="user.username === commentsStore.currentUser.username" class="mg-lft13 you">you</div>
              <div class="mg-lft13 grayish-blue">{{ setDateFormat(createdAt) }}</div>

              <comment-options 
                :user="user"
                :comment_id="id"
                @replyBtn="replyFormShow = !replyFormShow"
                @editBtn="editFormShow = !editFormShow"
              />
            </div>

            <div class="body">
              <div class="text grayish-blue" v-if="!editFormShow">{{ content }}</div>
              <div v-else class="edit-input">
                <textarea class="edit-area" v-model="editContent"/>
                <button class="submit-btn update mg-auto" @click="updateBtn">UPDATE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="reply-area">
        <div v-if="replies.length !== 0">
          <reply-component v-for="reply in replies" :key="reply.id"
            :comment_id="id"
            :id="reply.id"
            :content="reply.content"
            :createdAt="reply.createdAt"
            :score="reply.score"
            :user="reply.user"
            :replyingTo="reply.replyingTo"
          />
        </div>
        <div v-if="replyFormShow" class="add-reply">
          <input-form 
            :comment_id="id"
            :isReply=true
            @submit="replyFormShow = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps, computed } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import CommentOptions from './CommentOptions.vue'
import InputForm from './InputForm.vue'
import ReplyComponent from './ReplyComponent.vue'
import StringUtils from '@/utils/string-utils'
import InlineSvg from 'vue-inline-svg'
import _ from 'lodash'

// stores
const commentsStore = useCommentsStore()

// props & emits
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

// filters
const setDateFormat = (date: string) => {
  return StringUtils.dateFormat(date)
}

// Variables & methods of updating comment

const replyFormShow : Ref<boolean> = ref(false)
const editFormShow: Ref<boolean> = ref(false)

const editContent: Ref<string> = ref(props.content)

const updateBtn = () => {
  commentsStore.updateComment(props.id, editContent.value)
  editFormShow.value = false
}

</script>
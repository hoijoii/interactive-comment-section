<template>
  <div>
    <div class="comment">
      <div class="comment-content">
        <div class="score flex-item">
          <div class="score-wrapper">
            <inline-svg :src="require('@/assets/images/icon-plus.svg')" @click="commentsStore.pmScore('plus', comment_id, id)" class="plus" />
            <div class="num">{{ score }}</div>
            <inline-svg :src="require('@/assets/images/icon-minus.svg')" @click="commentsStore.pmScore('minus', comment_id, id)" class="minus" />
          </div>

          <comment-options 
                  :user="user"
                  :comment_id="comment_id"
                  :reply_id="id"
                  @replyBtn="replyFormShow = !replyFormShow"
                  @editBtn="editFormShow = !editFormShow"
                  class="options"
            />
        </div>

        <div class="content-wrapper">
          <div class="top">
            <img :src="require(`@/assets/images/avatars/${user.image.png}`)" class="profile"/>
            <div class="mg-lft13 name">{{ user.username }}</div>
            <div v-if="user.username === commentsStore.currentUser.username" class="mg-lft13 you">you</div>
            <div class="mg-lft13 grayish-blue">{{ setDateFormat(createdAt) }}</div>

            <comment-options 
                  :user="user"
                  :comment_id="comment_id"
                  :reply_id="id"
                  @replyBtn="replyFormShow = !replyFormShow"
                  @editBtn="editFormShow = !editFormShow"
                  class="options"
            />
          </div>
          <div class="body">
            <div class="text grayish-blue" v-if="!editFormShow">
              <span class="replying-to">@{{ replyingTo }}</span>
              {{ content }}
            </div>
            <div v-else class="edit-input">
              <textarea class="edit-area" v-model="editContent"/>
              <button class="submit-btn update mg-auto" @click="updateBtn">UPDATE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <div class="add-reply" v-if="replyFormShow">
        <input-form
          :comment_id="comment_id"
          :isReply=true
          @submit="replyFormShow=false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps, defineEmits, watch } from 'vue'
import CommentOptions from './CommentOptions.vue'
import InputForm from './InputForm.vue'
import InlineSvg from 'vue-inline-svg'
import { useCommentsStore } from '@/stores/comments'
import StringUtils from '@/utils/string-utils'

// pinia stores
const commentsStore = useCommentsStore()

// props & emits
const props = defineProps({
  comment_id: Number,
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
  replyingTo: String,
})

const emit = defineEmits(['plus', 'minus'])

// filter
const setDateFormat = (date: string) => {
  return StringUtils.dateFormat(date)
}

// show or not input form
const replyFormShow: Ref<boolean> = ref(false)
const editFormShow: Ref<boolean> = ref(false)

const editContent: Ref<string> = ref(props.content)

// update button click event
const updateBtn = () => {
  commentsStore.updateReply(props.comment_id, props.id, editContent.value)
  editFormShow.value = false
}

</script>
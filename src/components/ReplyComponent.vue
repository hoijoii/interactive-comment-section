<template>
  <div>
    <div class="comment">
      <div class="comment-content">
        <div class="score">
          <div class="score-wrapper">
            <inline-svg :src="require('@/assets/images/icon-plus.svg')" @click="emit('plus')" />
            <div class="num">{{ score }}</div>
            <inline-svg :src="require('@/assets/images/icon-minus.svg')" @click="emit('minus')"/>
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
                  @replyBtn="replyFormShow = !replyFormShow"
            />
          </div>
          <div class="body">
            <div class="text grayish-blue">
              <span class="replying-to">@{{ replyingTo }}</span>
              {{ content }}
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

const commentsStore = useCommentsStore()

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

const setDateFormat = (date: string) => {
  return StringUtils.dateFormat(date)
}

const emit = defineEmits(['plus', 'minus'])

const replyFormShow: Ref<boolean> = ref(false)

/* watch(commentsStore.comments, () => {

}) */

</script>
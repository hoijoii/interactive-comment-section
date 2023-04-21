<template>
  <div :class="['comment', {'reply-space':isReply}]">
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
          <div class="mg-lft13 name">{{ user.username }}</div>
          <div v-if="user.username === commentsStore.currentUser.username" class="mg-lft13 you">you</div>
          <div class="mg-lft13 grayish-blue">{{ createdAt }}</div>

          <!-- buttons -->
          <div class="reply mg-auto" v-if="user.username !== commentsStore.currentUser.username">
            <button class="reply-btn top-btn">
              <inline-svg :src="require('@/assets/images/icon-reply.svg')" />
              <span class="mg-lft7">Reply</span>
            </button>
          </div>
          <div class="my-btn mg-auto" v-else>
            <button class="delete top-btn">
              <inline-svg :src="require('@/assets/images/icon-delete.svg')" />
              <span class="mg-lft7">Delete</span>
            </button>
            <button class="edit top-btn mg-lft13" @click="editActive = !editActive">
              <inline-svg :src="require('@/assets/images/icon-edit.svg')" />
              <span class="mg-lft7">Edit</span>
            </button>
          </div>
        </div>

        <div class="body">
          <div v-if="!editActive" class="text grayish-blue">
            <span v-if="replyingTo" class="replying-to">@{{ replyingTo }}</span>
            {{ content }}
          </div>
          <div v-else-if="editActive" class="edit-input">
            <textarea class="edit-area" v-model="editContent"/>
            <button class="submit-btn update mg-auto" @click="updateBtn(editContent)">UPDATE</button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Ref, defineProps, defineEmits } from 'vue'
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
  replyingTo: String,
  isReply: Boolean
})

const editActive : Ref<boolean> = ref(false)
const editContent : Ref<string | any> = ref(props.content)

defineExpose({
  editContent,
})

const emit = defineEmits(['update'])

const updateBtn = (editContent : string) => {
  emit('update', editContent)
  editActive.value = false
}


</script>

<style lang="scss">

</style>
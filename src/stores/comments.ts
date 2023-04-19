import { defineStore } from 'pinia'
import _ from 'lodash'
import { IComment, IComments, IReplies } from '@/types/comments'

export const useCommentsStore = defineStore('commentsStore', {
  state: () => ({
    data: _.cloneDeep(require('@/assets/data/data.json')) as IComments
  }),
  actions: {
    
  }
})
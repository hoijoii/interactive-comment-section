import { defineStore } from 'pinia'
import _ from 'lodash'
import { IComment, IComments, IReplies, IUser } from '@/types/comments'

export const useCommentsStore = defineStore('commentsStore', {
  state: () => ({
    currentUser: _.cloneDeep(require('@/assets/data/data.json')).currentUser as IUser,
    comments: _.cloneDeep(require('@/assets/data/data.json')).comments as Array<IComment>
  }),
  actions: {
    addComment(comment: IComment) {
      this.comments.push(comment)
    },

    updateComment(comment_id: number, comment_content?: string, reply_id?: number, reply_content?: string) {
      let comment : IComment | any = _.find(this.comments, { 'id': comment_id })
      console.log('store getComment: ', comment)
      console.log('store content: ', reply_content)

      if (comment_content) {
        comment.content = comment_content
      }
      if (reply_content) {
        console.log('=============store reply_content arrived==========')
        let reply : IReplies = _.find(comment.replies, { 'id' : reply_id })
        reply.content = reply_content
      }
      console.log(this.comments)
    }
  }
})
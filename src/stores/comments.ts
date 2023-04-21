import { defineStore } from 'pinia'
import _ from 'lodash'
import { IComment, IComments, IReplies, IUser } from '@/types/comments'

export const useCommentsStore = defineStore('commentsStore', {
  state: () => ({
    currentUser: _.cloneDeep(require('@/assets/data/data.json')).currentUser as IUser,
    comments: _.cloneDeep(require('@/assets/data/data.json')).comments as Array<IComment>
  }),
  actions: {
    findComment(comment_id : number) {
      return _.find(this.comments, { 'id': comment_id })
    },
    
    addComment(comment: IComment) {
      this.comments.push(comment)
    },

    updateComment(comment_id: number, comment_content?: string, reply_id?: number, reply_content?: string) {
      let comment : IComment | any = this.findComment(comment_id)

      if (comment_content) {
        comment.content = comment_content
      }
      if (reply_content) {
        let reply : IReplies = _.find(comment.replies, { 'id' : reply_id })
        reply.content = reply_content
      }
    },

    deleteComment(comment_id: number, reply_id?: number) {
      let comment : IComment | any = this.findComment(comment_id)
      
      if (!reply_id) this.comments.splice(comment.id-1, 1)
      else {
        let replyIdx : number = _.findIndex(comment.replies, { 'id': reply_id })
        comment.replies.splice(replyIdx, 1)
      }
    }
  }
})
import { defineStore } from 'pinia'
import _ from 'lodash'
import { IComment, IComments, IReplies, IUser } from '@/types/comments'

export const useCommentsStore = defineStore('commentsStore', {
  state: () => ({
    currentUser: _.cloneDeep(require('@/assets/data/data.json')).currentUser as IUser,
    comments: _.cloneDeep(require('@/assets/data/data.json')).comments as Array<IComment>,
    target: { 
      comment_id: 0,
      reply_id: 0
    } as any,
    deletePopup : false
  }),
  actions: {
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

    deleteComment() {
      let comment : IComment | any = this.findComment(this.target.comment_id)
      console.log(comment)
      
      if (!this.target.reply_id) this.comments.splice(comment.id-1, 1)
      else {
        let replyIdx : number = _.findIndex(comment.replies, { 'id': this.target.reply_id })
        comment.replies.splice(replyIdx, 1)
      }

      this.resetTarget()
    },

    pmScore(operate: string, comment_id: number, reply_id?: number) {
      let comment: IComment | any = this.findComment(comment_id)

      if (!reply_id) {
        operate === 'plus' ? comment.score += 1 
                      : (comment.score !== 0 ? comment.score -= 1 : comment.score = 0)
      } 
      else {
        let targetReply: IReplies = comment.replies[_.findIndex(comment.replies, { 'id': reply_id })]
        operate === 'plus' ? targetReply.score += 1 
                      : (targetReply.score !== 0 ? targetReply.score -= 1 : targetReply.score = 0)
      }
      
    },

    // utils
    findComment(comment_id : number) {
      return _.find(this.comments, { 'id': comment_id })
    },

    findReplyIdx(comment: IComment, reply_id : number) {

    },

    resetTarget() {
      this.target = { comment_id: 0, reply_id: 0 }
    }
  }
})
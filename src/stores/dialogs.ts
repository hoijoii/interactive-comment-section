import { IDialog } from '@/types/dialogs'
import { defineStore } from 'pinia'
import _ from 'lodash'

export const useDialogsStore = defineStore('dialogsStore', {
  state: () => ({
    dialogs: [] as Array<IDialog>
  }),
  actions: {
    addDialog(dialog: IDialog) {
      this.dialogs.push(dialog)
    },
    removeDialog(id: string) {
      const idx = _.findIndex(this.dialogs, { 'id': id })
      this.dialogs.splice(idx, 1)
    }
  }
})
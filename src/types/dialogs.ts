export enum DIALOG_TYPE {
  CONFIRM,
}

export declare interface IDialog {
  id: string
  title?: string
  message: string
  type: DIALOG_TYPE
  target: IDialogTarget
}

export declare interface IDialogTarget {
  comment_id: number,
  reply_id?: number
}
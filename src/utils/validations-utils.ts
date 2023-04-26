import { IComment, IReplies } from "@/types/comments"

export default class ValidationsUtils {

  public static instanceOfComment (object: IComment | IReplies): object is IComment | IReplies {
    return 'replies' in object
  }
}
import moment from 'moment'

export default class StringUtils {

  public static dateFormat(date?: string): string {
    return moment(date).fromNow()[0] === 'a' ? moment(date).fromNow().replace('a', '1') : moment(date).fromNow()
  }
}
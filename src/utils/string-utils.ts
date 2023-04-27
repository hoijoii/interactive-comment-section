import moment from 'moment'

export default class StringUtils {

  public static dateFormat(date?: string): string {
    if (date?.includes('ago')) return date
    else {
      if (moment(date).fromNow()[0] === 'a') {
        return moment(date).fromNow().includes('few') ? moment(date).fromNow() : moment(date).fromNow().replace('a', '1')
      }
      else {
        return moment(date).fromNow()
      }
    }
  }
}
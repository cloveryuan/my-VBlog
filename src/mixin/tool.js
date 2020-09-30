import dayjs from 'dayjs'
export default {
  filters:{
    date(value,format="YYYY-MM-DD HH:mm"){
      return dayjs(value).format(format)
    }
  }
}
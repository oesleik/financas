module.exports = {
  preco (value) {
    value = value.toFixed(2).split('.')
    return 'R$ ' + value[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + value[1]
  },

  data (value) {
    var date = new Date(value)
    return ('0' + date.getDate()).substr(-2) + '/' + ('0' + (date.getMonth() + 1)).substr(-2) + '/' + date.getFullYear()
  }
}

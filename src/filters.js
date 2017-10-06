module.exports = {
  preco (value) {
    value = value.toFixed(2).split('.')
    return 'R$ ' + value[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + value[1]
  }
}

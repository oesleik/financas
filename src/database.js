import Dexie from 'dexie'
const database = new Dexie('financas')

database.version(1).stores({
  contatos: '++id,&nome',
  lancamentos: '++id,id_contato,valor'
})

export default database

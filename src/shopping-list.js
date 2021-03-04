require('dotenv').config()

const knex = require('knex')
const ShoppingListsService = require('./shopping-list-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

// use all the ShoppingListsService methods!!
ShoppingListsService.getAllShoppingLists(knexInstance)
  .then(items => console.log(items))
  .then(() =>
    ShoppingListsService.insertShoppingList(knexInstance, {
      name: 'New name',
      price: 'New content',
      catrgory: 'New category',
      checked: 'false',
      date_added: new Date(),
    })
  )
  .then(newShoppingList => {
    console.log(newShoppingList)
    return ShoppingListsService.updateShoppingList(
      knexInstance,
      newShoppingList.id,
      { name: 'Updated name' }
    ).then(() => ShoppingListsService.getById(knexInstance, newShoppingList.id))
  })
  .then(item => {
    console.log(item)
    return ShoppingListsService.deleteShoppingList(knexInstance, item.id)
  })
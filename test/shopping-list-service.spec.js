const ShoppingListsService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`ShoppingLists service object`, function () {
    let db
    let testShoppingLists = [
        {
            id: 1,
            name: 'First test item!',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false, 
            price: '12.00',
            category: 'Main'
          },
          {
            id: 2,
            name: 'Second test item!',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            checked: false, 
            price: '21.00',
            category: 'Snack'
          },
          {
            id: 3,
            name: 'Third test item!',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: false, 
            price: '3.00',
            category: 'Lunch'
          },
          {
            id: 4,
            name: 'Fourth test item!',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: false, 
            price: '0.99',
            category: 'Breakfast'
          },
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    before(() => db('shopping_list').truncate())
    afterEach(() => db('shopping_list').truncate())
    after(() => db.destroy())
    describe(`getAllShoppingLists()`, () => {
        context(`Given 'shopping_list' has data`, () => {
            beforeEach(() => {
                return db
                    .into('shopping_list')
                    .insert(testShoppingLists)
            })
            it(`getAllShoppingLists() resolves all items from 'shopping_list' table`, () => {
                // test that ShoppingListsService.getAllShoppingLists gets data from table
                return ShoppingListsService.getAllShoppingLists(db)
                    .then(actual => {
                        expect(actual).to.eql(testShoppingLists.map(item => ({
                            ...item,
                            date_added: new Date(item.date_added)
                        })))
                    })
            })
            it(`getById() resolves an item by id from 'shopping_list' table`, () => {
                const thirdId = 3
                const thirdTestShoppingList = testShoppingLists[thirdId - 1]
                return ShoppingListsService.getById(db, thirdId)
                    .then(actual => {
                        expect(actual).to.eql({
                            id: thirdId,
                            name: thirdTestShoppingList.name,
                            price: thirdTestShoppingList.price,
                            checked: thirdTestShoppingList.checked,
                            category: thirdTestShoppingList.category,
                            date_added: thirdTestShoppingList.date_added,
                        })
                    })
            })
            it(`deleteShoppingList() removes an item by id from 'shopping_list' table`, () => {
                const itemId = 3
                return ShoppingListsService.deleteShoppingList(db, itemId)
                    .then(() => ShoppingListsService.getAllShoppingLists(db))
                    .then(allShoppingLists => {
                        // copy the test items array without the "deleted" item
                        const expected = testShoppingLists.filter(item => item.id !== itemId)
                        expect(allShoppingLists).to.eql(expected)
                    })
            })
            it(`updateShoppingList() updates an item from the 'shopping_list' table`, () => {
                const idOfShoppingListToUpdate = 3
                const newShoppingListData = {
                    name: 'updated name',
                    price: '99.99',
                    date_added: new Date(),
                    category: 'Breakfast',
                    checked: true,
                }
                return ShoppingListsService.updateShoppingList(db, idOfShoppingListToUpdate, newShoppingListData)
                    .then(() => ShoppingListsService.getById(db, idOfShoppingListToUpdate))
                    .then(item => {
                        expect(item).to.eql({
                            id: idOfShoppingListToUpdate,
                            ...newShoppingListData,
                        })
                    })
            })

        })
        context(`Given 'shopping_list' has no data`, () => {
            it(`getAllShoppingLists() resolves an empty array`, () => {
                return ShoppingListsService.getAllShoppingLists(db)
                    .then(actual => {
                        expect(actual).to.eql([])
                    })
            })

            it(`insertShoppingList() inserts a new item and resolves the new item with an 'id'`, () => {
                const newShoppingList = {
                    name: 'New Flytem',
                    price: '20.09',
                    category: 'Main',
                    checked: false,
                    date_added: new Date('2020-01-01T00:00:00.000Z'),
                }
                return ShoppingListsService.insertShoppingList(db, newShoppingList)
                    .then(actual => {
                        expect(actual).to.eql({
                            id: 1,
                            name: newShoppingList.name,
                            price: newShoppingList.price,
                            category: newShoppingList.category,
                            checked: newShoppingList.checked,
                            date_added: newShoppingList.date_added,
                        })
                    })
            })
        })
    })
})
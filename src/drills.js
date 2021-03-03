require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function itemsByText(searchTerm) {
    knexInstance
        .select('name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
    }
    itemsByText("al")



    function paginateProducts(page) {
        const productsPerPage = 6
        const offset = productsPerPage * (page - 1)
        knexInstance
            .select('product_id', 'name', 'price', 'category')
            .from('shopping_list')
            .limit(productsPerPage)
            .offset(offset)
            .then(result => {
                console.log(result)
            })
    }

    paginateProducts(4)


    function mostPopularVideosForDays(days) {
        knexInstance
            .select('name', 'region')
            .count('date_added AS views')
            .where(
                'date_added',
                '>',
                knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
            )
            .from('shopping_list')
            .then(result => {
                console.log(result)
            })
    }

    mostPopularVideosForDays(1)


    function costPerCategory() {
        knexInstance
            .select('category')
            .sum('price as total')
            .from('shopping_list')
            .groupBy('category')
            .then(result => {
                console.log('COST PER CATEGORY')
                console.log(result)
            })
    }

    costPerCategory()
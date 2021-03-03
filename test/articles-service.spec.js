const ArticlesService = require('../src/articles-service')
const knex = require('knex')

describe(`Articles service object`, function () {
    let db
    let testArticles = [
        {
            id: 11,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'First test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
        },
        {
            id: 12,
            date_published: new Date('2100-05-22T16:28:32.615Z'),
            title: 'Second test post!',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
        },
        {
            id: 13,
            date_published: new Date('1919-12-22T16:28:32.615Z'),
            title: 'Third test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
        },
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    before(() => db('blogful_articles').truncate())
    // before(() => {
    //     return db
    //         .into('blogful_articles')
    //         .insert(testArticles)
    // })
    afterEach(() => db('blogful_articles').truncate())
    after(() => db.destroy())
    describe(`getAllArticles()`, () => {
        context(`Given 'blogful_articles' has data`, () => {
            before(() => {
                return db
                    .into('blogful_articles')
                    .insert(testArticles)
            })
            it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
                // test that ArticlesService.getAllArticles gets data from table
                return ArticlesService.getAllArticles(db)
                    .then(actual => {
                        expect(actual).to.eql(testArticles.map(article => ({
                            ...article,
                            date_published: new Date(article.date_published)
                        })))
                    })
            })
            context(`Given 'blogful_articles' has no data`, () => {
                it(`getAllArticles() resolves an empty array`, () => {
                    return ArticlesService.getAllArticles(db)
                        .then(actual => {
                            expect(actual).to.eql([])
                        })
                })
            })
        })
    })
})
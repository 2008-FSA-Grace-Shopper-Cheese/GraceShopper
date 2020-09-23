'use strict'

const db = require('../server/db')
const {User, Cart, Cheese} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      userName: 'robot',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      userName: 'big bird'
    }),
    User.create({email: 'ericdag@sina.com', password: '123', userName: 'elmo'})
  ])
  const [robot, bigbird, elmo] = users

  const cart = await Cart.create({items: [{}, {}]})

  await robot.setCart(cart)

  const cheeses = await Promise.all([
    Cheese.create({
      name: 'Parmigiano',
      price: 2899,
      description: `an Italian hard, granular cheese that is produced from cow's milk and has aged 12–36 months.`,
      imageUrl:
        'https://www.murrayscheese.com/site/images/items/20017900000.1.jpg?resizeid=9&resizeh=300&resizew=300'
    }),
    Cheese.create({
      name: 'String Cheese',
      price: 199,
      description: 'Cheese but in string form',
      imageUrl:
        'https://www.eaugallecheese.com/image/cache/data/cheese/string-800x800.jpg'
    }),
    Cheese.create({
      name: 'Burrata',
      price: 1599,
      description: 'an Italian cow milk cheese made from mozzarella and cream.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Burrata2.jpg/1200px-Burrata2.jpg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

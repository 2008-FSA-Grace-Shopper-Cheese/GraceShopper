'use strict'

const db = require('../server/db')
const {User, Cart, Cheese, CheeseCart} = require('../server/db/models')

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
    }),
    Cheese.create({
      name: 'brie',
      price: '30',
      description:
        'Made in Normandy, the home of Camembert, Baby Brie is renowned for its exceptional quality and freshness. This bloomy-rind, creamy cheese packs all of the goodness of French Brie into an 7 ounce wheel. You will love its inviting aroma and palate-pleasing flavor.',
      imageUrl:
        'https://envato-shoebox-0.imgix.net/21e0/6804-b2d3-4a47-bc42-d3293192a889/6DII29-11-2018-013553.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=23237f5ee019eff348a6db271e920d87'
    }),
    Cheese.create({
      name: 'Camembert',
      price: '1550',
      description:
        "Camembert is a moist, soft, creamy, surface-ripened cow's milk cheese. It was first made in the late 18th century at Camembert, Normandy, in northern France. It is similar to Brie, which is native to the Brie region of France.",
      imageUrl:
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ihPVg4pIMBxo/v1/1000x-1.jpg'
    }),
    Cheese.create({
      name: 'Mozzarella',
      price: '999',
      description:
        "Mozzarella is a traditionally southern Italian cheese made from Italian buffalo's milk by the pasta filata method. Fresh mozzarella is generally white but may vary seasonally to slightly yellow depending on the animal's diet.",
      imageUrl:
        'https://www.seriouseats.com/recipes/images/2015/10/20151017-pies-vicky-wasik-2-625x469.jpg'
    }),
    Cheese.create({
      name: 'Feta',
      price: '1699',
      description:
        'Feta is a brined curd white cheese made in Greece from sheep milk or from a mixture of sheep and goat milk. It is a crumbly aged cheese, commonly produced in blocks, and has a slightly grainy texture in comparison to other cheeses.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2836/2982/products/Feta_hero_grande.jpg?v=1529434179'
    }),
    Cheese.create({
      name: 'Ricotta',
      price: '344',
      description:
        'Ricotta is an Italian whey cheese made from sheep, cow, goat, or Italian water buffalo milk whey left over from the production of other cheeses. Like other whey cheeses, it is made by coagulating the proteins that remain after the casein has been used to make cheese, notably albumin and globulin.',
      imageUrl:
        'https://www.melskitchencafe.com/wp-content/uploads/homemade-ricotta1.jpg'
    }),
    Cheese.create({
      name: 'Raclette',
      price: '2199',
      description:
        'Raclette is a semi-hard cheese that is usually fashioned into a wheel of about 6 kg. The Alpine cow milk based dairy product is most commonly used for melting, but is also consumed as a slice. Raclette also is a Swiss dish, also very popular in Savoie, based on heating the cheese and scraping off the melted part. ',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2426/6883/products/100_003_Ambiance.jpg?v=1507849092'
    }),
    Cheese.create({
      name: 'Queso blanco',
      price: '599',
      description:
        'Queso blanco, literally white cheese in Spanish, can refer to many different kind of cheeses whose only common trait is their white color. The specific cheese referred to depends on the region.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Queso_fresco.JPG/1200px-Queso_fresco.JPG'
    }),
    Cheese.create({
      name: 'Roquefort',
      price: '2531',
      description:
        "Roquefort is a sheep milk cheese from Southern France, and is one of the world's best known blue cheeses.",
      imageUrl:
        'https://previews.123rf.com/images/elarina/elarina1203/elarina120300030/12903423-slice-of-roquefort-cheese-on-white-background.jpg'
    })
  ])

  const [robot, bigbird, elmo] = users
  const [rr, bl, el] = cheeses
  const cart = await Cart.create()
  //console.log(robot.__proto__)
  await robot.addCart(cart)

  await rr.addCart(cart)
  await bl.addCart(cart)

  const [ar1, ar2] = await CheeseCart.update(
    {
      quantity: 4
    },
    {
      where: {cartId: 1},
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    }
  )

  const [ar3, ar4] = await CheeseCart.update(
    {
      purchasePrice: 199
    },
    {
      where: {cheeseId: 2},
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    }
  )

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

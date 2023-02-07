const {faker}=require('@faker-js/faker')

function ProductFaker(){
    return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.random.numeric(2),
    thumbnail : faker.image.imageUrl()
    }
}

module.exports = ProductFaker();

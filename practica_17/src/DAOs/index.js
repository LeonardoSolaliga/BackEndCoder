
export let usersService;
export let productsService;
export let cartsService
switch ('mongo') {
    case 'mongo':
        const {default:MongoUser} = await import('./UserDAO.js');
        const {default:MongoProducts} = await import('./ProductsDAO.js');
        const {default:MongoCart} = await import('./CartDAO.js');

        usersService = new MongoUser();
        productsService = new MongoProducts();
        cartsService = new MongoCart();
        break;
}

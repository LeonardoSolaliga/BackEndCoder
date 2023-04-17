export default class VideogameDTO {

    static getInsertDTO = (product) =>{
        return {
            title:product.title||'sin titulo',
            description: product.description||'sin descripcion',
            price: product.price||"sin precio",
            code: product.code||"sin codigo",
            category: product.category || 'Sin categoría',
            image:product.image || 'url de imagen genérica'
        }
    }

    static getCardPresenterDTO = (product) =>{
        return {
            title: product.title,
            description: product.description,
            active: product.stock>0,
            image: product.image
        }
    }

    static getDetailedDTO = (videogame) =>{

    }

}
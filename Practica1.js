class Usuario{
    constructor(nombre,apellido,libros=[],mascotas=[]){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(titulo,autor){
        this.libros.push({nombre:titulo,author:autor})
    }
    getBookNames(){
        return this.libros.map(book=>book.nombre)
    }
}

let usuario=new Usuario("leonardo","solaliga");
console.log(usuario.getFullName());
usuario.addMascota("perro");
usuario.addMascota("gato");
console.log(usuario.countMascotas());
usuario.addBook("El señor de los anillos","J. R. R. Tolkien");
usuario.addBook("El eternauta","Héctor Germán Oesterheld");
console.log(usuario.getBookNames());
console.log(usuario);

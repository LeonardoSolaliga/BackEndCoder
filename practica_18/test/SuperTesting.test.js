import chai from 'chai';
import supertest from 'supertest';

const expect=chai.expect;
const requester=supertest('http://localhost:8080');

describe('pruebas de integracion con servidor completo',()=>{

    it('el endpoit POST /api/sessions/register debe registrar correctamente un usuario',async function(){
        this.timeout(0)
        const testUser={
            first_name:"LeonardoTest",
            last_name:"ApellidoTest",
            email:"correotest@correo.com",
            password:"123"
        }
        //const response=await requester.post('/api/sessions/register').send(testUser)/sino hay otros archivos involucrados y pueda mandarlo como json
        const response=await requester.post('/api/sessions/register')
        .field('first_name',testUser.first_name)
        .field('last_name',testUser.last_name)
        .field('email',testUser.email)
        .field('password',testUser.password)
        .attach('avatar','./test/gatito_finoli.jpg')//no es un campo normal que debo mandarle un archivo
        expect(response.status).to.be.equal("success");
        const {_body}=response;
        expect(_body.message).to.be.equal("Registrado")
    })
    it('El endpoint GET /api/products Debe traer a los productos paginados',async function(){
        this.timeout(0)

        const response = await requester.get('/api/products');
        expect(response.status).to.be.ok;
        const {_body} = response;
        console.log(_body);
        expect(_body.payload).to.be.ok;
    })
})
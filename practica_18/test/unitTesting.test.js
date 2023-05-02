import setPersistance from '../src/DAOs/index.js'
import mongoose from 'mongoose'
import {strict as assert} from 'assert'
const container = setPersistance('mongo');
const APIuser=container.userService;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://CoderUserLeonardo:1234@codercluster38140.dbok9sm.mongodb.net/Practica17?retryWrites=true&w=majority")


describe('Test generales del DAO de usuario',()=>{
    
    it('el DAO debe obtener los usuarios en formato arreglo',async function(){
        this.timeout(0)
        const result=await APIuser.getUsers()
        assert.ok(result)
        assert.strictEqual(Array.isArray(result), true)
        
    })
    describe('pruebas de escritura',()=>{
        Before(async function(){
            await APIuser.DropUser()
        })
        it('el DAO debe poder insertar un Usuario correctamente',async function(){
            this.timeout(0)
            const mockUser={
                first_name:"TestUser",
                last_name:"User",
                email:"testuser@user.com",
                password:"123"
            }
            const result=await APIuser.createUser(mockUser)
            assert.ok(result._id);
        })
    })
})
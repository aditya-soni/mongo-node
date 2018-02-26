const request = require('supertest');
const expect = require('expect');

var {app}=require('../server');
var {Todo}=require('../model/todo');

beforeEach((done)=>{
    Todo.remove({}).then(()=>done())
})

describe('POST /todos',()=>{
    
    it('should create a new todo',(done)=>{
        var text = 'Sample testing test'

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text)
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then(
                    todos=>{
                        expect(todos[0].text).toBe(text);
                        expect(todos.length).toBe(1);
                        done();
                    }
                ).catch( e=>done(e) )
            })
    });

    it('should not add invalid todo',(done)=>{
        
        request(app)
            .post('/todos')
            .send({text:''})
            .expect(400)
            .end(done)
    })

})
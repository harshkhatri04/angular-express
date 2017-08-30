var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
let scheema=require('../models/contacts')
let modelStub=sinon.stub(scheema,'find')
let modelStubSave=sinon.stub(scheema.prototype,'save')
let modelStubRemove=sinon.stub(scheema,'remove')
let modelStubUpdate=sinon.stub(scheema,'update')
let should = require('chai').should();
//stubbing find method of route


var app = require('../app.js');
var address = request("http://localhost:8090")



    describe('get/ contacts', function() {

        
            before(function(){
            modelStub.yields(null, [{'firstname':'jhonny','lastname':'bravo','phone':8765717781}]);
            });

            it('checking get', function(done) {
                address
                    .get('/api/contact')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body[0].firstname).to.be.equal("jhonny");
                        expect(res.body[0].lastname).to.be.equal("bravo");
                        expect(res.body[0].phone).to.be.equal(8765717781);
                        done();
                    
            });
        });
    });
    describe('post/ contacts', function() {
          before(function(){
          modelStubSave.yields(null, [{'firstname':'jhonny','lastname':'bravo','phone':8765717781}]);
          });
            it('checking post',function(done) {
                 address
                
                    .post('/api/contact')
                    //.send({firstname:'jhonny',lastname:'bravo',phone:8765717781})
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) { 
                    if (err) return done(err);                       
                        expect(res.body[0].firstname).to.be.equal("jhonny");
                        expect(res.body[0].lastname).to.be.equal("bravo");
                        expect(res.body[0].phone).to.be.equal(8765717781);
                        done();
            });
        });
    });
    describe('delete/ contacts', function() {                    
                  
                  before(function(){
                    modelStubRemove.withArgs({ '_id':"12"})
                                   .yields(null, {
                                            "ok":1,
                                            "modified":1,
                                            "n":1
                                        })
                 });
                   
            it('checking delete', function(done) {
                  address                 
                    .delete('/api/contact/12')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err)return done(err);
                        else{
                        expect(res.body.ok).to.be.equal(1);   
                  done();  
              }
            });
        });
    });
     
     describe('update/ contacts', function() {                    
                  
                  before(function(){
                    modelStubUpdate.withArgs({ '_id':"12"},{$set:
                                                            {'firstname':"jhonny",
                                                            'lastname': "bravo",
                                                             'phone': " 12345"}})
                                                             .yields(null, {
                                                                "ok":1,
                                                                "modified":1,
                                                                "n":1
                                                            });
                                     });
                   
            it('checking update', function(done) {
                  address                 
                    .put('/api/contact/12')
                    .send({'firstname':"jhonny",
                            'lastname': "bravo",
                            'phone': " 12345"})
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err)return done(err);
                        else{
                        expect(res.body.ok).to.be.equal(1);   
                  done();  
              }
            });
        });
    });

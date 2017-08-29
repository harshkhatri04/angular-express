var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
let scheema=require('../models/contacts')
let modelStub=sinon.stub(scheema,'find')
let should = require('chai').should();
//stubbing find method of route


var app = require('../app.js');
var address = request("http://localhost:8090")

describe('test my methods', function() {

    describe('get/ contacts', function() {

        beforeEach(function() {
            modelStub.yields(null, [{'firstname':'jhonny','lastname':'bravo','phone':'8765717781'}]);
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
                        expect(res.body[0].phone).to.be.equal("8765717781");
                        done();
                    
            });
        });
    });
    describe('post/ contacts', function() {

            it('checking post',function() {
                request(app)
                    .post('/api/contact')
                    .send({firstname:'jhonny',lastname:'bravo',phone:8765717781})
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {                        
                        res.body.should.have.property('firstname','jhonny');
                        res.body.should.have.property('lastname','bravo');
                        res.body.should.have.property('phone',8765717781);
    
    describe('delete/ contacts', function() {                    
		   beforeEach(function() {
		            modelStub.yields(null, [{'firstname':'jhonny','lastname':'bravo','phone':8765717781,'id':1}]);
		            });

            it('checking delete', function(done) {
			      request(app)
			      
			        .delete('/api/contact/:id')
			        .end(function(err, res) {
			            if (err) {
			              throw err;
			            }
			            res.should.have.status(200);
			            done();
                    
            });
        });
    });
            });
        });
    });
});


var should = require('chai').should();
var domainator = require('../index.js');

describe('Tests for the getDomain function using single input', function() {
    this.timeout(8000);
    it('www.google.com should give google', function(done) {
        domainator.getDomain('www.google.com').then(function(domain){
            domain.should.equal('google');
            done();
        });
    });

    it('www.google.co.in should give google', function(done) {
        domainator.getDomain('www.google.com').then(function(domain){
            domain.should.equal('google');
            done();
        });
    });

    it('www.google.org.uk should also give google', function(done) {
        domainator.getDomain('www.google.org.uk').then(function(domain){
            domain.should.equal('google');
            done();
        });
    });

    it('www.google.a should give not be a valid domain', function(done) {
        domainator.getDomain('www.google.a').then(function(domain){
            domain.should.not.equal('google');
            done();
        });
    });
});

describe('Tests for the getDomain function using list input', function() {
    it('[www.google.com, www.yahoo.co.in] should give a list of corresponding domains', function(done) {
        domainator.getDomain(['www.google.com','www.yahoo.co.in']).then(function(domain){
            domain.should.be.an('array');
            domain.should.include('google');
            domain.should.include('yahoo');
            done();
        });
    });
    it('[www.google.com, www.yahoo.org.uk] should give a list of corresponding domains', function(done) {
        domainator.getDomain(['www.google.com','www.yahoo.org.uk']).then(function(domain){
            domain.should.be.an('array');
            domain.should.include('google');
            domain.should.include('yahoo');
            done();
        });
    });
});
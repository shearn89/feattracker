const assert = require('assert');
const authController = require('../../src/controllers/auth');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const sinon = require('sinon');
// chai.should();

describe('AuthController', function() {
  describe('middleware', function() {
    it('should redirect if no user present', function() {
      var req = { }
      var res = { redirect: function(){} }
      var next = sinon.spy()

      var mock = sinon.mock(res);
      mock.expects('redirect').once().withExactArgs('/');

      authController().middleware(req, res, next);
      next.notCalled.should.be.true;

      mock.verify();
    });
    it('should call next() if user present', function() {
      var req = { user: 'foo' }
      var res = { redirect: sinon.spy() }
      var next = sinon.spy()
      authController().middleware(req, res, next);
      res.redirect.notCalled.should.be.true;
      next.calledOnce.should.be.true;
    });
  });
  describe('getProfile', function() {
    it('should return JSON for a user', function() {
      var req = {
        user: 'foo'
      }
      var res = {
        json: sinon.spy()
      }
      authController().getProfile(req, res);
      res.json.calledOnce.should.be.true;
      res.json.firstCall.args[0].should.equal('foo');
    });
    it('should return empty JSON if empty user', function() {
      var req = {
      }
      var res = {
        json: sinon.spy()
      }
      authController().getProfile(req, res);
      res.json.calledOnce.should.be.true;
    });
  })
  describe('getLogout', function() {
    it('should set req.user to null', function() {
      var req = {
        user: 'foo',
        logout: sinon.spy()
      };
      var res = {
        redirect: sinon.spy()
      };
      authController().getLogout(req, res);
      res.redirect.calledOnce.should.be.true;
      res.redirect.firstCall.args[0].should.equal('/');
    });
  })
  describe('authenticate', function() {
    it('should redirect to /auth/profile on success');
    it('should redirect to / on failure');
  })
  describe('getSignIn', function() {
    it('should render the sign in page', function() {
      var req = {};
      var res = {
        render: sinon.spy()
      };
      authController().getSignIn(req, res);
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('signIn');
    });
  })
  describe('signUp', function() {
    it('should redirect to /auth/profile on success');
  })
});


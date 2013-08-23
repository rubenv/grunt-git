'use strict';

var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('push', function() {
	var repo = null;

	before(function(done) {
		common.setupAndRun('push', function(err, r) {
			repo = r;
			done(err);
		});
	});

	it('should push', function() {
		assert.notEqual(repo.initialRef, repo.currentRef);
	});
});

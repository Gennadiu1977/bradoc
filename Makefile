TESTS = ./test/*.js
REPORTER = nyan

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 2000 \
		$(TESTS)
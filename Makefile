REPORTER = dot
DOCUMENTATION_LAYOUT = classic

test:
	@./node_modules/.bin/docco index.js --layout $(DOCUMENTATION_LAYOUT)
	@./node_modules/.bin/mocha --reporter $(REPORTER) test/**
	@./node_modules/.bin/jshint index.js

generate-docs:
	@./node_modules/.bin/docco index.js --layout $(DOCUMENTATION_LAYOUT)

.PHONY: test

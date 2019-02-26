install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js
hh:
	npx babel-node -- src/bin/gendiff.js before.json after.json
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
build:
	rm -rf dist
	npm run build

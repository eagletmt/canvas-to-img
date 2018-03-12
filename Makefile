WEB_EXT = node_modules/.bin/web-ext
WEBPACK = node_modules/.bin/webpack
TSLINT = node_modules/.bin/tslint

lint:
	$(WEB_EXT) lint
tslint:
	$(TSLINT) --project . src/**/*.ts
run:
	$(WEB_EXT) run --verbose
build:
	$(WEBPACK)
	$(WEB_EXT) build

sign:
	# https://addons.mozilla.org/en-US/developers/addon/api/key/
	$(WEB_EXT) sign --api-key=$(JWT_ISSUER) --api-secret=$(JWT_SECRET)

clean:
	rm -rf dist web-ext-artifacts

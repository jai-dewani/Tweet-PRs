const { expect } = require("chai");

const { renderString } = require("./../src/renderText");

describe("Testing renderString", async () => {
	it("should return jai_dewani", async () => {
        const payload = {
            "commits": [
                {
                    "author": {
                        "email": "jai.dewani.99@gmail.com",
                        "name": "Jai Kumar Dewani",
                        "username": "jai-dewani"
                    },
                },
                {
                    "author": {
                        "email": "jai.dewani.99@gmail.com",
                        "name": "Jai Kumar Dewani",
                        "username": "kcoder63"
                    },
                },
                {
                    "author": {
                        "email": "jai.dewani.99@gmail.com",
                        "name": "Jai Kumar Dewani",
                        "username": "DevCassie"
                    },
                },
			]
		};
		const result = await renderString("this is my name ${twitter_username}, thanks for the PR ${commits.0.author.name}", payload);
		expect(result).to.be.equal("this is my name @jai_dewani, @Starlightknown, and DevCassie, thanks for the PR Jai Kumar Dewani");
	});
});
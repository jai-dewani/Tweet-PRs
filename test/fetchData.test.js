const { expect } = require("chai");
const { getTwitterID, extractTwitterHandle } = require("../src/fetchData");

async function getID(id) {
	return await getTwitterID(id);
}

describe("Testing getTwitterID", async () => {
	it("should return jai_dewani", async () => {
		const result = await getTwitterID("jai-dewani");
		expect(result).to.be.equal("@jai_dewani");
	});
	it("should return Starlightknwn", async () => {
		const result = await getTwitterID("kcoder63");
		expect(result).to.be.equal("@Starlightknown");
	});
	it("should return DevCassie", async () => {
		const result = await getTwitterID("DevCassie");
		expect(result).to.be.equal("DevCassie");
	});
});

describe("Testing extractTwitterHandle", () => {
	it("should return a valid string", async () => {
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
		const result = await extractTwitterHandle(payload);
		expect(result).to.be.equal('@jai_dewani, @Starlightknown, and DevCassie')
	});
});

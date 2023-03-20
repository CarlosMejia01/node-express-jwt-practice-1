const http = require("http");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { expressjwt: jwt } = require("express-jwt");

const secret = {
	secret: process.env.SECRET || "secret",
	algorithms: ["HS256"],
};

const server = http.createServer(app);
const users = [
	{ name: "Juan", lastname: "Dox" },
	{ name: "Justin", lastname: "Smith" },
	{ name: "Manuel", lastname: "Does" },
	{ name: "Peter", lastname: "Bring" },
];

app.get("", (req, res) => {
	res.send("Welcome to home");
});

app.get("/api/users", jwt(secret), (req, res) => {
	if (!req.auth.admin) {
		res.status(401).send({ message: "Not authorized" });
	};
		res.send(users);
});

server.listen(PORT, () =>
	console.log(`Server ready in http://localhost:${PORT}`)
);

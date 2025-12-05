import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "data", "cities.json");
console.log(__dirname);
export default function handler(req, res) {
	const { method } = req;
	const url = new URL(req.url, `http://${req.headers.host}`);

	const pathSegments = url.pathname.split("/").filter(Boolean);
	if (pathSegments[2]) {
		// Third segment is the ID
		const cityId = pathSegments[2];

		switch (method) {
			case "GET":
				return getCityById(req, res, cityId);

			case "DELETE":
				return deleteCity(req, res, cityId);
			default:
				return res.status(405).end();
		}
	}
	switch (method) {
		case "GET":
			return handleGET(req, res);
		case "POST":
			return handlePOST(req, res);

		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
function handleGET(req, res) {
	try {
		const file = fs.readFileSync(filePath, "utf8");
		const fileData = JSON.parse(file);
		return res.status(200).json(fileData);
	} catch (err) {
		return res.status(500).json({ error: "Failed to load cities" });
	}
}
function getCityById(req, res, id) {
	try {
		const file = fs.readFileSync(filePath, "utf8");
		const fileData = JSON.parse(file);
		const city = fileData.find((city) => city.id === id);
		res.status(200).json(city);
	} catch (err) {
		res.status(500);
	}
}
function deleteCity(req, res, id) {
	try {
		const file = fs.readFileSync(filePath, "utf8");
		const fileData = JSON.parse(file);
		const updatedData = fileData.filter((city) => city.id !== id);
		fs.writeFileSync(filePath, updatedData, "utf-8");
	} catch (err) {
		res.status(500);
	}
}
function handlePOST(req, res) {
	try {
		const file = fs.readFileSync(filePath, "utf8");
		const fileData = JSON.parse(file);

		const newCity = req.body;
		const updatedData = [...fileData, newCity];
		fs.writeFileSync(filePath, updatedData, "utf-8");
		return res.status(201).json(newCity);
	} catch (error) {
		return res.status(500);
	}
}

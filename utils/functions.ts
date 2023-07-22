import { writeFile } from "fs/promises";
import { appName, staticURL, symbol } from "./constants";
import crypto from "crypto";

export const getLocalStorage = (name: string) => {
	if (typeof window !== "undefined") {
		return localStorage.getItem(name);
	}
};

export const getDate = (date: Date | string) => {
	const newDate = new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate();
	return newDate;
};

export const getAge = (birthday: Date | string) => {
	const age = Math.floor((new Date().valueOf() - new Date(birthday).valueOf()) / (1000 * 60 * 60 * 24 * 365.25));
	return age;
};

export const getTitle = (name: string) => {
	return name + symbol + appName;
};

export const sha1 = (data: string) => {
	return crypto.createHash("sha1").update(data, "binary").digest("hex");
};

export const saveFile = async (file: any, type: "show" | "cover" | "actor") => {
	const newFileName = Date.now() + "_" + file.name;
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	await writeFile(`./public${staticURL}/${type}/${newFileName}`, buffer);
	return newFileName;
};

import { appName, symbol } from "./constants";
import crypto from "crypto";

export const getLocalStorage = (name: string) => {
	if (typeof window !== "undefined") {
		return localStorage.getItem(name);
	}
};

export const getJwtSecretKey = () => {
	const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
	if (!secret || secret.length === 0) throw new Error("getJwtSecretKey ERROR");
	return secret;
};

export const getDate = (date: Date | string) => {
	const newDate = new Date(date).getFullYear() + "-" + new Date(date).getMonth() + "-" + new Date(date).getDate();
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
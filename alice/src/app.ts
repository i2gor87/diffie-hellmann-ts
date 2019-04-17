/**
 * External dependencies
 */
import * as cors from "cors";
import * as lusca from "lusca";
import * as express from "express";
import * as Sentry from "@sentry/node";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

/**
 * Internal dependencies
 */
import { getCategoriesfromBob } from "./endpoints/GetCategories";

/**
 * Setups
 */
const app = express();
app.set("port", process.env.PORT || 3601);
app.use(Sentry.Handlers.requestHandler());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Rest API
 */
app.get("/get_categories", getCategoriesfromBob);

export default app;

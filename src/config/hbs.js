import express from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "../utils.js";

const configureHandlebars = (app) => {
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", path.resolve(__dirname, "./views"));
  app.use(express.static(path.join(__dirname, "./public"))); 
};



export default configureHandlebars;
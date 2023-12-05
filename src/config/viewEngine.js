import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  // Cấu hình view Engine
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
}

module.exports = configViewEngine;
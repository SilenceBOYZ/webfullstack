import express from "express";
import homeController from "../controllers/homeController";
import getAboutPage  from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', getAboutPage.getAboutPage);
  router.get('/getCrud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  
  //rest api
  return app.use("/", router);
  // sẽ sử dụng các router được định nghĩa
}

module.exports = initWebRoutes;
import express from "express";
import homeController from "../controllers/homeController";
import getAboutPage  from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', getAboutPage.getAboutPage);
  router.get('/createCrud', homeController.getCRUD);

  router.post('/post-crud', homeController.postCRUD);
  router.get('/display-crud', homeController.displayGetCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);
  
  // tạo router đặt tên api để phân biệt
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  //rest api
  return app.use("/", router);
  // sẽ sử dụng các router được định nghĩa
}

module.exports = initWebRoutes;
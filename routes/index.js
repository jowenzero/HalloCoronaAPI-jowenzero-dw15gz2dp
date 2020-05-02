const express = require("express");
const router = express.Router();
const {
  index: findUsers,
  show: findUser,
  showUser: findTheUser,
  update: updateUser,
  destroy: deleteUser,
  upload: uploadUserPic,
} = require("../controllers/user");
const { login, register } = require("../controllers/auth");
const {
  index: findArticles,
  show: findArticle,
  showArticle: findUserArticle,
  create: createArticle,
} = require("../controllers/article");
const {
  index: findConsultations,
  show: findConsultation,
  showConsultation: findUserConsultation,
  showReply: findUserReply,
  create: createConsultation,
  createReply: createReply,
  update: updateConsultation,
} = require("../controllers/consultation");
const upload = require('../config/upload.config.js');

// Middlewares
const { authenticated } = require("../middlewares/auth");

// Auth routes
router.post("/signin", login);
router.post("/signup", register);

// Article routes
router.get("/articles", findArticles);
router.get("/article/:id", findArticle);
router.get("/user/articles", authenticated, findUserArticle);
router.post("/articles", authenticated, createArticle);

// Transaction routes
router.get("/consultations", authenticated, findConsultations);
router.get("/consultation/:id", authenticated, findConsultation);
router.get("/user/consultation", authenticated, findUserConsultation);
router.get("/user/reply/:id", authenticated, findUserReply);
router.post("/consultation", authenticated, createConsultation);
router.post("/consultation/:id/reply", authenticated, createReply);
router.patch("/consultation/:id", authenticated, updateConsultation);

// User routes
router.post("/user/upload", upload, uploadUserPic);
router.get("/users", findUsers);
router.get("/user/:id", findUser);
router.get("/user", authenticated, findTheUser);
router.patch("/user", authenticated, updateUser);
router.delete("/user", authenticated, deleteUser);


module.exports = router;
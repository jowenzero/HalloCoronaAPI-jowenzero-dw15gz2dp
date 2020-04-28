const { article, user } = require("../models");

const articleParam = {
  include: [
    {
      model: user,
      attributes: ["id", "fullName"],
    },
  ],
  attributes: { exclude: ["createdAt", "updatedAt"] },
  order: [
    ['id', 'ASC'],
  ],
}

exports.index = async (req, res) => {
  try {
    if (req.query.createdAt) {
      const articles = await article.findAll({
        ...articleParam,
        where: {
          createdAt: new Date(req.query.createdAt)
        },
      });

      res.status(200).send({ data: articles });
    }
    else {
      const articles = await article.findAll({
        ...articleParam,
      });

      res.status(200).send({ data: articles });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to view article!" })
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const articles = await article.findOne({
      ...articleParam,
      where: { id: req.params.id },
    });
    res.send({ data: articles });
  } catch (error) {
    res.status(500).send({ message: "Failed to view a article!" })
    console.log(error);
  }
};

exports.showArticle = async (req, res) => {
  try {
    const articles = await article.findAll({
      ...articleParam,
      where: { userId: req.user.id },
    });
    res.send({ data: articles });
  } catch (error) {
    res.status(500).send({ message: "Failed to view user article!" })
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    if (req.user.listId === 0) {
      const newArticle = await article.create(req.body);
      const articles = await article.findOne({
        ...articleParam,
        where: { id: newArticle.id },
      });
      res.status(201).send({ data: articles });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to create article!" })
    console.log(error);
  }
};
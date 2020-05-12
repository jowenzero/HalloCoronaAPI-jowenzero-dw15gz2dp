const { consultation, user, reply } = require("../models");

const consultationParam = {
  include: [
    {
      model: user,
      attributes: ["id", "username"],
    },
  ],
  attributes: { exclude: ["updatedAt"] },
  order: [
    ['id', 'DESC'],
  ],
};

const replyParam = {
  include: [
    {
      model: reply,
      attributes: ["id", "response"],
    },
  ],
  order: [
    ['id', 'ASC'],
  ],
}

exports.index = async (req, res) => {
  try {
    if (req.user.listId === 2) {
      const consultations = await consultation.findAll({
        ...consultationParam,
      });
      res.status(200).send({ data: consultations });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to view consultations!" })
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    if (req.user.listId === 2) {
      const consultations = await consultation.findOne({
        ...consultationParam,
        where: { id: req.params.id },
      });
      res.status(200).send({ data: consultations });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to view a consultation!" })
    console.log(error);
  }
}

exports.showConsultation = async (req, res) => {
  try {
    if (req.user.listId === 1) {
      const consultations = await consultation.findAll({
        ...consultationParam,
        ...replyParam,
        where: { 
          userId: req.user.id 
        },
      });
      res.status(200).send({ data: consultations });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to view user consultations!" })
    console.log(error);
  }
};

exports.showReply = async (req, res) => {
  try {
    if (req.user.listId === 1) {
      const replies = await reply.findAll({
        where: { consultationId: req.params.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [
          ['id', 'ASC'],
        ],
      });
      res.status(200).send({ data: replies });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to view user reply!" })
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    if (req.user.listId === 1) {
      const newConsultation = await consultation.create(req.body);
      const consultations = await consultation.findOne({
        ...consultationParam,
        where: { id: newConsultation.id },
      });
      res.status(201).send({ data: consultations });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to create consultation!" })
    console.log(error);
  }
};

exports.createReply = async (req, res) => {
  try {
    if (req.user.listId === 2) {
      await reply.create(req.body);
      const replies = await consultation.findOne({
        ...consultationParam,
        ...replyParam,
        where: { id: req.params.id },
      });
      res.status(201).send({ data: replies });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to create reply!" })
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    if (req.user.listId === 1 || req.user.listId === 2) {
      await consultation.update(req.body, { where: { id: req.params.id } });
      const consultations = await consultation.findOne({
        ...consultationParam,
        where: { id: req.params.id },
      });
      res.status(200).send({ data: consultations });
    }
    else {
      res.status(401).send({ message: "You're unauthorized!" })
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to update consultation!" })
    console.log(error);
  }
};
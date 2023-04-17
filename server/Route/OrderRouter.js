const express = require('express');
const MailController = require('../Controller/MailController'); 
const router = express.Router();


router.post('/activation', async (req, res) => {
  const { to } = req.body;
  await MailController.sendActivationMail(to, MailController.GenerateActivationLink(to));
  res.sendStatus(200);
});

router.post('/record', async (req, res) => {
  const { to, time, address, phone, email } = req.body;
  await MailController.sendRecordMail(to, time, address, phone, email);
  res.sendStatus(200);
});

router.post('/reminders', async (req, res) => {
  const { to, time, address, phone, email } = req.body;
  await MailController.sendRemindersMail(to, time, address, phone, email);
  res.sendStatus(200);
});

module.exports = router;

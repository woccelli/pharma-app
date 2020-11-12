const express = require("express");
const router = express.Router();

const path = require("path");
//Load pdf-lib based pdf management functions
const fillForm = require("../../pdf_management/fillform");
router.get('/sheet', function (req, res) {

  const sheetid = req.body.sheetid

  fillForm().then((data) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    res.send(new Buffer(data, 'binary'));
  });
});

module.exports = router;
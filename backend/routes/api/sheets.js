const express = require("express");
const router = express.Router();

const path = require("path");

router.get('/sheet', function (req, res) {
  var fs = require('fs');
  var data = fs.readFileSync(path.resolve(__dirname, "../../sheets/test_pdf.pdf"));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=quote.pdf');
  res.send(data);
});

module.exports = router;
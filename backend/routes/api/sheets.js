const express = require("express");
const router = express.Router();

const path = require("path");

router.get('/sheet', function (req, res) {

  const sheetid = req.body.sheetid

  var fs = require('fs');
  var data = fs.readFileSync(path.resolve(__dirname, "../../sheets/"+ sheetid + ".pdf"));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  res.send(data);
});

module.exports = router;
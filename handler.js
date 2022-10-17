const convertXml = require('xml-js')
const serverless =require('serverless-http')
const express = require('express');

const app = express();

app.post('/soap', async (req, res) => {
  const rawBody = req.body;
  const xmlBody = JSON.parse(convertXml.xml2json(rawBody, { compact: true, spaces: 2 }));

  function getDeceasedValue(object, key, prevKey) {
    let value;
    Object.keys(object).some(function(k) {
      if (k === key) {
        value = { class: prevKey, object }
        return true;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = getDeceasedValue(object[k], key, k)
        return value !== undefined
      }
    })
    return value
  }

  const personObject = getDeceasedValue(xmlBody, 'deceasedTime')
  res.send(personObject || "No deceased time found")
});

const handler = serverless(app, { provider: 'aws' });
module.exports.post_soap = async (context, req) => {
  result = await handler(context, req);

  return {
    statusCode: 200,
    body: result.body,
  };
}

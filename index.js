import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { config } from 'dotenv';

import {
  createHomePageContent,
  createContactCard,
  createContactListWithForm,
  sendErrorResponse,
  updatePageContent
} from './public/scripts/serverHelpers.js';

config();

const { port, host } = process.env;

const HOME_PAGE_PATH = 'public/index.html';
const CONTACT_LIST_PATH = 'public/asset/contacts.json';
let contacts = [];
let homePageContent = '';

// get the current directory
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_FILE_PATH = path.join(__dirname, HOME_PAGE_PATH);
const CONTACTS_FILE_PATH = path.join(__dirname, CONTACT_LIST_PATH);

fs.readFile(CONTACTS_FILE_PATH, 'utf8', (err, data) => {
  if (err) {
    console.log('err: ', err);
    return;
  }
  contacts = JSON.parse(data);
});

fs.readFile(HTML_FILE_PATH, 'utf8', (err, data) => {
  if (err) {
    console.log('err: ', err);
    return;
  }
  homePageContent += data;
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile(HTML_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      sendErrorResponse(res);
      return;
    }
    const homePageContent = updatePageContent(data, createHomePageContent());
    res.status(200).send(homePageContent);
  });
});

app.get('/contact/', (req, res) => {
  const contact = contacts.find((contact) => contact.id === Number(req.query.id));
  fs.readFile(HTML_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      sendErrorResponse(res);
      return;
    }
    const responseData = updatePageContent(data, createContactCard(contact));
    res.status(200).send(responseData);
  });
});

app.get('/contacts/', (req, res) => {
  fs.readFile(HTML_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      sendErrorResponse(res);
      return;
    }
    const contactPageContent = updatePageContent(data, createContactListWithForm(contacts));
    res.status(200).send(contactPageContent);
  });
});

app.post('/contacts/', (req, res) => {
  const uId = contacts.reduce((acc, contact) => Math.max(acc, contact.id), 0) + 1;
  const newContact = { id: uId, ...req.body };
  contacts.unshift(newContact);

  fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      sendErrorResponse(res);
      return;
    }
    res.status(200).json({ data: contacts });
  });
});

app.delete('/contacts/', (req, res) => {
  const contactData = req.body;
  contacts = contacts.filter((i) => i.id !== contactData.id);

  fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      sendErrorResponse(res);
      return;
    }
    res.status(200).json({ data: contacts });
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

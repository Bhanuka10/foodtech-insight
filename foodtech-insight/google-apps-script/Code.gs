/**
 * FoodTech Insight — "Become a Supporter" form → Google Sheets
 *
 * Deploy this file as a Web App (Execute as: Me, Who has access: Anyone)
 * and paste the "/exec" URL into VITE_SUPPORT_ENDPOINT on the website.
 * Setup steps are in README.md next to this file.
 */

var SPREADSHEET_ID = '1ujNkAXAt5nkv6Q6wMsGlE0CmsATdHVj4jgZP7tbSxCg';
var SHEET_NAME = 'Supporters';
var DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000; // same email + category within 24h = duplicate

var COLUMNS = [
  ['submissionId', 'Submission ID'],
  ['submittedAt', 'Submitted At'],
  ['category', 'Support Category'],
  ['fullName', 'Full Name'],
  ['email', 'Email'],
  ['phone', 'Contact Number'],
  ['country', 'Country'],
  ['organization', 'Organization'],
  ['position', 'Position'],
  ['website', 'Website / Social Media'],
  ['preferences', 'Support Preferences'],
  ['purpose', 'Purpose / Motivation'],
  ['involvement', 'Community Involvement'],
];

function doGet() {
  return respond({ status: 'ok', service: 'FoodTech Insight supporter submissions' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    return respond({ status: 'error', message: 'The sheet is busy, please try again in a moment.' });
  }
  try {
    var data = parseBody(e);
    var problem = validate(data);
    if (problem) return respond({ status: 'error', message: problem });

    var sheet = getSheet();
    var existing = findExisting(sheet, data);
    if (existing === 'same-id') return respond({ status: 'ok', id: data.submissionId, duplicate: true });
    if (existing === 'recent') {
      return respond({ status: 'duplicate', message: "We already have your details for this - thank you! We'll be in touch soon." });
    }

    var row = COLUMNS.map(function (c) {
      var key = c[0];
      if (key === 'submittedAt') return new Date(data.submittedAt || Date.now());
      return sanitize(data[key]);
    });
    sheet.appendRow(row);
    return respond({ status: 'ok', id: data.submissionId });
  } catch (err) {
    return respond({ status: 'error', message: 'Could not save the submission: ' + err.message });
  } finally {
    lock.releaseLock();
  }
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Empty request body');
  var data = JSON.parse(e.postData.contents);
  if (!data.submissionId) data.submissionId = 'SUP-' + Utilities.getUuid().slice(0, 8).toUpperCase();
  return data;
}

function validate(d) {
  if (!d.fullName || !String(d.fullName).trim()) return 'Full name is required.';
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(d.email).trim())) return 'A valid email address is required.';
  if (!d.category) return 'Support category is required.';
  return null;
}

/** Prevent spreadsheet formula injection and trim strings. */
function sanitize(value) {
  if (value === undefined || value === null) return '';
  var s = String(value).trim();
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function getSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  var headers = COLUMNS.map(function (c) { return c[1]; });
  var firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var hasHeaders = firstRow[0] === headers[0];
  if (!hasHeaders) {
    if (sheet.getLastRow() > 0) sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Returns 'same-id' if this exact submission was already stored (safe retry),
 * 'recent' if the same email + category arrived within the duplicate window,
 * or null when the row is new.
 */
function findExisting(sheet, data) {
  var last = sheet.getLastRow();
  if (last < 2) return null;
  var values = sheet.getRange(2, 1, last - 1, 5).getValues(); // id, date, category, name, email
  var email = String(data.email || '').trim().toLowerCase();
  var now = Date.now();
  for (var i = values.length - 1; i >= 0; i--) {
    var r = values[i];
    if (r[0] === data.submissionId) return 'same-id';
    var when = r[1] instanceof Date ? r[1].getTime() : Date.parse(r[1]);
    if (String(r[4]).toLowerCase() === email && r[2] === data.category && when && now - when < DUPLICATE_WINDOW_MS) {
      return 'recent';
    }
  }
  return null;
}

function respond(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to create the sheet/headers and grant permissions. */
function setup() {
  getSheet();
  Logger.log('Sheet "' + SHEET_NAME + '" is ready.');
}

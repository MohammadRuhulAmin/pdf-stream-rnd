const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF output to a file
const outputStream = fs.createWriteStream('output.pdf');
doc.pipe(outputStream);

// Add text to the PDF
doc.fontSize(16).text('Hello, this is a PDF document created with Node.js!', 100, 100);

// Add another line
doc.moveDown().fontSize(12).text('This is a second line of text.');

// Draw a rectangle
doc.rect(100, 150, 200, 100).stroke();

// Finalize and close the PDF document
doc.end();

console.log('PDF created successfully!');

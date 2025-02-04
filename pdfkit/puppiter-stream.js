const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePdfStream() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // HTML content to convert to PDF
  const htmlContent = `
    <html>
      <head><title>Test PDF</title></head>
      <body>
        <h1>This is a title</h1>
        <p>This is a paragraph.</p>
        <table border="1">
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);

  // Create a PDF stream and pipe it to a file
  const pdfStream = await page.createPdfStream();
  const writeStream = fs.createWriteStream('output.pdf');

  pdfStream.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('PDF generated and saved as output.pdf');
  });

  await browser.close();
}

generatePdfStream();

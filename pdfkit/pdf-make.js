const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    size: [1200,1200]
});
const stream = fs.createWriteStream('large.pdf');

doc.pipe(stream);

// Function to draw a table
function drawTable(doc, startX, startY, data) {
    const colWidths = [100, 150, 150, 100]; // Column widths
    const rowHeight = 30; // Row height

    // Draw table headers
    doc.font('Helvetica-Bold');
    let x = startX, y = startY;
    const headers = ['ID', 'Name', 'Role', 'Salary'];

    headers.forEach((header, i) => {
        doc.text(header, x, y, { width: colWidths[i], align: 'center' });
        x += colWidths[i];
    });

    // Draw rows
    doc.font('Helvetica');
    y += rowHeight;
    data.forEach(row => {
        x = startX;
        row.forEach((cell, i) => {
            doc.text(cell.toString(), x, y, { width: colWidths[i], align: 'center' });
            x += colWidths[i];
        });
        y += rowHeight;
    });
}



// Sample table data (5 rows, 4 columns)
const tableData = [
    [1, 'Alice', 'Engineer', '$100K'],
    [2, 'Bob', 'Manager', '$120K'],
    [3, 'Charlie', 'Designer', '$90K'],
    [4, 'David', 'Analyst', '$95K'],
    [5, 'Eve', 'Developer', '$110K']
];

// Generate 5000 pages with a table on each
for (let i = 1; i <= 5; i++) {
    doc.addPage();
    doc.text(`Page ${i}`, 50, 30); // Add page number
    drawTable(doc, 50, 50, tableData); // Draw table
}

// Finish writing the PDF
doc.end();
stream.on('finish', () => console.log('PDF created successfully!'));

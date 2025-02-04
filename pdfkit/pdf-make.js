const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: [1200, 1200] });
const stream = fs.createWriteStream('large.pdf');

doc.pipe(stream);

// ✅ Register Bengali Font
doc.registerFont('BanglaFont', './NotoSerifBengali-Regular.ttf'); 

// Function to draw a table
function drawTable(doc, startX, startY, data) {
    const colWidths = [100, 250, 250, 150]; // Adjusted column widths
    const rowHeight = 40; // Adjusted row height

    // ✅ Draw table headers (English text)
    doc.font('Helvetica-Bold'); 
    let x = startX, y = startY;
    const headers = ['ID', 'Name', 'Role', 'Salary'];

    headers.forEach((header, i) => {
        doc.text(header, x, y, { width: colWidths[i], align: 'center' });
        x += colWidths[i];
    });

    // ✅ Draw rows (Separate fonts for English & Bengali)
    y += rowHeight;

    data.forEach(row => {
        x = startX;
        row.forEach((cell, i) => {
            if (typeof cell === 'string' && /[\u0980-\u09FF]/.test(cell)) { 
                // ✅ Bengali text (Uses BanglaFont)
                doc.font('BanglaFont');
            } else {
                // ✅ English text (Uses Helvetica)
                doc.font('Helvetica');
            }
            doc.text(cell.toString(), x, y, { width: colWidths[i], align: 'center' });
            x += colWidths[i];
        });
        y += rowHeight;
    });
}

// ✅ Sample table data (Mixing Bengali & English)
const tableData = [
    [1, 'রুহুল আমিন', 'ইঞ্জিনিয়ার', '$100K'],
    [2, 'সাকিব', 'ম্যানেজার', '$120K'],
    [3, 'সাজিদ', 'ডিজাইনার', '$90K'],
    [4, 'David', 'Analyst', '$95K'],
    [5, 'Eve', 'Developer', '$110K']
];

// ✅ Generate 5000 pages with a table on each
for (let i = 1; i <= 5; i++) {  // Change to 5000 for full test
    doc.addPage();
    doc.font('Helvetica-Bold').text(`Page ${i}`, 50, 30); // Page number
    drawTable(doc, 50, 60, tableData); // Draw table
}

// ✅ Finish writing the PDF
doc.end();
stream.on('finish', () => console.log('✅ PDF created successfully!'));

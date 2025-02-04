const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: [1200, 1200] });
doc.registerFont('BanglaFont', './NotoSerifBengali-Regular.ttf'); 
const stream = fs.createWriteStream('large.pdf');

doc.pipe(stream);
doc.font('BanglaFont')
    .fontSize(16)
    .text("বাংলাদেশ ফরম নং ৫৪৬২ (সংশোধিত)", 50, 1200);


// Function to draw a table
function drawTable(doc, startX, startY, data) {
    const colWidths = [50, 250, 250, 150]; // Adjusted column widths
    const rowHeight = 40; // Adjusted row height

    // ✅ Draw table headers (English text)
    doc.font('Helvetica-Bold').fontSize(14); 
    let x = startX, y = startY;
    const headers = ['ID', 'Name', 'Role', 'Salary'];

    // headers.forEach((header, i) => {
    //     doc.text(header, x, y, { width: colWidths[i], align: 'center' });
    //     doc.rect(x, y, colWidths[i], rowHeight).stroke(); 
    //     x += colWidths[i];
    // });

    // ✅ Draw rows (Separate fonts for English & Bengali)
    y += rowHeight;

    data.forEach(row => {
        x = startX;
        row.forEach((cell, i) => {
            doc.rect(x, y, colWidths[i], rowHeight).stroke();
            if (typeof cell === 'string' && /[\u0980-\u09FF]/.test(cell)) { 
                doc.font('BanglaFont');
            } else {
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
    [1, 'পিতা/স্বামী: মোঃ সিরাজ মিয়া', 'পিতা/স্বামী: মোঃ সিরাজ মিয়া', '$100K'],
    [2, 'সাকিব', 'পিতা/স্বামী: মোঃ সিরাজ মিয়া', '$120K'],
    [3, 'পিতা/স্বামী: মোঃ সিরাজ মিয়া', 'ডিজাইনাপিতা/স্বামী: মোঃ সিরাজ মিয়ার', '$90K'],
    [4, 'David', 'Analyst', '$95K'],
    [5, 'Eve', 'Developer', '$110K']
];

// ✅ Generate 5000 pages with a table on each
for (let i = 0; i <= 5; i++) {  
    doc.addPage();
    doc.font('Helvetica-Bold').text(`Page ${i}`, 50, 30); 
    drawTable(doc, 50, 60, tableData);
}

// ✅ Finish writing the PDF
doc.end();
stream.on('finish', () => console.log('✅ PDF created successfully!'));

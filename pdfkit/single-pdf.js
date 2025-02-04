const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: [1200, 1200] });
doc.registerFont('BanglaFont', './NotoSerifBengali-Regular.ttf'); 
const stream = fs.createWriteStream('large.pdf');

doc.pipe(stream);
doc.font('BanglaFont')
    .fontSize(16)
    .text("বাংলাদেশ ফরম নং ৫৪৬২ (সংশোধিত)", 50, 100);

doc.font('BanglaFont')
    .fontSize(25)
    .text("খতিয়ান নং ৮২৩", 500, 55);





doc.end();
stream.on('finish', () => console.log(' PDF created successfully!'));
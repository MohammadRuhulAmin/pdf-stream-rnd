const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: [1450, 1250] });
doc.registerFont('BanglaFont', './NotoSerifBengali-Regular.ttf'); 
const stream = fs.createWriteStream('large.pdf');

doc.pipe(stream);
doc.font('BanglaFont')
    .fontSize(16)
    .text("বাংলাদেশ ফরম নং ৫৪৬২ (সংশোধিত)", 50, 100);

doc.font('BanglaFont')
    .fontSize(25)
    .text("খতিয়ান নং ৮২৩", 500, 55);

doc.image('./image.png', 745, 30, {  // (x, y) position in the PDF
    width: 100,  // Resize the image width
    height: 100  // Resize the image height (optional)
});


doc.font('BanglaFont')
    .fontSize(16)
    .text("আবেদন নম্বর :৩১৩৫৪৫৪",800+50, 30)
    .text("নামজারির মামলা নং: ১,৫০১(IX-I)/২০২৪-২৫",800+50,50)
    .text("আবেদনের তারিখ : ০৮-১০-২০২৪",800+50,70)
    .text("অনলাইন ডিসিআর নং: 24366800101501",800+50,90)
    .text("খতিয়ান পরিচিতি নম্বর: ৬০৩৬৬৮-২৩১২২৪", 800+50, 110)


doc.font('BanglaFont')
    .fontSize(16)
    .text("জেলা : হবিগঞ্জ",100,155)

doc.font('BanglaFont')
    .fontSize(16)
    .text("উপজেলা /সার্কেল : লাখাই",400,155)


doc.font('BanglaFont')
    .fontSize(16)
    .text("মৌজা: ফরিদপুর",800,155)

doc.font('BanglaFont')
    .fontSize(16)
    .text("জে.এল নং: ১",1200,155)



const headers = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5', 'Col 6', 'Col 7', 'Col 8', 'Col 9'];
    // const data = [
    //   ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3', 'Row 1, Col 4', 'Row 1, Col 5', 'Row 1, Col 6', 'Row 1, Col 7', 'Row 1, Col 8', 'Row 1, Col 9'],
    //   ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3', 'Row 2, Col 4', 'Row 2, Col 5', 'Row 2, Col 6', 'Row 2, Col 7', 'Row 2, Col 8', 'Row 2, Col 9'],
    //   ['Row 3, Col 1', 'Row 3, Col 2', 'Row 3, Col 3', 'Row 3, Col 4', 'Row 3, Col 5', 'Row 3, Col 6', 'Row 3, Col 7', 'Row 3, Col 8', 'Row 3, Col 9'],
    //   ['Row 4, Col 1', 'Row 4, Col 2', 'Row 4, Col 3', 'Row 4, Col 4', 'Row 4, Col 5', 'Row 4, Col 6', 'Row 4, Col 7', 'Row 4, Col 8', 'Row 4, Col 9']
    // ];
    let x = 1;
    let y = 200;
    const rowHeight = 20; // Row height
    const colWidth = 60;  // Column width
    
    // Draw table headers
    headers.forEach((header, index) => {
      doc.rect(x + (index * colWidth), y, colWidth, rowHeight).stroke();
    //   doc.text(header, x + (index * colWidth) + 50, y + 50);
    });
    
    // Draw table rows
    // data.forEach((row, rowIndex) => {
    //   y += rowHeight;
    //   row.forEach((cell, colIndex) => {
    //     doc.rect(x + (colIndex * colWidth), y, colWidth, rowHeight).stroke();
    //     doc.text(cell, x + (colIndex * colWidth) + 50, y + 50);
    //   });
    // });

doc.end();
stream.on('finish', () => console.log(' PDF created successfully!'));
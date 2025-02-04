const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: [1200, 1250] });
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




doc.end();
stream.on('finish', () => console.log(' PDF created successfully!'));
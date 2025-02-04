const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.registerFont('BanglaFont', './NotoSerifBengali-Regular.ttf'); 
doc.pipe(fs.createWriteStream('output.pdf'));

// Title section
doc.font('BanglaFont')
   .text('বাংলাদেশ ফরম নং ৫৪৬২ (সংশোধিত)', { align: 'left' }).fontSize(16)
   .text('খতিয়ান নং ৮২৩', { align: 'center' })
   .text('আবেদন নম্বর : ৩১৩৫৪৫৪', { align: 'left' })
   .text('আবেদনের তারিখ : ০৮-১০-২০২৪', { align: 'left' })
   .moveDown();

// Image (You can include your barcode or logo using base64)
doc.image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/AQMAAABtkYKcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAKZJREFUKJF10LENwyAQBdCLXNCRBSxlDTqv5CyAnAXwSulYA4kFKF0gLt+KXNh8X/UK7u4forrlNmmTHklcLk4sQW7uVZwGDpFbpBvsk5djxRl7nnAEOwOlRf51gX42XTV5gvqOybo6E+gyjd7kQDAgrcbRE2hAr0kzAQq9uKIHrhAs9QS4PT1jFQL82BAM3lAgKs6nyGvEj/XAZEQVIUCe+vhW2+MHM/ITreH/1dYAAAAASUVORK5CYII=', { width: 80, height: 80 })
   .moveDown();

// Add a table with multiple rows
doc.text('মালিক, অকৃষি প্রজা বা ইজারাদারের নাম ও ঠিকানা', { width: 100, align: 'center' })
   .text('অংশ', { width: 100, align: 'center' })
   .text('মোট ভূমি উন্নয়ন কর', { width: 100, align: 'center' })
// Continue adding all your table content here...

// Signature and other final content
doc.text('প্রস্তাবিত খতিয়ান', { align: 'center', underline: true })
   .moveDown()
   .text('১৪/১২/২০২৪', { align: 'center' });

// End the document
doc.end();

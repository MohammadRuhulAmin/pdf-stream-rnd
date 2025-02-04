const puppeteer = require('puppeteer');

async function convertHtmlToPdf() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const viewport = {width:1920,height:1080}
  await page.setViewport(viewport); 
  
//   const pdfOptions = {
//     path: 'custom_size_output.pdf',  // Save to a file (optional)
//     format: 'Letter',  // You can use A4, A3, Letter, etc., or set custom width and height
//     width: '1200px',  // Custom width in px
//     height: '1200px', // Custom height in px
//     printBackground: true  // Print background colors/images
//   };
  // HTML content you want to convert
  const htmlContent = `
    <div style="width: 100%; padding:0px; font-size: 100%; margin: 0px;">
  <table class="table" cellspacing="0" cellpadding="5" width="100%">
    <tbody>
      <tr>
        <td colspan="12" style="margin: 0px; padding: 0px;">
          <table cellspacing="0" cellpadding="5" width="100%">
            <tbody>
              <tr style="padding: 0px; margin: 0px;">
                <td width="30%" style="padding:0px; text-align: left;">
                  বাংলাদেশ ফরম নং ৫৪৬২ (সংশোধিত)
                </td>
                <td width="35%" style="padding:0px; text-align: center;font-size:27px;">
                  খতিয়ান নং
                  ৮২৩
                </td>
                <td width="35%" style="padding:0px; text-align: left;">
                  <table>
                    <tbody>
                      <tr>
                        <td style="">

                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/AQMAAABtkYKcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAKZJREFUKJF10LENwyAQBdCLXNCRBSxlDTqv5CyAnAXwSulYA4kFKF0gLt+KXNh8X/UK7u4forrlNmmTHklcLk4sQW7uVZwGDpFbpBvsk5djxRl7nnAEOwOlRf51gX42XTV5gvqOybo6E+gyjd7kQDAgrcbRE2hAr0kzAQq9uKIHrhAs9QS4PT1jFQL82BAM3lAgKs6nyGvEj/XAZEQVIUCe+vhW2+MHM/ITreH/1dYAAAAASUVORK5CYII=" alt="barcode" style="width:80px;height: 80px">
                        </td>
                        <td style="">
                          আবেদন নম্বর :৩১৩৫৪৫৪
                          <br>
                          আবেদনের তারিখ :
                          ০৮-১০-২০২৪
                          <br>

                          নামজারির মামলা নং: ১,৫০১(IX-I)/২০২৪-২৫
                          <br>

                          অনলাইন ডিসিআর নং: DCR24366800101501
                          <br>
                          খতিয়ান পরিচিতি নম্বর: ৬০৩৬৬৮-২৩১২২৪
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="padding: 0px; text-align: center;">জেলা
          : হবিগঞ্জ</td>
        <td colspan="3" style="text-align: center;">উপজেলা /সার্কেল
          : লাখাই</td>
        <td colspan="3" style="text-align: center;">মৌজা: ফরিদপুর</td>
        <td colspan="3" style="text-align: center;">জে.এল নং: ১</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="row">
  <div class="col-md-12">
    <div style="width: 100%; padding:0px; font-size: 100%; margin: 0px;" class="khotian_print_large">
      <table class="table" id="kh_tbl" align="center" cellspacing="0" cellpadding="5" style="width:100% ;margin-top:0%;margin-left: 0%;margin-right:0%;font-size:100%; ">
        <tbody>
          <tr>
            <td style="text-align: center;border: 1px solid #000000; border-bottom: 0px;  width: 20%;"> মালিক, অকৃষি প্রজা বা <br>ইজারাদারের নাম ও ঠিকানা</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; ">অংশ</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; white-space: nowrap; ">মোট ভূমি উন্নয়ন কর <br> (প্রতি শতক) </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; ">দাগ নং</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; ">জমির শ্রেণি</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; white-space: nowrap; ">দাগের মোট জমির পরিমাণ <br> (একর)</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; white-space: nowrap;">দাগের মধ্যে অত্র <br> খতিয়ানের অংশ</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; ">অংশানুযায়ী জমির পরিমাণ <br> (একর) </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; width: 19%;">দখল/স্বত্ত বিষয়ক বা অন্যান্য<br> বিষয়ে মন্তব্য</td>
          </tr>
          <tr>
            <td style="text-align: center;border: 1px solid #000000; border-bottom: 0px; vertical-align: top;">১</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">২</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">৩</td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">৪</td>

            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px;  vertical-align: top;">
              ৫ </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">
              ৬ </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">
              ৭ </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">
              ৮ </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; border-bottom: 0px; vertical-align: top;">৯</td>
          </tr>


          <tr>
            <td style="text-align: left; border: 1px solid #000000; vertical-align: top;">
              <div>
                মোঃ ইরাজ মিয়া<br>পিতা/স্বামী: মোঃ সিরাজ মিয়া<br>মাতা: সায়েরা খাতুন<br>জাতীয় পরিচয়পত্র: ৮২০২৯৬৩৫৪৫<br>ফরিদপুর।<br> </div>
            </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                ১<br><br><br><br><br>
              </div>
            </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                ২.০০ </div>
            </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                ৩৬৭০<br>৩৫৭১ </div>
            </td>



            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                বাড়ী<br>নাল<br> </div>
            </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                ০.৪৭<br>০.৬৪<br> </div>
            </td>


            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                ১.০০০<br>১.০০০ </div>
            </td>
            <td style="text-align: center;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                ০.০০৪৭০০<br>০.০০৬৪০০<br> </div>
            </td>
            <td style="text-align: left;border: 1px solid #000000; border-left:0px; vertical-align: top;">
              <div>
                <p>দলিল নং: ১৬১৮<br>
                  তাং: ২০/০৮/২০১৪<br>
                  লাখাই, হবিগঞ্জ<br>
                  <br>
                  দলিল নং: ১৯৫৯<br>
                  তাং: ১৩/১১/২০১৬<br>
                  লাখাই, হবিগঞ্জ<br>
                  <br>
                  আগত খতিয়ান: ২৭৩,৬৭।
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="text-align: left;border: 1px solid #000000;vertical-align: top;">
              এস এ এন্ড টি এ্যাক্ট, ১৯৫০ এর ১৪৩ ও ১১৬/১১৭৭ ধারামতে আদেশ দেওয়া হলো
            </td>
            <td style="text-align: right;border: 1px solid #000000;vertical-align: top;">
              <div>
                ১.০০০ </div>
            </td>
            <td style="text-align: right;border: 1px solid #000000;vertical-align: top;" colspan="5">
              মোট জমি &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>

            <td style="text-align: center;border: 1px solid #000000;vertical-align: top;">
              <div style="">
                ১.০১১১০০ </div>
            </td>
            <td style="border: 1px solid #000000;">
              <div style="">
                কথায়: ১ একর ১১ শতক ০০ অযুতাংশ ০০ লক্ষাংশ </div>

            </td>
          </tr>



        </tbody>
      </table>
      <!-- Signature break down     -->
      <!-- Signature break down     -->
      <div style="width:100% ;margin-top:2%;margin-left: 0%;margin-right:5%;font-size:100%;">
        <div class="khotian_comment_row" style=" background-color:#ffffff;padding-left:2%;padding-right:1%;width: 15%; font-size:13px;float:left; ">
          <div style="width: 100%; float: right; text-align: center;  display: inline-block">
            প্রস্তাবিত খতিয়ান<br>
            <div style="border-bottom: 1px solid purple;">

              <img style="max-height: 20px; padding-bottom: 0px !important; margin-bottom: 0px!important;" src="
                                                                            " alt="">
              <div style="color: blue; font-size: 12px; margin-left: 45%; margin-top: -5px">
                ১৪/১২/২০২৪ </div>
            </div>
            <div style="color: purple; line-height: 1.1em; !important;">
              <div style="margin: 5px 0px 0px 0px; ">
                <span style="font-size:13px"> (মোঃ আব্দুল কাইউম )<br></span>
                <span style="font-size:11px"> ইউনিয়ন ভূমি সহকারী কর্মকর্তা<br></span>
                <span style="font-size:11px"> বুল্লা ইউনিয়ন ভূমি অফিস<br></span>

              </div>
            </div>
          </div>
        </div>

        <div class="khotian_comment_row" style="background-color:#ffffff; padding-left:2%; padding-right:1%; width: 15%; float:left ;font-size:13px; margin-left: 250px; margin-right: 250px !important;">
          <div style="width: 100%; float: right; text-align: center;  display: inline-block">
            <div>
              <img style="marmax-height: 100px; width:80%; padding-bottom: 0px !important; margin-bottom: 0px!important;" src="http://localhost:8000/images/logo/438.png" alt="">

            </div>
          </div>
        </div>
        <div class="khotian_comment_row" style=" background-color:#ffffff;padding-left:2%;padding-right:1%;width: 15%; font-size:13px;float:left; margin-left: 240px; margin-right: 240px !important;">
          <div style="width: 100%; float: right; text-align: center;  display: inline-block">
            অনুমোদিত খতিয়ান<br>
            <div style="border-bottom: 1px solid purple;">

              <img style="max-height: 20px; padding-bottom: 0px !important; margin-bottom: 0px!important;" src="
                                                                            " alt="">
              <div style="color: blue; font-size: 12px; margin-left: 45%; margin-top: -5px">
                ১৪/১২/২০২৪ </div>
            </div>
            <div style="color: purple; line-height: 1.1em; !important;">
              <div style="margin: 5px 0px 0px 0px; ">
                <span style="font-size:13px"> (মাসুদুর রহমান)<br></span>
                <span style="font-size:11px"> সহকারী কমিশনার (ভূমি)<br></span>
                <span style="font-size:11px"> উপজেলা ভূমি অফিস<br></span>

              </div>
            </div>
          </div>
        </div>



      </div>
      <hr>
      <div style="font-size: 13px;page-break-inside: avoid">
        <br>
        <strong>বিশেষ দ্রষ্টব্য: </strong> <br>
        ১। এই মিউটেশন খতিয়ানটি অনলাইন মিউটেশন সিস্টেম কর্তৃক প্রণীত। ইহা আইনগতভাবে বৈধ ও সর্বক্ষেত্রে গ্রহণযোগ্য হবে। <br>
        ২। অনলাইন খতিয়ানের সঠিকতা যাচাইয়ের জন্য কিউআর (QR) কোডটি স্ক্যান করে ভূমি মন্ত্রণালায়ের ওয়েবসাইট থেকে যাচাই করতে পারবেন। <br>
        ৩। ভূমি অফিস থেকে ম্যানুয়াল খতিয়ান সংগ্রহ করার প্রয়োজনীয়তা নেই। <br>
        ৪। ভূমি বিষয়ক যেকোন তথ্য বা পরামর্শের জন্য ১৬১২২ নম্বরে কল করুন।
      </div>
    </div>
  </div>
</div>
  `;
  
  await page.setContent(htmlContent);
// await page.pdf({ path: 'output.pdf' , format: 'Letter'});
await page.pdf({
    path: 'output.pdf',
    width: `${viewport.width}px`,   // Dynamically use the current width of the viewport
    height: `${viewport.height}px`, // Dynamically use the current height of the viewport
    printBackground: true,
  });
  await browser.close();
}

convertHtmlToPdf();

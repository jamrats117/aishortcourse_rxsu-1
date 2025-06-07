function doPost(e) {
  // ✅ 1️⃣ รับข้อมูล JSON ที่ส่งมา
  var requestJSON = e.postData.contents;

  // ✅ 2️⃣ แปลง JSON → JavaScript Object
  var requestObj = JSON.parse(requestJSON).events[0];

  // ✅ 3️⃣ ดึงข้อความที่ผู้ใช้ส่งมา
  var userMessage = requestObj.message.text;

  // ✅ 4️⃣ ดึง reply token (สำหรับตอบกลับ LINE)
  var token = requestObj.replyToken;

  // ✅ 5️⃣ แสดงค่าต่างๆ ใน Logger (debug)
  Logger.log("ข้อความผู้ใช้: " + userMessage);
  Logger.log("replyToken: " + token);

  return ContentService.createTextOutput("OK");
}

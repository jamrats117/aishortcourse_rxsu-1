/**
 * ฟังก์ชันพิเศษ doPost - รับ request JSON จาก Dialogflow
 */
function doPost(e) {
  // ✅ 1️⃣ ตรวจสอบว่ารูปแบบ request ถูกต้อง (optional)
  if (e.postData.type !== 'application/json') {
    return ContentService.createTextOutput('Invalid request format')
      .setMimeType(ContentService.MimeType.TEXT);
  }

  // ✅ 2️⃣ แปลง JSON → JavaScript object
  var json = JSON.parse(e.postData.contents);

  // ✅ 3️⃣ ดึง parameter จาก outputContexts[0]
  var herbEntity = json.queryResult.outputContexts[0].parameters.herbname;

  // ✅ 4️⃣ (ตัวอย่าง) ค้นหาข้อมูลใน Google Sheet
  var result = searchHerbInSheet(herbEntity);

  // ✅ 5️⃣ สร้างข้อความตอบกลับ
  var responseText = result
    ? `สมุนไพร: ${result.herb}\nผลต่อ INR: ${result.effect}`
    : 'ไม่พบสมุนไพรในระบบ กรุณาสอบถาม Admin';

  // ✅ 6️⃣ ส่ง response กลับเป็น JSON (Dialogflow fulfillment)
  var responseJson = {
    fulfillmentText: responseText
  };

  return ContentService
    .createTextOutput(JSON.stringify(responseJson))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ตัวอย่างฟังก์ชันค้นหาใน Google Sheet (dummy)
 */
function searchHerbInSheet(herbName) {
  // ตัวอย่าง: จะคืนค่าจำลองเป็น object
  if (herbName === "กระเทียม") {
    return { herb: "กระเทียม", effect: "เพิ่ม INR" };
  } else {
    return null;
  }
}

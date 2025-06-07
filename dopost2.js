/**
 * ฟังก์ชันพิเศษ doPost - รับ request JSON จาก Dialogflow
 * และค้นหา context ตามชื่อ (เช่น dosecal-followup)
 */
function doPost(e) {
  // ✅ 1️⃣ แปลง JSON → JavaScript object
  var request = JSON.parse(e.postData.contents);

  // ✅ 2️⃣ ดึง outputContexts ทั้งหมด (array)
  var outputContexts = request.queryResult.outputContexts;
  var contextParameters;

  // ✅ 3️⃣ วนลูปหา context ที่ชื่อ endsWith '/contexts/dosecal-followup'
  for (var i = 0; i < outputContexts.length; i++) {
    var contextName = outputContexts[i].name;
    if (contextName.endsWith('/contexts/dosecal-followup')) {
      contextParameters = outputContexts[i].parameters;
      break;
    }
  }

  // ✅ 4️⃣ (ตัวอย่าง) ดึงค่า drugs และ weight จาก context
  var drug = contextParameters ? contextParameters.drugs : 'ไม่พบ drugs';
  var weight = contextParameters ? contextParameters.weight : 'ไม่พบ weight';

  // ✅ 5️⃣ สร้างข้อความตอบกลับ
  var responseText = `ยาที่ได้: ${drug}\nน้ำหนัก: ${weight}`;

  // ✅ 6️⃣ สร้าง response JSON (Dialogflow fulfillment)
  var responseJson = {
    fulfillmentText: responseText
  };

  return ContentService
    .createTextOutput(JSON.stringify(responseJson))
    .setMimeType(ContentService.MimeType.JSON);
}

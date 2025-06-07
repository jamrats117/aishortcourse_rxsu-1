/**
 * ฟังก์ชันพิเศษ doPost - รับ webhook จาก Telegram
 * พร้อม log และตรวจสอบข้อมูลให้เข้าใจง่าย
 */
function doPost(e) {
  try {
    // ✅ 1️⃣ log ข้อมูลดิบที่ได้รับ (debug)
    Logger.log("📦 Raw data: " + e.postData.contents);

    // ✅ 2️⃣ แปลง JSON string → JavaScript object
    var update = JSON.parse(e.postData.contents);
    Logger.log("✅ Parsed update: " + JSON.stringify(update, null, 2));

    // ✅ 3️⃣ ตรวจสอบว่ามีข้อความจากผู้ใช้มั้ย
    if (update.message) {
      handleMessage(update.message);
    }

    // ✅ 4️⃣ ตรวจสอบว่ามี callback query มั้ย (inline button)
    if (update.callback_query) {
      handleCallbackQuery(update.callback_query);
    }

    // ✅ 5️⃣ ตอบกลับ Telegram (ไม่ต้องส่งจริง ถ้าไม่ต้องการ)
    return ContentService.createTextOutput("OK");

  } catch (error) {
    Logger.log("❌ Error in doPost: " + error.toString());
    return ContentService.createTextOutput("Error");
  }
}

/**
 * จัดการข้อความจากผู้ใช้
 */
function handleMessage(message) {
  var chatId = message.chat.id;
  var text = message.text || "";
  var firstName = message.from.first_name || "";
  var lastName = message.from.last_name || "";

  Logger.log("👤 ผู้ใช้: " + firstName + " " + lastName);
  Logger.log("💬 ข้อความ: " + text);

  // ✅ (ตัวอย่าง) ตอบกลับผู้ใช้
  // sendMessage(chatId, "Bot ได้รับข้อความแล้ว: " + text);
}

/**
 * จัดการ callback query (ปุ่ม inline keyboard)
 */
function handleCallbackQuery(callbackQuery) {
  var chatId = callbackQuery.message.chat.id;
  var data = callbackQuery.data;

  Logger.log("🔘 Callback data: " + data);
  Logger.log("📨 Chat ID: " + chatId);

  // ✅ (ตัวอย่าง) ตอบกลับข้อความปุ่ม
  // sendMessage(chatId, "คุณกดปุ่ม: " + data);
}

/**
 * (Optional) ฟังก์ชันส่งข้อความตอบกลับผู้ใช้ (Telegram Bot API)
 * - ต้องกำหนด BOT_TOKEN ของคุณ
 */
function sendMessage(chatId, text) {
  var BOT_TOKEN = "YOUR_BOT_TOKEN";
  var url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

  var payload = {
    "chat_id": chatId,
    "text": text
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

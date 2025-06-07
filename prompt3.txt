ฉันต้องการสร้าง web app สำหรับคำนวณขนาดยาสำหรับเด็ก โดยใช้ Google Apps Script ข้อมูลมีดังนี้:

รายละเอียดของโปรเจกต์:
ข้อมูลที่มี:
ข้อมูล LINE_CHANNEL_ACCESS_TOKEN จะถูกเก็บไว้ใน Script Properties
รายละเอียดข้อมูลยา  เก็บในตัวแปร list ไม่ต้องเก็บใน gg sheet:
รหัส p11:
ยา:  Paracetamol
ขนาดยาต่ำสุด: 10 mg/dose
ขนาดยาสูงสุด: 15 mg/dose
หน่วย: mg/dose
รูปภาพ: 1DY8cTrb-Dmu8wbfRHdgvDXTGIZxlSUDO
รหัส i11:
ยา: Ibuprofen
ขนาดยาต่ำสุด: 5 mg/dose
ขนาดยาสูงสุด: 10 mg/dose
หน่วย: mg/dose
รูปภาพ: 1L1FLXradRWfD3gDcCndmRqZaZNUOSQkO
รหัส a11:
ยา: Amoxicillin
ขนาดยาต่ำสุด: 20 mg/day
ขนาดยาสูงสุด: 50 mg/day
หน่วย: mg/day
รูปภาพ: 1L_mkGNEaeHp5KdC-ggvrFGBYNVzJrAOd
รหัส d11:
รหัสยา: Dicloxacillin
ขนาดยาต่ำสุด: 12.5 mg/day
ขนาดยาสูงสุด: 25 mg/day
หน่วย: mg/day
รูปภาพ: 1rrwIP-hVima-ptcs8G3TsGCWiDl7rKi1


วัตถุประสงค์:
ฉันต้องการให้แอปพลิเคชันนี้คำนวณขนาดยาที่เหมาะสมสำหรับเด็กโดยใช้ข้อมูลขนาดยาต่ำสุดและขนาดยาสูงสุดที่ให้มาในรายการนี้
ผู้ใช้จะใส่น้ำหนักตัวของเด็ก (กิโลกรัม) และแอปจะคำนวณขนาดยาที่ควรได้รับ โดยแสดงผลเป็นช่วงขนาดยาต่ำสุดถึงสูงสุด ตามสูตรนี้:
***
ขนาดยาที่ควรได้รับ = น้ำหนักเด็ก * ขนาดยาต่ำสุด และ น้ำหนักเด็ก * ขนาดยาสูงสุด
***

**ฟังก์ชันที่ต้องการ:**
1. **รับค่า Input**: ให้ผู้ใช้ใส่ค่า druglist, weight
2. **คำนวณ**: ใช้สูตร ขนาดยาที่ควรได้รับ
3. **แสดงผลลัพธ์**: ส่งข้อความกลับในรูปแบบต่อไปนี้:
ยาที่เลือก: Paracetamol น้ำหนักเด็ก: 10 กิโลกรัม
ขนาดยาที่ควรได้รับ: 100 - 150 mg/dose
แสดงรูปภาพที่เป็น ID จากการ share google link ใน drive 

นี่คือค่า API responses ที่ฉันสร้างใน Dialogflow response เกิดขึ้นตรง getdrugdosing-followup
{
  "responseId": "78776d28-fcef-4dfe-9f8a-79b71d28dc7b-0fffcc35",
  "queryResult": {
    "queryText": "คำนวณยาพารา เด็กหนัก 12",
    "parameters": {
      "druglist": "Paracetamol",
      "weight": 12
    },
    "allRequiredParamsPresent": true,
    "fulfillmentText": "ต้องการคำนวณขนาดยา Paracetamol สำหรับเด็กน้ำหนัก 12 ใช่หรือไม่??",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "ต้องการคำนวณขนาดยา Paracetamol สำหรับเด็กน้ำหนัก 12 ใช่หรือไม่??"
          ]
        }
      }
    ],
    "outputContexts": [
      {
        "name": "projects/drugcal-tqon/agent/sessions/863ac791-b3af-2f7a-2cb9-d53d50b8988d/contexts/getdrugdosing-followup",
        "lifespanCount": 2,
        "parameters": {
          "druglist.original": "ยาพารา",
          "weight": 12,
          "weight.original": "12",
          "druglist": "Paracetamol"
        }
      }
    ],
    "intent": {
      "name": "projects/drugcal-tqon/agent/intents/a42f6964-abe2-4fb1-b4c8-63b59361aaf8",
      "displayName": "getDrugDosing"
    },
    "intentDetectionConfidence": 0.6517938,
    "languageCode": "th"
  }
}
โปรดสร้าง fulfillment code ด้วย Google Apps Script ที่จะรับค่าจาก Dialogflow และคำนวณขนาดยา ตามที่กล่าวไว้

ใช้ request.queryResult.outputContexts เพื่อตรวจสอบและดึงค่าจาก Context โดยการวนลูปค้นหา Context ที่ต้องการ และดึงพารามิเตอร์จาก Context นั้น แบบนี้

  // Extract the output context
  var outputContexts = request.queryResult.outputContexts;
  var contextParameters = {};


  // Find the relevant context (getdrugdosing-followup)
  for (var i = 0; i < outputContexts.length; i++) {
    if (outputContexts[i].name.endsWith('/contexts/getdrugdosing-followup')) {
      contextParameters = outputContexts[i].parameters;
      break;
    }
  }
ส่งกลับ รูปภาพ เป็น image image uri

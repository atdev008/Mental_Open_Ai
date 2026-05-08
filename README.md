# Mental_Open_Ai

ต้นแบบแอพ `React + Next.js` สำหรับอุปกรณ์บันทึกและวิเคราะห์ข้อมูลสมองในเชิงผลิตภัณฑ์

## แนวคิดที่ทำในรอบนี้

- หน้าแดชบอร์ดสำหรับอุปกรณ์ Neural Memory Interface
- แสดงสถานะอุปกรณ์, สัญญาณสมอง, คุณภาพการเชื่อมต่อ, และตัวชี้วัดสุขภาวะ
- Memory Vault สำหรับย้อนดูเหตุการณ์สำคัญจากข้อมูลสมอง
- Consent และ Privacy controls สำหรับจำกัดสิทธิ์การเข้าถึง
- API mock ใน `Next.js` สำหรับจำลองการเชื่อมต่ออุปกรณ์และการจัดการข้อมูล

## โครงสร้างหลัก

- `src/app/page.tsx` หน้าหลักของระบบ
- `src/components/device-dashboard.tsx` React dashboard หลัก
- `src/app/api/*` route handlers สำหรับ backend mock
- `src/lib/mock-db.ts` ข้อมูลตัวอย่างและฟังก์ชันจำลองสถานะอุปกรณ์

## Run

```bash
npm install
npm run dev
```

จากนั้นเปิด `http://localhost:3000`

## API ที่มีให้

- `GET /api/device/status`
- `POST /api/device/sync`
- `GET /api/memories`
- `GET /api/consent`
- `POST /api/consent`
- `PATCH /api/consent`

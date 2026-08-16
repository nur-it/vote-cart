## 1. Update Static Image Asset Paths

- [x] 1.1 Update `src/lib/poll-data.ts` to map all 18 options to their corresponding `/categories/*.png` paths
- [x] 1.2 Verify that all 18 file paths in `src/lib/poll-data.ts` match the files present in `public/categories/`

## 2. Optimize Poll API and Seeding Logic

- [x] 2.1 Remove the 18-query sequential `updateMany` loop from `ensureSeeded()` in `src/lib/poll-service.ts`
- [x] 2.2 Optimize `ensureSeeded()` to perform only a lightweight initial check if `count === 0`
- [x] 2.3 Optimize `computeResults()` query execution in `src/lib/poll-service.ts`

## 3. Database Update & Verification

- [x] 3.1 Update database records for existing options so `imageUrl` points to the local `/categories/*.png` paths
- [x] 3.2 Test `GET /api/poll` response time to ensure sub-100ms performance
- [x] 3.3 Verify in UI that all 18 category images render instantly from local assets

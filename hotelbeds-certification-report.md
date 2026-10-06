# Hotelbeds APItude Integration Certification Report

**Client Application:** Atlas Travel Club  
**API Key:** `dc875f564f8dd0cff3d401a57e88de0e`  
**Environment:** Sandbox (`api.test.hotelbeds.com`)  
**Execution Date:** 2026-10-06T04:56:05.687Z  

## Scenarios Summary

| Scenario | Method & Endpoint | Status Code | Result |
| :--- | :--- | :--- | :--- |
| 0_HEALTH_CHECK | `GET /status` | HTTP 200 | ✅ PASSED |
| 1_AVAILABILITY_SEARCH | `POST /hotels` | HTTP 403 | ⏳ QUOTA LIMITED |

## Detailed Logs

### 0_HEALTH_CHECK
**Request:**
```json
{
  "url": "https://api.test.hotelbeds.com/hotel-api/1.0/status",
  "method": "GET",
  "headers": {
    "Api-key": "dc875f564f8dd0cff3d401a57e88de0e",
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  "body": null
}
```

**Response (HTTP 200):**
```json
{
  "auditData": {
    "timestamp": "2026-10-06 04:56:08.812"
  },
  "status": "OK"
}
```

---

### 1_AVAILABILITY_SEARCH
**Request:**
```json
{
  "url": "https://api.test.hotelbeds.com/hotel-api/1.0/hotels",
  "method": "POST",
  "headers": {
    "Api-key": "dc875f564f8dd0cff3d401a57e88de0e",
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  "body": {
    "stay": {
      "checkIn": "2026-11-05",
      "checkOut": "2026-11-08"
    },
    "occupancies": [
      {
        "rooms": 1,
        "adults": 2,
        "children": 0
      }
    ],
    "hotels": {
      "hotel": [
        1067,
        1070,
        1500,
        1060
      ]
    }
  }
}
```

**Response (HTTP 403):**
```json
{
  "error": "Quota exceeded"
}
```

---


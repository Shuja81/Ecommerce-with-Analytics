#!/bin/bash

# Merchant Password Field Testing Script
# Tests the password functionality in merchant creation

echo "=== Merchant Password Field Testing Suite ==="
echo ""

API_URL="http://localhost:3000/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Note: Replace YOUR_ADMIN_TOKEN with actual admin JWT token
ADMIN_TOKEN="YOUR_ADMIN_JWT_TOKEN"

echo -e "${YELLOW}IMPORTANT: Replace YOUR_ADMIN_JWT_TOKEN with a valid admin JWT token${NC}"
echo ""

# Test 1: Create Merchant with Valid Password
echo -e "${BLUE}Test 1: Create Merchant with Valid Password${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Password: SecurePass123 (7 characters - meets minimum requirement)"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Merchant",
    "email": "merchant1@example.com",
    "password": "SecurePass123",
    "phoneNumber": "(123) 456-7890",
    "brandName": "TechBrand",
    "business": "Electronics retail business"
  }' | jq '.'
echo ""
echo -e "${GREEN}Expected: Success message with merchant details${NC}"
echo ""
echo "---"
echo ""

# Test 2: Create Merchant with Short Password
echo -e "${BLUE}Test 2: Create Merchant with Short Password (< 6 chars)${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Password: Pass (4 characters - below minimum)"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Merchant",
    "email": "merchant2@example.com",
    "password": "Pass",
    "phoneNumber": "(123) 456-7891",
    "brandName": "FashionBrand",
    "business": "Fashion and clothing business"
  }' | jq '.'
echo ""
echo -e "${RED}Expected: Error - Password must be at least 6 characters${NC}"
echo ""
echo "---"
echo ""

# Test 3: Create Merchant with Missing Password
echo -e "${BLUE}Test 3: Create Merchant with Missing Password${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Password: (empty/missing)"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Merchant",
    "email": "merchant3@example.com",
    "phoneNumber": "(123) 456-7892",
    "brandName": "BookBrand",
    "business": "Online book store and publishing"
  }' | jq '.'
echo ""
echo -e "${RED}Expected: Error - You must set a password for the merchant${NC}"
echo ""
echo "---"
echo ""

# Test 4: Create Merchant with Strong Password
echo -e "${BLUE}Test 4: Create Merchant with Strong Password${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Password: Str0ng!Pass@2024 (strong password with symbols)"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Merchant",
    "email": "merchant4@example.com",
    "password": "Str0ng!Pass@2024",
    "phoneNumber": "(123) 456-7893",
    "brandName": "TechSupplies",
    "business": "Computer hardware and accessories supplier"
  }' | jq '.'
echo ""
echo -e "${GREEN}Expected: Success message with merchant details${NC}"
echo ""
echo "---"
echo ""

# Test 5: Merchant Login with Correct Password
echo -e "${BLUE}Test 5: Merchant Login with Correct Password${NC}"
echo "Endpoint: POST /api/auth/merchant/login"
echo "Email: merchant1@example.com"
echo "Password: SecurePass123"
echo ""
curl -X POST "$API_URL/auth/merchant/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "merchant1@example.com",
    "password": "SecurePass123"
  }' | jq '.'
echo ""
echo -e "${GREEN}Expected: Success with JWT token and merchant details${NC}"
echo ""
echo "---"
echo ""

# Test 6: Merchant Login with Wrong Password
echo -e "${BLUE}Test 6: Merchant Login with Wrong Password${NC}"
echo "Endpoint: POST /api/auth/merchant/login"
echo "Email: merchant1@example.com"
echo "Password: WrongPassword123"
echo ""
curl -X POST "$API_URL/auth/merchant/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "merchant1@example.com",
    "password": "WrongPassword123"
  }' | jq '.'
echo ""
echo -e "${RED}Expected: Error - Password Incorrect${NC}"
echo ""
echo "---"
echo ""

# Test 7: Create Merchant with Duplicate Email
echo -e "${BLUE}Test 7: Create Merchant with Duplicate Email${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Email: merchant1@example.com (already exists)"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Duplicate Merchant",
    "email": "merchant1@example.com",
    "password": "DuplicatePass123",
    "phoneNumber": "(123) 456-7894",
    "brandName": "DuplicateBrand",
    "business": "This should fail because email exists"
  }' | jq '.'
echo ""
echo -e "${RED}Expected: Error - That email address is already in use${NC}"
echo ""
echo "---"
echo ""

# Test 8: Create Merchant without Admin Token
echo -e "${BLUE}Test 8: Create Merchant without Admin Authentication${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Headers: No Authorization token"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Unauthorized Merchant",
    "email": "merchant5@example.com",
    "password": "UnauthorizedPass123",
    "phoneNumber": "(123) 456-7895",
    "brandName": "UnauthorizedBrand",
    "business": "This should fail without admin token"
  }' | jq '.'
echo ""
echo -e "${RED}Expected: Error 401/403 - Unauthorized or Forbidden${NC}"
echo ""
echo "---"
echo ""

# Test 9: Create Merchant with Minimum Length Password
echo -e "${BLUE}Test 9: Create Merchant with Exactly 6 Character Password${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Password: Pass12 (exactly 6 characters - minimum allowed)"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Min Password Merchant",
    "email": "merchant6@example.com",
    "password": "Pass12",
    "phoneNumber": "(123) 456-7896",
    "brandName": "MinPassBrand",
    "business": "Testing minimum password length requirement"
  }' | jq '.'
echo ""
echo -e "${GREEN}Expected: Success message with merchant details${NC}"
echo ""
echo "---"
echo ""

# Test 10: Create Merchant with Very Long Password
echo -e "${BLUE}Test 10: Create Merchant with Very Long Password${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Password: SuperVeryLongAndComplexPassword123WithSymbols!@#$%"
echo ""
curl -X POST "$API_URL/merchant/add" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Long Password Merchant",
    "email": "merchant7@example.com",
    "password": "SuperVeryLongAndComplexPassword123WithSymbols!@#$%",
    "phoneNumber": "(123) 456-7897",
    "brandName": "LongPassBrand",
    "business": "Testing with very long and complex password"
  }' | jq '.'
echo ""
echo -e "${GREEN}Expected: Success message with merchant details${NC}"
echo ""

echo -e "${YELLOW}=== Test Suite Complete ===${NC}"
echo ""
echo "Summary of Test Results:"
echo "✓ Test 1: Valid password - Should succeed"
echo "✓ Test 2: Short password - Should fail"
echo "✓ Test 3: Missing password - Should fail"
echo "✓ Test 4: Strong password - Should succeed"
echo "✓ Test 5: Login with correct password - Should succeed"
echo "✓ Test 6: Login with wrong password - Should fail"
echo "✓ Test 7: Duplicate email - Should fail"
echo "✓ Test 8: No authorization - Should fail"
echo "✓ Test 9: Minimum length password (6 chars) - Should succeed"
echo "✓ Test 10: Long password - Should succeed"
echo ""
echo "Password Requirements Summary:"
echo "- Minimum length: 6 characters"
echo "- Maximum length: No limit"
echo "- Allowed characters: Any (letters, numbers, symbols)"
echo "- Required: Yes (must be provided)"
echo "- Hashing: bcrypt (10 salt rounds)"
echo ""
echo "Notes:"
echo "1. Replace YOUR_ADMIN_JWT_TOKEN with actual admin token"
echo "2. Ensure backend is running on localhost:3000"
echo "3. Check server logs for detailed error information"
echo "4. Use HTTPS in production to protect passwords in transit"
echo "5. All passwords are hashed before storage - never stored in plain text"

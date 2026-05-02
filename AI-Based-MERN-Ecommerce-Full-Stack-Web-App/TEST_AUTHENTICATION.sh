#!/bin/bash

# Authentication Refactor Test Script
# This script tests the new authentication endpoints

API_URL="http://localhost:3000/api"

echo "=== MERN E-Commerce Authentication Refactor Test Suite ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: User Registration
echo -e "${YELLOW}Test 1: User Registration${NC}"
echo "Endpoint: POST /api/auth/register"
curl -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "SecurePass123",
    "isSubscribed": false
  }' | jq '.'
echo ""

# Test 2: Invalid Email Format in Registration
echo -e "${YELLOW}Test 2: Invalid Email Format in Registration${NC}"
curl -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalidemail",
    "firstName": "Test",
    "lastName": "User",
    "password": "SecurePass123"
  }' | jq '.'
echo ""

# Test 3: Weak Password in Registration
echo -e "${YELLOW}Test 3: Weak Password (less than 6 chars)${NC}"
curl -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test2@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "123"
  }' | jq '.'
echo ""

# Test 4: User Login
echo -e "${YELLOW}Test 4: User Login${NC}"
echo "Endpoint: POST /api/auth/login"
curl -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "SecurePass123"
  }' | jq '.'
echo ""

# Test 5: Invalid Credentials
echo -e "${YELLOW}Test 5: Login with Invalid Password${NC}"
curl -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "WrongPassword"
  }' | jq '.'
echo ""

# Test 6: Create Merchant (Admin Only)
echo -e "${YELLOW}Test 6: Create Merchant Account (Admin only)${NC}"
echo "Endpoint: POST /api/merchant/add"
echo "Note: Replace TOKEN_HERE with actual admin JWT token"
curl -X POST "$API_URL/merchant/add" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{
    "name": "John Merchant",
    "email": "merchant@example.com",
    "password": "MerchantPass123",
    "phoneNumber": "1234567890",
    "business": "Electronics Store",
    "brandName": "TechBrand"
  }' | jq '.'
echo ""

# Test 7: Merchant Login
echo -e "${YELLOW}Test 7: Merchant Login${NC}"
echo "Endpoint: POST /api/auth/merchant/login"
curl -X POST "$API_URL/auth/merchant/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "merchant@example.com",
    "password": "MerchantPass123"
  }' | jq '.'
echo ""

echo -e "${GREEN}=== Test Suite Complete ===${NC}"
echo ""
echo "Expected Results:"
echo "✓ Registration should succeed with valid email/password"
echo "✓ Registration should fail with invalid email format"
echo "✓ Registration should fail with weak password (<6 chars)"
echo "✓ Login should succeed with valid credentials"
echo "✓ Login should fail with wrong password"
echo "✓ Create merchant should require admin token"
echo "✓ Merchant login should work after creation"

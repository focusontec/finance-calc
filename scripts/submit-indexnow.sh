#!/bin/bash
# IndexNow 提交脚本
# 用法: ./scripts/submit-indexnow.sh

HOST="financecalculatoronline.pro"
KEY="9f9f940e5f6913d3786c3f4645f1e26f"
KEY_LOCATION="https://financecalculatoronline.pro/${KEY}.txt"

URLS=(
  "https://financecalculatoronline.pro/"
  "https://financecalculatoronline.pro/calculators/amortization"
  "https://financecalculatoronline.pro/calculators/auto-loan"
  "https://financecalculatoronline.pro/calculators/cd"
  "https://financecalculatoronline.pro/calculators/compound-interest"
  "https://financecalculatoronline.pro/calculators/credit-card-payoff"
  "https://financecalculatoronline.pro/calculators/currency-converter"
  "https://financecalculatoronline.pro/calculators/debt-payoff"
  "https://financecalculatoronline.pro/calculators/hourly-to-salary"
  "https://financecalculatoronline.pro/calculators/house-affordability"
  "https://financecalculatoronline.pro/calculators/inflation"
  "https://financecalculatoronline.pro/calculators/investment"
  "https://financecalculatoronline.pro/calculators/loan"
  "https://financecalculatoronline.pro/calculators/mortgage"
  "https://financecalculatoronline.pro/calculators/mortgage-payoff"
  "https://financecalculatoronline.pro/calculators/net-worth"
  "https://financecalculatoronline.pro/calculators/overtime"
  "https://financecalculatoronline.pro/calculators/pay-raise"
  "https://financecalculatoronline.pro/calculators/refinance"
  "https://financecalculatoronline.pro/calculators/rent-vs-buy"
  "https://financecalculatoronline.pro/calculators/retirement"
  "https://financecalculatoronline.pro/calculators/roi"
  "https://financecalculatoronline.pro/calculators/salary"
  "https://financecalculatoronline.pro/calculators/savings"
)

# 构建 JSON 数组
URL_LIST=""
for url in "${URLS[@]}"; do
  if [ -n "$URL_LIST" ]; then
    URL_LIST="$URL_LIST,"
  fi
  URL_LIST="$URL_LIST\"$url\""
done

echo "提交 ${#URLS[@]} 个 URL 到 IndexNow..."

# 提交到 Bing 的 IndexNow 端点
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"$HOST\",
    \"key\": \"$KEY\",
    \"keyLocation\": \"$KEY_LOCATION\",
    \"urlList\": [$URL_LIST]
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "成功！HTTP $HTTP_CODE"
  echo "所有 URL 已提交到 Bing、Yandex、Seznam、Naver"
else
  echo "失败：HTTP $HTTP_CODE"
  echo "$BODY"
fi

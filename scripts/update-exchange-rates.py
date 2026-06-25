#!/usr/bin/env python3
"""
每日更新汇率脚本
使用免费 API 获取最新汇率，更新 public/exchange-rates.json
"""
import json
import urllib.request
import os
from datetime import datetime

# 免费汇率 API（无需注册）
API_URL = "https://open.er-api.com/v6/latest/USD"

# 目标货币
CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "MXN", "BRL", "KRW"]

def fetch_rates():
    """从 API 获取最新汇率"""
    try:
        req = urllib.request.Request(API_URL, headers={'User-Agent': 'FinanceCalc/1.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            
        if data.get("result") == "success":
            rates = data.get("rates", {})
            # 只保留需要的货币
            filtered = {c: rates[c] for c in CURRENCIES if c in rates}
            return filtered
        else:
            print(f"API error: {data}")
            return None
    except Exception as e:
        print(f"Failed to fetch rates: {e}")
        return None

def main():
    print(f"[{datetime.now().isoformat()}] Updating exchange rates...")
    
    rates = fetch_rates()
    
    if not rates:
        print("Failed to fetch rates, exiting.")
        exit(1)
    
    # 读取现有数据（如果存在）
    output_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'exchange-rates.json')
    
    existing = {}
    if os.path.exists(output_path):
        with open(output_path, 'r') as f:
            existing = json.load(f)
    
    # 检查是否有变化
    old_rates = existing.get("rates", {})
    if old_rates == rates:
        print("Rates unchanged, skipping update.")
        return
    
    # 写入新数据
    output = {
        "base": "USD",
        "updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC"),
        "rates": rates
    }
    
    with open(output_path, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"Updated {len(rates)} currencies:")
    for currency, rate in sorted(rates.items()):
        old = old_rates.get(currency, "N/A")
        print(f"  {currency}: {old} -> {rate}")

if __name__ == "__main__":
    main()

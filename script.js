<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💰 存錢適合度計算器</title>
    <style>
        :root {
            --bg-color: #f7f3ed;          /* 燕麥奶底色 */
            --card-bg: #ffffff;            /* 卡片純白底 */
            --primary-color: #8c6747;      /* 濃郁奶茶棕/焦糖色 */
            --primary-hover: #735235;      /* 深焦糖色 */
            --text-main: #4a3b32;          /* 深深褐色文字 */
            --text-sub: #7a6b63;           /* 淺褐色文字 */
            --input-bg: #fcfaf7;           /* 輸入框奶白底 */
            --border-color: #e6ded6;       /* 柔和邊線色 */
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }

        .container {
            background-color: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(140, 103, 71, 0.08);
            padding: 32px 28px;
            width: 100%;
            max-width: 420px;
            border: 1px solid var(--border-color);
        }

        h2 {
            margin-top: 0;
            margin-bottom: 24px;
            text-align: center;
            color: var(--text-main);
            font-size: 1.4rem;
            letter-spacing: 0.5px;
        }

        .input-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--text-main);
        }

        input[type="number"] {
            width: 100%;
            padding: 12px 14px;
            background-color: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 1rem;
            color: var(--text-main);
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        input[type="number"]::placeholder {
            color: #b5aba4;
        }

        input[type="number"]:focus {
            outline: none;
            border-color: var(--primary-color);
            background-color: #ffffff;
            box-shadow: 0 0 0 3px rgba(140, 103, 71, 0.12);
        }

        button {
            width: 100%;
            padding: 13px;
            margin-top: 8px;
            background-color: var(--primary-color);
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.1s ease;
            letter-spacing: 0.5px;
        }

        button:hover {
            background-color: var(--primary-hover);
        }

        button:active {
            transform: scale(0.99);
        }

        .result-box {
            margin-top: 24px;
            padding: 20px;
            border-radius: 10px;
            background-color: #faf7f2;
            border-left: 4px solid var(--primary-color);
            display: none;
        }

        .result-rate {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 6px;
        }

        .result-level {
            font-size: 1.05rem;
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 8px;
        }

        .result-desc {
            font-size: 0.9rem;
            line-height: 1.6;
            color: var(--text-sub);
        }
    </style>
</head>
<body>

<div class="container">
    <h2>💰 存錢適合度計算器</h2>
    
    <div class="input-group">
        <label for="income">每月收入 ($)</label>
        <input type="number" id="income" placeholder="請輸入每月總收入" min="0">
    </div>

    <div class="input-group">
        <label for="expenses">必要支出 ($)</label>
        <input type="number" id="expenses" placeholder="房租、伙食、水電等必要開銷" min="0">
    </div>

    <button onclick="calculateSavings()">開始計算</button>

    <div id="resultBox" class="result-box">
        <div id="resultRate" class="result-rate"></div>
        <div id="resultLevel" class="result-level"></div>
        <div id="resultDesc" class="result-desc"></div>
    </div>
</div>

<script>
function calculateSavings() {
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const resultBox = document.getElementById('resultBox');
    const resultRate = document.getElementById('resultRate');
    const resultLevel = document.getElementById('resultLevel');
    const resultDesc = document.getElementById('resultDesc');

    if (isNaN(income) || isNaN(expenses) || income <= 0) {
        alert('請輸入有效的每月收入與必要支出（收入需大於 0）');
        return;
    }

    const rate = ((income - expenses) / income) * 100;
    const formattedRate = rate.toFixed(1);

    let level = '';
    let desc = '';
    let borderColor = '#8c6747';

    if (rate < 0) {
        level = '0% 以下｜先別逼自己存';
        desc = '收入連基本支出都不太夠，現在更重要的是調整支出或增加收入。';
        borderColor = '#c06c52'; // 暖紅棕
    } else if (rate >= 0 && rate < 10) {
        level = '0～10%｜存錢困難期';
        desc = '可以存，但不要訂太高目標，先從 $500、$1,000 建立習慣。';
        borderColor = '#d49b59'; // 焦糖橘
    } else if (rate >= 10 && rate < 20) {
        level = '10～20%｜適合開始存錢';
        desc = '有一定空間，可以固定「先存再花」。';
        borderColor = '#b89c62'; // 燕麥金
    } else if (rate >= 20 && rate < 30) {
        level = '20～30%｜存錢體質不錯';
        desc = '很適合開始做目標存款、備用金。';
        borderColor = '#7d9d78'; // 抹茶綠
    } else {
        level = '30% 以上｜高存錢潛力';
        desc = '如果還是月光，問題可能不是「沒錢存」，而是錢沒有先分配。';
        borderColor = '#5f8d8b'; // 莫蘭迪綠
    }

    resultRate.innerText = `可存錢比例：${formattedRate}%`;
    resultLevel.innerText = level;
    resultDesc.innerText = desc;
    
    resultBox.style.borderColor = borderColor;
    resultBox.style.display = 'block';
}
</script>

</body>
</html>
      

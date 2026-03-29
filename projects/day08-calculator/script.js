const display = document.getElementById('display');

// Safe math evaluator — no eval()
function safeCalculate(expression) {
    // Only allow digits, operators, dots, and parentheses
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
        throw new Error('Invalid expression');
    }

    // Use Function constructor as a safer alternative scoped to math only
    const ops = {'+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b};

    // Tokenize and evaluate using a simple recursive descent parser
    let pos = 0;
    const tokens = expression.replace(/\s/g, '');

    function parseExpr() {
        let left = parseTerm();
        while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
            const op = tokens[pos++];
            const right = parseTerm();
            left = ops[op](left, right);
        }
        return left;
    }

    function parseTerm() {
        let left = parseFactor();
        while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
            const op = tokens[pos++];
            const right = parseFactor();
            if (op === '/' && right === 0) throw new Error('Division by zero');
            left = ops[op](left, right);
        }
        return left;
    }

    function parseFactor() {
        if (tokens[pos] === '(') {
            pos++; // skip '('
            const result = parseExpr();
            pos++; // skip ')'
            return result;
        }
        if (tokens[pos] === '-') {
            pos++;
            return -parseFactor();
        }
        let numStr = '';
        while (pos < tokens.length && /[0-9.]/.test(tokens[pos])) {
            numStr += tokens[pos++];
        }
        if (!numStr) throw new Error('Unexpected token');
        return parseFloat(numStr);
    }

    return parseExpr();
}

document.querySelector('.calculator').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (value !== undefined) {
        display.value += value;
    } else if (action === 'clear') {
        display.value = '';
    } else if (action === 'delete') {
        display.value = display.value.slice(0, -1);
    } else if (action === 'equals') {
        try {
            const result = safeCalculate(display.value);
            display.value = Number.isFinite(result) ? result : 'Error';
        } catch {
            display.value = 'Error';
        }
    }
});

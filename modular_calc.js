function powerMod(a, b, m) {
    let bigA = BigInt(a);
    let bigB = BigInt(b);
    const bigM = BigInt(m);
    let ans = BigInt(1);

    bigA = bigA % bigM;
    while (bigB > 0) {
        if (bigB % BigInt(2) === BigInt(1)) {
            ans = (ans * bigA) % bigM;
        }
        bigB = bigB / BigInt(2);
        bigA = (bigA * bigA) % bigM;
    }
    return Number(ans);
}

function addMod(a, b, m) {
    const bigA = BigInt(a);
    const bigB = BigInt(b);
    const bigM = BigInt(m);
    let rel = (bigA % bigM + bigB % bigM) % bigM;
    return Number(rel);
}

function subMod(a, b, m) {
    const bigA = BigInt(a);
    const bigB = BigInt(b);
    const bigM = BigInt(m);
    return Number(((bigA % bigM - bigB % bigM) + bigM) % bigM);
}

function mulMod(a, b, m) {
    const bigA = BigInt(a);
    const bigB = BigInt(b);
    const bigM = BigInt(m);
    return Number((bigA % bigM * bigB % bigM) % bigM);
}
function gcd(a, b) {
    const bigA = BigInt(a);
    const bigB = BigInt(b);

    function gcdHelper(x, y) {
        if (y === BigInt(0)) return x;
        return gcdHelper(y, x % y);
    }

    return Number(gcdHelper(bigA > bigB ? bigA : bigB, bigA > bigB ? bigB : bigA));
}

function isPrime(n) {
    const bigN = BigInt(n);
    if (bigN < 2) return false;
    if (bigN === BigInt(2)) return true;
    if (bigN % BigInt(2) === BigInt(0)) return false;

    for (let i = BigInt(3); i * i <= bigN; i += BigInt(2)) {
        if (bigN % i === BigInt(0)) return false;
    }
    return true;
}

function divMod(a, b, m) {
    if (!isPrime(m)) {
        throw new Error("m must be prime for Fermat's Little Theorem to apply");
    }

    if (gcd(b, m) !== 1) {
        throw new Error("b and m must be coprime (gcd(b, m) = 1) for modular division");
    }

    const bigA = BigInt(a);
    const bigB = BigInt(b);
    const bigM = BigInt(m);

    const bInverse = BigInt(powerMod(Number(bigB), Number(bigM - BigInt(2)), Number(bigM)));
    return Number((bigA * bInverse) % bigM);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (!form) return;

    const clearButtons = document.querySelectorAll('.clear-btn');
    clearButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).value = '';
        });
    });

    const clearAllButton = document.getElementById('clear-all');
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function () {
            document.getElementById('a').value = '';
            document.getElementById('b').value = '';
            document.getElementById('m').value = '';
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const a = BigInt(document.getElementById('a').value);
        const b = BigInt(document.getElementById('b').value);
        const m = BigInt(document.getElementById('m').value);
        const currentPage = window.location.pathname.split('/').pop();
        let result;

        try {
            switch (currentPage) {
                case 'ab_mod_m.html':
                    result = powerMod(a, b, m);
                    displayResult(result);
                    break;
                case 'add_mod_m.html':
                    result = addMod(a, b, m);
                    displayResult(result);
                    break;
                case 'sub_mod_m.html':
                    result = subMod(a, b, m);
                    displayResult(result);
                    break;
                case 'mul_mod_m.html':
                    result = mulMod(a, b, m);
                    displayResult(result);
                    break;
                case 'div_mod_m_fermat.html':
                    result = divMod(a, b, m);
                    displayResult(result);
                    break;
                default:
                    console.log('Unknown page');
                    return;
            }

        } catch (error) {
            displayError(error.message);
        }
    });
});

function displayResult(result) {
    const resultBox = document.getElementById('result-box');
    const resultValue = document.getElementById('result-value');

    resultValue.textContent = result;
    resultBox.style.display = 'block';
}

function displayError(message) {
    const resultBox = document.getElementById('result-box');
    const resultValue = document.getElementById('result-value');
    const resultTitle = document.querySelector('.result-title');

    resultTitle.textContent = 'Error';
    resultValue.textContent = message;
    resultValue.style.color = '#dc3545';
    resultBox.style.display = 'block';
}

function closeResult() {
    const resultBox = document.getElementById('result-box');
    const resultTitle = document.querySelector('.result-title');
    const resultValue = document.getElementById('result-value');

    resultBox.style.display = 'none';
    resultTitle.textContent = 'Output';
    resultValue.style.color = '#0066cc';
}

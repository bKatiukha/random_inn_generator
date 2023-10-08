const zeros = (num, places) => String(num).padStart(places, '0')

let copyIconTimeout;

function generateUkrainianINN() {
    const randomBirthYear = zeros(String(Math.floor((Math.random() * 16601)) + 20000), 5); /* 20000..36600 */
    const randomSequence = zeros(String(Math.floor((Math.random() * 9000))), 4);
    const result = randomBirthYear + randomSequence;
    const controlDigit = String(((
        (-1) * result[0] + 5 * result[1] + 7 * result[2] +
        9 * result[3] + 4 * result[4] + 6 * result[5] +
        10 * result[6] + 5 * result[7] + 7 * result[8]
    ) % 11) % 10);
    return result + controlDigit;
}

function setNewINN() {
    getINNElement().innerText = generateUkrainianINN();
    switchCopyIcon(true)
}

function getINNElement() {
    return document.getElementById('inn');
}

function switchCopyIcon(activateCopy) {
    document.getElementById('copy-icon').style.display = activateCopy ? 'block' : 'none';
    document.getElementById('copied-icon').style.display = activateCopy ? 'none' : 'block';
}

function copyToClipboard() {
    navigator.clipboard.writeText(getINNElement().innerText).then(() => {
        switchCopyIcon(false)

        copyIconTimeout && clearTimeout(copyIconTimeout);
        copyIconTimeout = setTimeout(() => {
            switchCopyIcon(true)
        }, 5000);
    }, (err) => {
        console.error('Async: Could not copy text: ', err);
    });
}

window.onload = () => {
    getINNElement().innerText = generateUkrainianINN();
    switchCopyIcon(true)

    document.getElementById('copy-icon').addEventListener('click', () => {
        copyToClipboard();
    });
    document.getElementById('setNewINN').addEventListener('click', () => {
        setNewINN();
    });

}

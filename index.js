const dark = document.getElementById("dark");
const light = document.getElementById("light");
const sizes = document.getElementById("sizes");
const qrText = document.getElementById("qr-text");

const qrContainer = document.getElementById("qr-code");

const download = document.getElementById("download");
const shareBtn = document.getElementById("share");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
sizes.addEventListener("change", handleSize);
qrText.addEventListener("input", handleQRText);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://www.linkedin.com/in/mevra-dilan-erten/";
let colorLight = "#ffffff",
    colorDark = "#000000",
    text = defaultUrl,
    size = 400;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}

async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}



function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();
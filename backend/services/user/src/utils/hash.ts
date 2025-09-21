import { randomInt } from 'crypto';

function generateVerificationCode(): string {
    return randomInt(100000, 999999).toString();
}

function generateTimeBasedImageName() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${timestamp}_${randomNumber}`;
}

export {generateTimeBasedImageName, generateVerificationCode}

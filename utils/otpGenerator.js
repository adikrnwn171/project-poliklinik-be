const generator = require("otp-generator");

const otpGenerator = () => {
    const OTP = generator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });

    return OTP
}

module.exports = otpGenerator;
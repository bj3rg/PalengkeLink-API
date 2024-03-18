module.exports = {
    createVerificationEmailTemplate: (verificationCode) => `
        <html>
          <head>
            <style>
              /* Your existing styles for Verification Code email */
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Verification Code Request</h2>
              <p>You have requested to get a verification code. Use the following verification code:</p>
              <p style="font-size: 1.5em; font-weight: bold;">${verificationCode}</p>
              <p>If you did not make this request, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
  };
  
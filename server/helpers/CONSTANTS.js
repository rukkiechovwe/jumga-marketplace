require("dotenv").config();
const FLW_URL = "https://api.flutterwave.com/v3";
const SERVICE_ACCOUNT = {
  projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  privateKey: `-----BEGIN PRIVATE KEY-----\n${process.env.SERVICE_ACCOUNT_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
  clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_MAIL,
  //   type: process.env.SERVICE_ACCOUNT_TYPE,
  //   private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEYID,
  //   client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
  //   auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URL,
  //   token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URL,
  //   auth_provider_x509_cert_url:
  //   process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_CERT_URL,
  //   client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_CERT_URL,
};
module.exports = { FLW_URL, SERVICE_ACCOUNT };

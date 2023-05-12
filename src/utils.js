const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

APP_SECRET = "Graphql";

function getTokenPayload(parent, args, context) {
  return jwt.verify(token, APP_SECRET);
}

// ゆーざーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーを確認する。つまり、認証権限があるか確認
    const authHeader = req.header.authorization;
    // 権限があれば
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンがないよ");
      }
      // そのトークンを複合する
      const { userId } = getRTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
}

module.exports = {
  APP_SECRET,
  getUserId,
};

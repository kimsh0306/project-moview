const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true
  }
);

// mongoose.model(모델명, 스키마명) ==> 스키마를 모델로 변환하는 함수
// 모델명은 대문자로 시작하고 단수형으로 작성 ==> db에 users 컬랙션이 만들어 짐
const Users = mongoose.model("User", UserSchema);
module.exports = Users;
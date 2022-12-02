const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    // accessToken: string
    refreshToken: {type: String, requires: true}
    // exporesIn: number
  },
  {
    timestamps: true
  }
)

module.exports = model('Token', schema)

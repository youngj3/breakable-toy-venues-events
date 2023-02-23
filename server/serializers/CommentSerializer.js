import Serializer from "./Serializer.js";

class CommentSerializer extends Serializer {
  static async getDetail(comment){
    const serializedComment = this.serialize(comment, ["id", "userId", "eventId", "text", "createdAt"])
    const user = await comment.$relatedQuery("user")
    serializedComment.userName = user.userName
    serializedComment.image = user.image
    return serializedComment
  }
}

export default CommentSerializer
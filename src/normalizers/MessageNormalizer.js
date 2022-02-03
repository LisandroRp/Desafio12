import normalizr from "normalizr"
import util from "util"
const { normalize, denormalize, schema } = normalizr

 const authorSchema = new schema.Entity('author')
 const messageSchema = new schema.Entity('message', { 
     author: authorSchema
 },{idAttribute: "id"})
 
 let normalice = (messages) => {
    let normalizedMessages = normalize(messages, [messageSchema])
    return normalizedMessages
 }

 let denormalice = (messages) => {
    let deNormalizedMessages = denormalize(messages, [messageSchema])
    return deNormalizedMessages
/*     return util.inspect(deNormalizedMessages, false, 12, true)  */
 }

 export {normalice, denormalice}

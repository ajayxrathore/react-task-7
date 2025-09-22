import {collection, getDocs} from "firebase/firestore"
import {db} from "../Firebase/firestore"

async function emailUid (){
    const snapshot = await getDocs(collection(db,'users'))
    const map ={}
    snapshot.forEach(doc=>{
        const data = doc.data()
        map[data.uid]=data.email
    })
    return map
}
export default emailUid

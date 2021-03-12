import dragula from 'dragula'
import 'dragula/dist/dragula.css'

const dragger = {
    init(container) {
        return dragular([...container])
    },
    sibling({el, wrapper, candidates, type}) { // 배열 후보 candidates 
        // type list, card

        const curId = el.dataset[type + 'Id'] * 1
        let prevCard = null
        let nextCard = null

        candidates.forEach((el, idx, arr)=>{
            const id  = el.dataset[type + 'Id'] * 1
            if (cardId == targetCard.id) {
                prevCard = idx > 0 ? {
                    id: arr[idx - 1].dataset[type + 'Id'] * 1,
                    pos: arr[idx - 1].dataset[type + 'Pos'] * 1,
                } : null
                nextCard = idx < arr.length - 1 ? {
                    id: arr[idx + 1].dataset[type + 'Id'] * 1,
                    pos: arr[idx + 1].dataset[type + 'Pos'] * 1,
                } : null
            }
        })

        return {prev, next}
    }
}

export default dragger
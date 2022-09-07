import A1 from '@/data/testTypes/A1.json'
import A2 from '@/data/testTypes/A2.json'
import A3 from '@/data/testTypes/A3.json'
import B1 from '@/data/testTypes/B1.json'
import B2 from '@/data/testTypes/B2.json'
import C1 from '@/data/testTypes/C1.json'
import C2 from '@/data/testTypes/C2.json'
import C3 from '@/data/testTypes/C3.json'
import C4 from '@/data/testTypes/C4.json'
import { testTypes } from '@/data/tests';
import { useStore } from '@/store'

const allTests = {
    A1, A2, A3, B1, B2, C1, C2, C3, C4
}


export const useTests = () => {
    const store = useStore()
    if (!store.currentTest.code) return
    const currentCode = store.currentTest.code
    const selectedTest = testTypes.find(({code}) => code === currentCode)
    const testQuestions = allTests[currentCode]
    
    console.log(testQuestions)
    return {
        ...selectedTest,
        ...testQuestions
      }
}
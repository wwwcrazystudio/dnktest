export interface Age {
    type: string
    ageValue: string
    img: string
    icon: string
}
  
export interface Sex {
    label: string
    sexValue: string
    img: string
}
  
export interface TestType {
    age: string
    title: string
    code: string
    image: string
  }

  export interface TestAnswer {
    id: string | number,
    title: string,
    value?: number,
    yesId?: number,
    noId?: number
  }
  
  /* export interface IGroup {
    id: string | number,
    title: string,
    items?: string[]
    text?: string,
    'sub-title'?: string,
    score?: number,
    answers?: number[] | {questionId: number, id: number}
  }
   */
  export interface TestQuestion {
    id?: string | number,
    title: string,
    group?: string | number,
    answers?: TestAnswer[],
 /*    type?: QuestionType, */
    image?: string,
    male?: TestAnswer[],
    female?: TestAnswer[]
  }
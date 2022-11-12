import * as C from 'fp-ts/Console'
import { pipe } from 'fp-ts/function'
import { Person } from './types'

import * as $vs from './validations'

const main = () => {
    const run = pipe(
        'H9ello therre',
        $vs.validatePassword,
        C.log
    )

    const runV = pipe(
        'D9fdfdfdfdff',
        $vs.validatePasswordV,
        C.log
    )

    const person: Person = {
        name: '',
        age: '29a',
    }

    const runP = pipe(
        person,
        $vs.validatePerson,
        C.log
    )

    console.log("EITHER VALIDATION:")
    run()

    console.log("APPLICATIVE VALIDATION:")
    runV()

    console.log("APPLICATIVE PERSON VALIDATION:")
    runP()
}

main()

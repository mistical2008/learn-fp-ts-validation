import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import * as NEA from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/function'

import * as checkers from './checkers'
import { Person } from './types'
import { toPerson } from './lib'
/**
 * validate only first error
 */
export const validatePassword = (s: string): E.Either<string, string> =>
    pipe(
        checkers.minLength(s),
        E.chain(checkers.oneCapital),
        E.chain(checkers.oneNumber)
    )

const applicativeValidation = E.getApplicativeValidation(NEA.getSemigroup<string>())

export const validatePasswordV = (s: string): E.Either<NEA.NonEmptyArray<string>, string> =>
    pipe(
        A.sequenceT(applicativeValidation)(
            checkers.minLengthV(s),
            checkers.oneCapitalV(s),
            checkers.oneNumberV(s)
        ),
        E.map(() => s)
    )

export const validatePerson = (person: Person): E.Either<NEA.NonEmptyArray<string>, Person> =>
    pipe(
        A.sequenceT(applicativeValidation)(
            checkers.validateName(person.name),
            checkers.validateAge(person.age),
        ),
        E.map(toPerson)
    )

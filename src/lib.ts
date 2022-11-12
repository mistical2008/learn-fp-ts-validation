import * as E from 'fp-ts/Either'
import * as NEA from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/function'
import * as types from './types'

export const lift = <E, A>(check: (a: A) => E.Either<E, A>): (a: A) => E.Either<NEA.NonEmptyArray<E>, A> => {
    return a =>
        pipe(
            check(a),
            E.mapLeft(a => [a])
        )
}

export const toPerson = ([name, age]: [string, number]): types.Person => ({
    name,
    age
})

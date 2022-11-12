import * as E from 'fp-ts/Either'
import * as NEA from 'fp-ts/NonEmptyArray'
import * as lib from './lib'

export const minLength = (s: string): E.Either<string, string> =>
    s.length >= 6 ? E.right(s) : E.left('at least 6 characters')

export const oneCapital = (s: string): E.Either<string, string> =>
    /[A-Z]/g.test(s) ? E.right(s) : E.left('at least capital letter')

export const oneNumber = (s: string): E.Either<string, string> =>
    /[0-9]/g.test(s) ? E.right(s) : E.left('at least number')

/**
 * lifted validations to Either<NonEmptyArray>
 */
export const minLengthV = lib.lift(minLength)
export const oneCapitalV = lib.lift(oneCapital)
export const oneNumberV = lib.lift(oneNumber)

export const validateName = (s: string): E.Either<NEA.NonEmptyArray<string>, string> =>
    s.length === 0 ? E.left([`Invalid person name: "${s}"`]) : E.right(s)

export const validateAge = (s: string | number): E.Either<NEA.NonEmptyArray<string>, number> =>
    isNaN(+s) ? E.left([`Invalid age: "${s}"`]) : E.right(+s)

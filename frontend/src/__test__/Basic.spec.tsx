import { authenticateUser, product } from "@/testing_2/Basic"

describe('Basic Testing',() => {
    it('returns the product of 3 and 2',() => {
        const actual = product(3,2);
        expect(actual).toBe(6)
    })
    it('User authentication',() => {
        const sut = authenticateUser
        const actual = sut('deveLOPER','dev');
        expect(actual.usernameToLower).toBe('developer')
        expect(actual.usernameCharacters).toEqual(['d','e','v','e','L','O','P','E','R'])
        expect(actual.usernameCharacters).toContain('L')
    })
})



// import {Trial} from '@/testing_2/Basic';  // Use 'import' instead of 'require' for TypeScript

// describe('Trial Class', () => {
//   let trial: Trial; // Explicitly define the type

//   beforeEach(() => {
//     trial = new Trial();
//   });

//   test('add method should return the correct sum', () => {
//     expect(trial.add(2, 3)).toBe(5);
//     expect(trial.add(-1, 1)).toBe(0);
//     expect(trial.add(0, 0)).toBe(0);
//   });

//   test('isEven method should correctly determine even numbers', () => {
//     expect(trial.isEven(2)).toBeTruthy();
//     expect(trial.isEven(3)).toBeFalsy();
//     expect(trial.isEven(0)).toBe(true);
//     expect(trial.isEven(-4)).toEqual(true);
//   });
// });

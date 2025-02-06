export function product(a:number, b:number): number{
    return a*b;
}



export interface IAuthData{
    usernameToLower: string;
    usernameCharacters: string[];
    userDetails: Object|undefined;
    isAuthenticatex: boolean;
}

export function authenticateUser(username: string, password: string): IAuthData{
    const authStatus= username =='deveLOPER' && password == 'dev';
    return {
        usernameToLower: username.toLowerCase(),
        usernameCharacters: username.split(''),
        userDetails: authStatus? {username: username, password: password}: undefined,
        isAuthenticatex: authStatus
    }
}

// Trial class with two methods
export class Trial {
    add(a: number, b: number) {
      return a + b;
    }
  
    isEven(num:number) {
      return num % 2 === 0;
    }
  }
  

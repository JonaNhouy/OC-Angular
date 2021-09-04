// méth reactive
export class User {
    // raccourci TS : 'public' qui va se charger d'initialiser
    constructor(public firstName: string, 
                public lastName: string, 
                public email: string, 
                public drinkPreference: string, 
                public hobbies?: string[]) {

    }
}
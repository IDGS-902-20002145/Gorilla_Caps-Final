export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    active: boolean;
    confirmed_at: Date;
    admin : boolean;
    empleado : boolean;
    roles : any[];
    token? : string; 
}

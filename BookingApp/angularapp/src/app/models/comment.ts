export class Comment {

    id: number;
    grade: number;
    text: string;

    /*[Required]*/
    user: number;
    /*[Required]*/
    accommodation: number;
    
    constructor(id:number, grade:number, text:string, user:number, acc:number) {
        this.id = id;
        this.grade = grade;
        this.text = text;
        this.user = user;
        this.accommodation = acc;
    }
}
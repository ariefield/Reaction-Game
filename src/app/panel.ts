export class Panel
{
    id: number;
    left: number;
    top: number;
    prevColour: string;
    colour: string;
    content: string;

    constructor()
    {
        this.id = -1;
        this.left = 0;
        this.top = 0;
        this.colour = "Grey";
        this.prevColour = "Grey";
        this.content = "Content";
    }

}
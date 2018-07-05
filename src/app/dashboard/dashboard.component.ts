import { Component, OnInit } from '@angular/core';
import { Panel } from '../panel'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //Constants
  DASHBOARD_WIDTH:number = 800;
  DASHBOARD_HEIGHT:number = 600;
  SIDE_LENGTH:number = 200;
  DISPLAY_NUMBER:number = 3;
  NUM_X:number = this.DASHBOARD_WIDTH / this.SIDE_LENGTH;
  NUM_Y:number = this.DASHBOARD_HEIGHT / this.SIDE_LENGTH;
  TOTAL_PANELS = this.NUM_X*this.NUM_Y;
  //Variables
  panels:Panel[] = [];
  leaderboard:number[] = [];
  gameRunning:boolean = false;
  startTime:number = 0;
  displayTime:number = 0;
  rank:any = "Unranked";
  
  constructor() {
   }

  ngOnInit() {    
    //Init panels
    for (var i=0;i<this.TOTAL_PANELS;i++)
    {
      let panel = new Panel();
      panel.id = i;
      panel.left = this.determineLeftLocation( i);
      panel.top = this.determineTopLocation( i );
      this.panels.push( panel );
    }
    this.SIDE_LENGTH = this.SIDE_LENGTH;
  }

  //Private functions
  private determineLeftLocation( id: number )
  {
    return (id % this.NUM_X) * this.SIDE_LENGTH;
  }

  private determineTopLocation( id: number )
  {
    return Math.floor(id / this.NUM_X) * this.SIDE_LENGTH;
  }

  private checkFinished()
  {
    var reset = true;
    for (var i=0;i<this.panels.length;i++)
    {
      if (this.panels[i].colour != "Black" )
      {
        reset = false;
        break;
      }
    }
    if (reset == true)
    {
      this.gameRunning = false;
    }
  }

  private Loop()
  {
      var time = new Date().getTime() - this.startTime;
      this.displayTime = time / 1000;

      this.checkFinished();
      if (this.gameRunning)
      {
        requestAnimationFrame(this.Loop.bind(this));
      }
      else
      {
        this.registerScore(this.displayTime);
      }
  }

  private registerScore( score:number )
  {
    var rank = this.determineRank( score );
    if(rank < this.DISPLAY_NUMBER)
    {
      var sortedArray = this.leaderboard;
      sortedArray.push(score);
      sortedArray.sort((n1,n2) => n1 - n2);
      if(sortedArray.length > this.DISPLAY_NUMBER)
      {
        sortedArray.pop();
      }

      this.leaderboard = sortedArray;
    }
  }

  private determineRank( score:number )
  {
    var rank = 1;
    for(var i=0;i<this.leaderboard.length;i++)
    {
      rank = i+1;
      if(score < this.leaderboard[i])
      {
        break;
      }
      else
      {
        rank += 1;
      }
    }
    this.rank = rank;
    return rank;
  }

  //Public functions
  public startGame()
  {
    this.gameRunning = true;
    var date = new Date();
    this.startTime = date.getTime();
    for (var i=0;i<this.panels.length;i++)
    {
      this.panels[i].colour = "Grey";
      this.panels[i].prevColour = "Grey";
    }
    this.Loop();
  }

  public panelClicked( panel:Panel )
  {
    panel.colour = "Black";
    panel.prevColour = "Black";
    this.checkFinished();
  }

  public mouseEnter( panel:Panel )
  {
    if( panel.colour == "Grey")
      panel.colour='#530b0b';
  }

  public mouseExit( panel:Panel )
  {
    panel.colour=panel.prevColour;
  }


}

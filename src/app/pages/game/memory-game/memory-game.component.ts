import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
})
export class MemoryGameComponent implements OnInit {
  @ViewChild('info', { static: true }) info!: ElementRef;
  @ViewChildren("ref", { read: ElementRef })
  cardRef!: QueryList<ElementRef<HTMLParagraphElement>>;
  @ViewChild("gameBox") gameBox!: ElementRef;
  @ViewChild("success") success!: ElementRef;
  @ViewChild("fail") fail!: ElementRef;
  @ViewChild("movesCount") movesCount!: ElementRef;
  @ViewChild("seconds") seconds!: ElementRef;
  @ViewChild("minutes") minutes!: ElementRef;
  type: any;

  gameStart: boolean = true;
  shuffleNumber: any = 0;
  moves: any = 0;
  oneTimeIf: any = true;
  timeNow: any;
  clearInt: any;
  time: any;
  secondsNumber:any;
  minutesNumber: any;
  socialIcons: any = [];
  numbersIcons: any = [];
  FlagsIcons: any = [];
  duration = 1000;
  animalsIcons: any = [
    { type: 'social', icons: ['facebook', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github', 'facebook', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github'] },
    { type: 'numbers', icons: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'] }
  ];
  src: any;
  // socialIcons = ['facebook-square', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github', 'facebook-square', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github'];
  icon: any = []
  icons: any;
  realArray: any = [];
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((res: any) => {
      this.type = res['slug'];
      this.shuffleIcons(this.type)
    });
    
  }
  
  ngAfterViewInit(): void {
    this.cardsEvent(this.gameBox)
  }

  ngOnInit(): void {

  }
 
  startTimer() {
    // ---- Time counter ----
    this.timeNow = new Date().getTime();

    this.clearInt = setInterval(() => {
      this.time = new Date().getTime() - this.timeNow;
      this.secondsNumber = Math.floor((this.time / 1000) % 60);
      this.minutesNumber = Math.floor((this.time / 1000) / 60);
      // Seconds
      this.secondsNumber < 10 ?
      this.seconds.nativeElement.innerText = `0${this.secondsNumber}` :
      this.seconds.nativeElement.innerText = this.secondsNumber;
      // Minutes
      this.minutesNumber < 10 ?
      this.minutes.nativeElement.innerText = `0${this.minutesNumber}` :
      this.minutes.nativeElement.innerText = this.minutesNumber;

      this.minutesNumber == 11 ? this.restart(): null
    }, 1000);
    // this.info.nativeElement.classList.add('fadeIn');
  }

  // ---------------------------- Restart --------------------
  // all about resetting
  restart() {
    window.location.reload()
  }
  shuffleIcons(type?: any) {   // shuffling
    this.animalsIcons.map((item: any, index: any) => {
      if (item.type == type) {
        this.realArray = item.icons.sort(() => Math.random() - 0.5)
      }
    })
  }
  //  add CLick for eachcard 
  cardsEvent(gameBox:any) {    
    let gameBoxBlocks = Array.from(gameBox.nativeElement.children)
    gameBoxBlocks.forEach((blockItem:any)=> {
      blockItem.addEventListener("click",  () => {
        // Trigger The Flip Block Function
        if(this.oneTimeIf) {
          this.oneTimeIf = false
          this.startTimer()
        }
        this.flipCard(blockItem,gameBoxBlocks);
      });
    })
    
  }
  flipCard(selectedCard:any,originalBlocks:any) {
    
    selectedCard.classList.add('is-flipped')
    let AllFlippedCards = originalBlocks.filter((filteredCard:any) => {
      return filteredCard.classList.contains('is-flipped')
    })
    if(AllFlippedCards.length == 2) {
      
      this.stopClicking();
      // Check Matched Block Function
      this.checkMatchedBlocks(AllFlippedCards[0], AllFlippedCards[1]);
    }
  }
  // Check Matched Block
  checkMatchedBlocks(firstBlock:any, secondBlock:any) {
    // let triesElement = document.querySelector(".tries span");
    if (firstBlock.id === secondBlock.id) {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");

      firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");
      this.success.nativeElement.play()
    } else {
      this.moves += 1; // for moves counter
      this.movesCount.nativeElement.innerHTML = this.moves;
      setTimeout(() => {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
      }, this.duration);
      this.fail.nativeElement.play()

    }
  }
    // Stop Clicking Function
  stopClicking() {
    // Add Class No Clicking on Main Container
    this.gameBox.nativeElement.classList.add("no-clicking");

    // Wait Duration
    setTimeout(() => {
      // Remove Class No Clicking After The Duration
      this.gameBox.nativeElement.classList.remove("no-clicking");
    }, this.duration);
  }

  hint(e:any) {
    let blocks = document.querySelectorAll(".card");
    blocks.forEach((block) => {
      block.classList.add("is-flipped");
      setTimeout(() => {
        block.classList.remove("is-flipped");
      }, 2000);
    });
    e.target.classList.add("disable");
  }
}

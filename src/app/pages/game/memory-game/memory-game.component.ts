import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
})
export class MemoryGameComponent implements OnInit {
  @ViewChildren("ref", { read: ElementRef })
  cardRef!: QueryList<ElementRef<HTMLParagraphElement>>;
  @ViewChild("gameBox") gameBox!: ElementRef;
  type: any;
  x: any = []; // first card index
  y: any = []; // second card index
  m: any = 0;
  i: any = 0;
  gameStart: boolean = true;
  shuffleNumber: any = 0;
  ele: any;
  moves: any = 0;
  oneTimeIf: any = true;
  timeNow: any;
  clearInt: any;
  seconds: any;
  minutes: any;
  progress: any = 0;
  time: any;
  socialIcons: any = [];
  numbersIcons: any = [];
  FlagsIcons: any = [];
  firstRef: any;
  firstIndex: any;
  firstCardName: any;
  firstClick: boolean = true;
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

      this.shuffleIcons('', this.type)
      // this.chooseType(this.type);
    });


  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }
 
  startTimer() {
    // ---- Time counter ----
    this.timeNow = new Date().getTime();

    this.clearInt = setInterval(() => {

      this.time = new Date().getTime() - this.timeNow;
      this.seconds = Math.floor((this.time / 1000) % 60);
      this.minutes = Math.floor((this.time / 1000) / 60);

      if (this.seconds < 10) {
        $('.seconds').text('0' + this.seconds);
      } else {
        $('.seconds').text(this.seconds);
      }

      if (this.minutes < 10) {
        $('.minutes').text('0' + this.minutes);
      } else {
        $('.minutes').text(this.minutes);
      }

    }, 1000);

    $('.info').fadeIn();
  }
  checkCard(cardName:any, cardRef:any, cardIndex:any) {
    // debugger
    console.log(this.firstClick);
    
    if(this.firstClick) {
      this.firstRef = cardRef;
      this.firstIndex = cardIndex;
      this.firstCardName = cardName;
      this.firstClick = false;
      cardRef.classList.remove('flip');
      cardRef.classList.add('show'); // show card
    } else {
      cardRef.classList.remove('flip');
      cardRef.classList.add('show'); // show card

      setTimeout(() => {
        this.checkSuccess(this.firstRef,cardRef,this.firstCardName,cardName);
      }, 700);
    }
  }
  checkSuccess(firstCard?:any, secondCard?: any,firstCardName?:any, secondCardName?:any ) {
    // debugger;
    console.log('---------------------');
    
    console.log(firstCard);
    console.log(secondCard);
    console.log(firstCardName);
    console.log(secondCardName);
    if(firstCardName != secondCardName) {
      firstCard.classList.remove('show');
      firstCard.classList.add('flip'); // hide card
      secondCard.classList.remove('show');
      secondCard.classList.add('flip'); // hide card
    } else {
      firstCard.classList.remove('show')
      firstCard.classList.add('succes')
      secondCard.classList.remove('show')
      secondCard.classList.add('succes')
      this.m += 1;
      // --------- progress for displaying win message ---------
      this.progress += 2;
    }
  }
  
  // secondClick: any = 0;
  startGame(item?: any, myRef?: any, myIndex?: any) {
    if(this.oneTimeIf) {
      this.oneTimeIf = false
      this.startTimer()
    }
    // perform only on not solved cards or not showed cards
    if (!myRef.classList.contains('succes', 'show')) {
      // console.log('hi');
      this.ele = myIndex; // checkeing depend on fliped ele index
      console.log(this.ele);
      
      if (this.i == 0) { // pushing first card index
        this.x.push(this.ele);
        this.i = 1;
      } else { // pushing second card index
        this.y.push(this.ele); 
        this.i = 0;
      }
      eval(myRef).classList.remove('flip')
      eval(myRef).classList.add('show')
      eval(myRef).setAttribute("data-checked", item );
      if(this.x.length == this.y.length) { // start comparing
        this.moves += 1; // for moves counter
        $('.moves').text(this.moves); // diplay moves in Document
        // this time out makes transition complete befor adding or remove classes
        // and solve quick clicking bugs
        
        // console.log(document.querySelectorAll(`#${item}`)[0].getAttribute("data-checked"));
        console.log($('.card').eq(this.x[this.m]).data('checked'));
        console.log($('.card').eq(this.y[this.m]).data('checked'));
        
        setTimeout(() => {
          if(this.ele != this.ele) {
            
          }
          if ($('.card').eq(this.x[this.m]).data('checked') == $('.card').eq(this.y[this.m]).data('checked')) {
            console.log("-------",$('.card').eq(this.x[this.m]).data('checked'), $('.card').eq(this.y[this.m]).data('checked'));
            $('.card').eq(this.x[this.m]).removeClass('show').addClass('succes');
            $('.card').eq(this.y[this.m]).removeClass('show').addClass('succes');
            this.m += 1;
            // --------- progress for displaying win message ---------
            this.progress += 2;
  
          } else {
  
            $('.card').eq(this.x[this.m]).removeClass('show').addClass('flip');
            $('.card').eq(this.y[this.m]).removeClass('show').addClass('flip');
            this.m += 1;
  
          }
          if (this.progress == 16) {
          
            clearInterval(this.clearInt); // stop Time Counter
            setTimeout(function () {
              $('.info').fadeOut();
              $('.result').fadeIn(1000);
            }, 700);
            
          }

        }, 700);
      }
    }
  }
  // ---------------------------- Restart --------------------
  // all about resetting
  restart() {
    this.shuffleIcons('', this.type);
    // this.startGame()
    $('.info').hide();
    this.oneTimeIf = true;
    this.firstRef = null;
    this.moves = 0;
    this.progress = 0;
    this.cardRef.map((item) => {
      console.log(item);
      item.nativeElement.classList.remove('succes');
      item.nativeElement.classList.add('flip');
    })
    this.m = 0;
    clearInterval(this.clearInt);

    $('.result').fadeOut(1000);
    $('.minutes').text('00');
    $('.seconds').text('00');
    $('.moves').text('0');
  }
  shuffleIcons(passedArr?: any, type?: any) {   // shuffling
    this.animalsIcons.map((item: any, index: any) => {
      if (item.type == type) {
        this.realArray = item.icons.sort(() => Math.random() - 0.5)
        console.log(this.realArray);

      }
    })
  }

  chooseType(type: any) {
    switch (type) {
      case 'social':

        // this.socialIcons = ['facebook', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github', 'facebook', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github'];
        // this.realArray = this.socialIcons;
        // this.shuffle(this.realArray,type)
        break;
      case 'numbers':
        // this.numbersIcons = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
        // this.realArray = this.numbersIcons;
        // this.shuffle(this.realArray,type)
        break;

      default:
        break;
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
}

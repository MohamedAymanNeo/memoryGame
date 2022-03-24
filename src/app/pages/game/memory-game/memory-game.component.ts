import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
})
export class MemoryGameComponent implements OnInit {
  @ViewChildren("ref", { read: ElementRef })
  cardRef!: QueryList<ElementRef<HTMLParagraphElement>>;
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
  secondClick: any = 1;
  startGame(item?: any, myRef?: any, myIndex?: any) {
    console.log(this.secondClick);
    
    if (this.secondClick < 3) {
      this.secondClick++;
      if (this.oneTimeIf) {
        console.log(this.oneTimeIf);
        this.oneTimeIf = false;
        this.startTimer()
      }

      // perform only on not solved cards or not showed cards
      if (!myRef.classList.contains('succes', 'show')) {
        this.ele = myIndex; // checkeing depend on fliped ele index
        // console.log("this.ele");

        if (this.i == 0) { // pushing first card index
          this.x.push(this.ele);
          // -------------Check this ref not equal it self
          this.firstRef = myRef;
          this.i = 1;
        } else { // pushing second card index
          this.y.push(this.ele);
          this.i = 0;
        }
        myRef.classList.remove('flip');
        myRef.classList.add('show'); // show card  
        if (this.x.length == this.y.length) { // start comparing
          this.moves += 1; // for moves counter
          $('.moves').text(this.moves); // diplay moves in Document
          // this time out makes transition complete befor adding or remove classes
          // and solve quick clicking bugs
          setTimeout(() => {
            // start checking depend on m variable thats get the index of pushed cards
            // console.log(x, y) in the top explain this

            // -----------check if this ref not equal it self
            // &&  myRef.id != myRef.id
            if (myRef.id == this.firstRef.id ) {
              myRef.classList.remove('show')
              myRef.classList.add('succes')
              this.firstRef.classList.remove('show')
              this.firstRef.classList.add('succes')
              this.m += 1;
              // --------- progress for displaying win message ---------
              this.progress += 2;
            } else {
              myRef.classList.remove('show')
              myRef.classList.add('flip')
              this.firstRef.classList.remove('show')
              this.firstRef.classList.add('flip')

              this.m += 1;
            }
            if (this.progress == 16) {

              clearInterval(this.clearInt); // stop Time Counter
              setTimeout(function () {
                $('.info').fadeOut();
                $('.result').fadeIn(1000);
              }, 700);

            }
          }, 700)
        }
      }
    }
    if (this.secondClick == 3) {
      this.secondClick --
      return
    }
  }

  shuffleIcons(passedArr?: any, type?: any) {   // shuffling
    this.animalsIcons.map((item: any, index: any) => {
      if (item.type == type) {
        this.realArray = item.icons.sort(() => Math.random() - 0.5)
        console.log(this.realArray);

      }
    })
  }
  checkClicks() {
    this.cardRef.map((item) => {
      console.log(item);

      // item.nativeElement.onclick((it) => {
      //   console.log(it);

      // })
    })
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

}

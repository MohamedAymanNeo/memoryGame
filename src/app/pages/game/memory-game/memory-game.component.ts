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
  x:any = []; // first card index
  y:any = []; // second card index
  m:any = 0;
  i:any = 0;
  gameStart:boolean = false;
  shuffleNumber:any = 0;
  ele:any;
  moves:any = 0;
  oneTimeIf:any = true;
  timeNow:any;
  clearInt:any;
  seconds:any;
  minutes:any;
  progress:any = 0;
  time:any;
  socialIcons:any =[];
  numbersIcons:any =[];
  FlagsIcons:any =[];
  animalsIcons:any =[
    {type: 'social', icons: ['facebook', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github', 'facebook', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github']},
    {type: 'numbers', icons: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']}
  ];
  src:any;
  // socialIcons = ['facebook-square', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github', 'facebook-square', 'youtube', 'instagram', 'codepen', 'linkedin', 'twitter', 'twitch', 'github'];
  icon:any =[]
  icons: any;
  realArray:any = [];
  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe((res:any) => {
      this.type = res['slug'];

      this.shuffleIcons('',this.type)
      // this.chooseType(this.type);
    });
    
    
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
        
  }
  chooseType(type:any) {
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
  checkItem(item: any) {
    // if(!this.gameStart) {
    //   this.gameStart =true;
    //   this.startGame(item)
    // } 

  }
  startTimer() {
    // ---- Time counter ----
    if (this.oneTimeIf) {
      
      this.oneTimeIf = false;
      this.timeNow = new Date().getTime();
  
      this.clearInt = setInterval( () => {
  
        this.time = new Date().getTime() - this.timeNow;
        this.seconds = Math.floor((this.time /1000) % 60);
        this.minutes = Math.floor((this.time /1000) / 60);
  
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
  }
  startGame(item: any,myRef: any) {
    this.cardRef;
    if(this.gameStart) {
      this.gameStart =true;
      this.startTimer()
    } 

    // perform only on not solved cards or not showed cards
    if (! $(this).hasClass('succes') && ! $(this).hasClass('show')) { 
  
      this.ele = $('.card').index($(this)); // checkeing depend on fliped ele index
      console.log(this.ele);
  
      if (this.i == 0) { // pushing first card index
        this.x.push(this.ele);
        this.i = 1;
      } else { // pushing second card index
        this.y.push(this.ele); 
        this.i = 0;
      }
  
      $(this).removeClass('flip').addClass('show'); // show card
      console.log(this.x, this.y, 'checking index is ' + this.m + ' now');
  
      if (this.x.length == this.y.length ) { // start comparing
  
        this.moves += 1; // for moves counter
        $('.moves').text(this.moves); // diplay moves in Document
  
        // this time out makes transition complete befor adding or remove classes
        // and solve quick clicking bugs
        setTimeout( ()=> { 
  
          // start checking depend on m variable thats get the index of pushed cards
          // console.log(x, y) in the top explain this
          if ($('.card').eq(this.x[this.m]).data('checked') == $('.card').eq(this.y[this.m]).data('checked')) {
            // console.log($('.card').eq(this.x[this.m]).data('checked'), $('.card').eq(this.y[this.m]).data('checked'));
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
        }, 700)
      }
    }
    // $('.wrapper').on('click', '.card', function () {

    
    // });
  }

  shuffleIcons(passedArr?:any, type?: any) {       // shuffling depends on splice 'removing array items'
    this.animalsIcons.map((item: any,index:any) => {
      if(item.type == type) {
        this.realArray = item.icons.sort(() => Math.random() - 0.5)
        console.log(this.realArray);
      }
      
    })
    // return Math.floor(Math.random() * this.realArray.length);
    // debugger;
    // this.icons= icons;
    // for (;;) {
    //   if (this.icons.length === 0) {break;}
    //   var n = Math.floor(Math.random() * this.icons.length);
    //   // console.log(n);
    //   $('.wrapper').append('<div class="card flip" data-checked="' + this.icons[n] + '"><img class="img" src=""assets/images/"'+ type+'/'+this.icons[n]+'"/></div>')
    //   this.icons.splice(n, 1);
    // }
  }

  // ---------------------------- Restart --------------------
// all about resetting
restart() {
  // $('.card').each(function () {
  //   $(this).remove();
  // });
  this.icons = this.icon.slice(0);
  // this.shuffle();

  $('.info').hide();
  
  this.oneTimeIf = true;
  this.moves = 0;
  this.progress = 0;
  this.x.splice(0);
  this.y.splice(0);
  this.m = 0;
  clearInterval(this.clearInt);
  
  $('.result').fadeOut(1000);
  $('.minutes').text('00');
  $('.seconds').text('00');
  $('.moves').text('0');
  // $('.restart').click(function () {
  // });
}

}

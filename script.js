
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
   //cutejump11                    
var game = new Phaser.Game(768, 1024, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
  
  var isMenuScreen=true;
  var gamestart = false;

  var animalsgroup;
  var animalsgroup02;
  var animalsgroup03;
  var animalsgroup04;
  var animalsgroup05;
  var animals01;
  var animals02;
  var animals03;
  var animals04;
  var animals05;
  var lastWord;

  var animals01_isAlive=false;
  var animals02_isAlive=false;
  var animals03_isAlive=false;
  var animals04_isAlive=false;
  var animals05_isAlive=false;
  var mode;
//点击动物消失的功能
  var deadclick;

  var button;//start按钮
  var button02; //返回start界面的replay按钮

  var counter = 0; //记分变量代表的生成
  var text02; //记分text
  var text03;//end界面游戏得分text
  var timeText;//时间倒计时text
  
  //屏幕上显示的需要type的5个随机三字符
  var typeText01;
  var typeText02;
  var typeText03;
  var typeText04;
  var typeText05;
  //系统里随机生成的5个三字符
  var randomWord1;
  var randomWord2;
  var randomWord3;
  var randomWord4;
  var randomWord5;


  //每个罐子各自拥有的动物组
  var random01;// = game.rnd.integerInRange(1,5);
  var random02; //= game.rnd.integerInRange(1,5);
  var random03;// = game.rnd.integerInRange(1,5);
  var random04;// = game.rnd.integerInRange(1,5);
  var random05;// = game.rnd.integerInRange(1,5);


  

  var currentWord;

  var lastThreeLettersTyped;

  
  //random words库
  var arrayOfWords = ["ANY","ACT","AIR","ASK","ARM","BUY","BUT","BAG","MAP","ARE","HAT","BIT","BED","BAD","BIG","CUT","CAR","CRY","CAN","CUE","FOG","AXE","FAR","EYE","END","FUN","DAY","GAP","HER","FIX","KID","MAN","LET","LIE","JOB","JOY","ILL","INK","LAB","OFF","OUR","PAY","OIL","NOW","TAP","TED","TIP","THE","TAX","SKY","SHE","SUN","ZOO","WIN","WAY","PUT","SIM","SEE","SIR","TEE","TOO","TWO","TRY","VIA","LOT","ICE","NEW","RED","YES","OUT","FLY","BUS","CAP"];

  //声明三个状态
  const MODE_START = 0;
  const MODE_GAME = 1;
  const MODE_END = 2;

  var jumpaudio01;
  var jumpaudio02;
  var jumpaudio03;
  var jumpaudio04;
  var jumpaudio05;
  var backgroundaudio;
  var mouseaudio;
  var aoaudio;
  var startaudio;
  var endaudio;
  var scoreaudio;

  function preload () { 
    //像素无法整除时用xx(图片像素)/xx（除以的倍数）表示，让电脑自己计算小数点
      game.load.spritesheet('startbuttonImg', 'assets/image/startbutton.png', 355, 351/3);
      game.load.spritesheet('endbuttonImg', 'assets/image/endbutton.png', 355, 351/3);

      game.scale.setShowAll();
      game.scale.pageAlignHorizontally = true;
	    game.scale.pageAlignVertically = true;
	    game.scale.refresh();
      game.load.image('background', 'assets/image/background.png'); 
      game.load.image('block', 'assets/image/block.png');  
      game.load.image('pot', 'assets/image/pot.png'); 
      game.load.image('cutejump', 'assets/image/cutejump.png');
      game.load.image('cutejumpend', 'assets/image/cutejumpend.png');

      game.load.image('mouse', 'assets/image/mouse.png');

      game.load.spritesheet('catjump', 'assets/image/cat.png', 1032/8, 266);
      game.load.spritesheet('dogjump', 'assets/image/dog.png', 1032/8, 266);
      game.load.spritesheet('chickenjump', 'assets/image/chicken.png', 1032/8, 266);
      game.load.spritesheet('pigjump', 'assets/image/pig.png', 1032/8, 266);
      game.load.spritesheet('monsterjump', 'assets/image/monster.png', 1032/8, 266);

      game.load.audio('jumpsound01', 'assets/sound/jumpsound01.wav');
      game.load.audio('jumpsound02', 'assets/sound/jumpsound02.wav');
      game.load.audio('jumpsound03', 'assets/sound/jumpsound03.wav');
      game.load.audio('jumpsound04', 'assets/sound/jumpsound04.wav');
      game.load.audio('jumpsound05', 'assets/sound/jumpsound05.wav');
      game.load.audio('backgroundsound', 'assets/sound/backgroundsound.wav');
      game.load.audio('mousesound', 'assets/sound/mousesound.wav');
      game.load.audio('aosound', 'assets/sound/aosound.map3');
      game.load.audio('startsound', 'assets/sound/startsound.mp3');
      game.load.audio('endsound', 'assets/sound/endsound.wav');
      game.load.audio('scoresound', 'assets/sound/scoresound.wav');
      game.load.audio('act', 'assets/sound2/act.mp3');
      game.load.audio('air', 'assets/sound2/air.mp3');
      game.load.audio('any', 'assets/sound2/any.mp3');
      game.load.audio('arm', 'assets/sound2/arm.mp3');
      game.load.audio('ask', 'assets/sound2/ask.mp3');
      game.load.audio('bag', 'assets/sound2/bag.mp3');
      game.load.audio('but', 'assets/sound2/but.mp3');
      game.load.audio('buy', 'assets/sound2/buy.mp3');
      game.load.audio('map', 'assets/sound2/map.mp3');
      game.load.audio('are', 'assets/sound2/are.mp3');
      game.load.audio('bad', 'assets/sound2/bad.mp3');
      game.load.audio('big', 'assets/sound2/big.mp3');
      game.load.audio('bit', 'assets/sound2/bit.mp3');
      game.load.audio('can', 'assets/sound2/can.mp3');
      game.load.audio('cry', 'assets/sound2/cry.mp3');
      game.load.audio('cue', 'assets/sound2/cue.mp3');
      game.load.audio('cut', 'assets/sound2/cut.mp3');
      game.load.audio('end', 'assets/sound2/end.mp3');
      game.load.audio('eye', 'assets/sound2/eye.mp3');
      game.load.audio('far', 'assets/sound2/far.mp3');
      game.load.audio('fog', 'assets/sound2/fog.mp3');
      game.load.audio('fun', 'assets/sound2/fun.mp3');
      game.load.audio('gap', 'assets/sound2/gap.mp3');
      game.load.audio('hat', 'assets/sound2/hat.mp3');
      game.load.audio('her', 'assets/sound2/her.mp3');
      game.load.audio('fix', 'assets/sound2/fix.mp3');
      game.load.audio('ill', 'assets/sound2/ill.mp3');
      game.load.audio('ink', 'assets/sound2/ink.mp3');
      game.load.audio('job', 'assets/sound2/job.mp3');
      game.load.audio('joy', 'assets/sound2/joy.mp3');
      game.load.audio('kid', 'assets/sound2/kid.mp3');
      game.load.audio('lab', 'assets/sound2/lab.mp3');
      game.load.audio('let', 'assets/sound2/let.mp3');
      game.load.audio('man', 'assets/sound2/man.mp3');
      game.load.audio('now', 'assets/sound2/now.mp3');
      game.load.audio('off', 'assets/sound2/off.mp3');
      game.load.audio('our', 'assets/sound2/our.mp3');
      game.load.audio('tap', 'assets/sound2/tap.mp3');
      game.load.audio('ted', 'assets/sound2/ted.mp3');
      game.load.audio('the', 'assets/sound2/the.mp3');
      game.load.audio('tip', 'assets/sound2/tip.mp3');
      game.load.audio('tax', 'assets/sound2/tax.mp3');
      game.load.audio('sky', 'assets/sound2/sky.mp3');
      game.load.audio('she', 'assets/sound2/she.mp3');
      game.load.audio('sun', 'assets/sound2/sun.mp3');
      game.load.audio('zoo', 'assets/sound2/zoo.mp3');
      game.load.audio('win', 'assets/sound2/win.mp3');
      game.load.audio('way', 'assets/sound2/way.mp3');
      game.load.audio('put', 'assets/sound2/put.mp3');
      game.load.audio('sim', 'assets/sound2/sim.mp3');
      game.load.audio('see', 'assets/sound2/see.mp3');
      game.load.audio('sir', 'assets/sound2/sir.mp3');
      game.load.audio('tee', 'assets/sound2/tee.mp3');
      game.load.audio('too', 'assets/sound2/too.mp3');
      game.load.audio('two', 'assets/sound2/two.mp3');
      game.load.audio('try', 'assets/sound2/try.mp3');
      game.load.audio('via', 'assets/sound2/via.mp3');
      game.load.audio('lot', 'assets/sound2/lot.mp3');
      game.load.audio('fly', 'assets/sound2/fly.mp3');
      game.load.audio('ice', 'assets/sound2/ice.mp3');
      game.load.audio('new', 'assets/sound2/new.mp3');
      game.load.audio('out', 'assets/sound2/out.mp3');
      game.load.audio('red', 'assets/sound2/red.mp3');
      game.load.audio('yes', 'assets/sound2/yes.mp3');
      game.load.audio('bus', 'assets/sound2/bus.mp3');
      game.load.audio('cap', 'assets/sound2/cap.mp3');
  }

  function create () {
    //声明先调用start界面
     mode = MODE_START;

    game.world.setBounds(0,0,768,1024);
      //startScreen();


    game.add.sprite(0,0,'cutejump');


  jumpaudio01 = game.add.audio('jumpsound01');
  jumpaudio02 = game.add.audio('jumpsound02');
  jumpaudio03 = game.add.audio('jumpsound03');
  jumpaudio04 = game.add.audio('jumpsound04');
  jumpaudio05 = game.add.audio('jumpsound05');
  backgroundaudio = game.add.audio('backgroundsound');
  mouseaudio = game.add.audio('mousesound');
  startaudio = game.add.audio('startsound');
  endaudio = game.add.audio('endsound');
  scoreaudio = game.add.audio('scoresound');
  aoaudio = game.add.audio('aosound');
  
  wordAudio = [
    game.add.audio('any'),
    game.add.audio('act'),
    game.add.audio('air'),
    game.add.audio('ask'),
    game.add.audio('arm'),
    
    game.add.audio('buy'),
    game.add.audio('but'),
    game.add.audio('bag'),
    game.add.audio('map'),
    game.add.audio('are'),
    
    game.add.audio('hat'),
    game.add.audio('bit'),
    game.add.audio('bed'),
    game.add.audio('bad'),
    game.add.audio('big'),
    
    game.add.audio('cut'),
    game.add.audio('car'),
    game.add.audio('cry'),
    game.add.audio('can'),
    game.add.audio('cue'),
    
    game.add.audio('fog'),
    game.add.audio('axe'),
    game.add.audio('far'),
    game.add.audio('eye'),
    game.add.audio('end'),
    
    game.add.audio('fun'),
    game.add.audio('day'),
    game.add.audio('gap'),
    game.add.audio('her'),
    game.add.audio('fix'),
    
    game.add.audio('kid'),
    game.add.audio('man'),
    game.add.audio('let'),
    game.add.audio('lie'),
    game.add.audio('job'),
    
    game.add.audio('joy'),
    game.add.audio('ill'),
    game.add.audio('ink'),
    game.add.audio('lab'),
    game.add.audio('off'),
    
    game.add.audio('our'),
    game.add.audio('pay'),
    game.add.audio('oil'),
    game.add.audio('now'),
    game.add.audio('tap'),

    game.add.audio('ted'),
    game.add.audio('tip'),
    game.add.audio('the'),
    game.add.audio('tax'),
    game.add.audio('sky'),
    
    game.add.audio('she'),
    game.add.audio('sun'),
    game.add.audio('zoo'),
    game.add.audio('win'),
    game.add.audio('way'),
    
    game.add.audio('put'),
    game.add.audio('sim'),
    game.add.audio('see'),
    game.add.audio('sir'),
    game.add.audio('tee'),
    
    game.add.audio('too'),
    game.add.audio('two'),
    game.add.audio('try'),
    game.add.audio('via'),
    game.add.audio('lot'),

    game.add.audio('ice'),
    game.add.audio('new'),
    game.add.audio('red'),
    game.add.audio('yes'),
    game.add.audio('out'),
    
    game.add.audio('fly'),
    game.add.audio('bus'),
    game.add.audio('cap'),
    ];
  

   //初始调用的button，后边也写了一遍是因为那个是在end按钮后调用的。而这个是游戏初始就调用出来的，如果这里不写新加载游戏就显示不出start按钮，无法进入游戏
   //这是一个按钮所使用的专用函数，两个数字表示位置，黄色字母表示调用的图片，gamescreen表示按钮执行后调用的功能（函数？），game是惯用写法
   //0，1，2分别表示鼠标碰触按钮，鼠标点击按钮，鼠标松开按钮时调用的序列帧
    button = game.add.button(220, 800, 'startbuttonImg', gameScreen, game, 0, 1, 2);
    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    startaudio.play();

 
    
    

    

    //choose a random word
    var randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
     randomWord1 = arrayOfWords[randomWordIndex];
    
    randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
     randomWord2 = arrayOfWords[randomWordIndex];

     randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
     randomWord3 = arrayOfWords[randomWordIndex];

     randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
     randomWord4 = arrayOfWords[randomWordIndex];

     randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
     randomWord5 = arrayOfWords[randomWordIndex];

     currentWord = randomWord1;

     lastThreeLettersTyped = "ZZZ";
     var tempKey;
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.Y);
     tempKey.onDown.add(keyPressed,this);
     tempKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
     tempKey.onDown.add(keyPressed,this);
     random01 = game.rnd.integerInRange(1,5);
     random02 = game.rnd.integerInRange(1,5);
     random03 = game.rnd.integerInRange(1,5);
     random04 = game.rnd.integerInRange(1,5);
     random05 = game.rnd.integerInRange(1,5);
       
  }

  function keyPressed(thisKey){
    //add this to the recently pressed key array
    console.log("the old string is " + lastThreeLettersTyped);
    lastThreeLettersTyped += String.fromCharCode(thisKey.keyCode); //add new letter to end
    console.log("the new string is " + lastThreeLettersTyped);
    lastThreeLettersTyped = lastThreeLettersTyped.slice(1); //remove first letter
    console.log("the new string is now " + lastThreeLettersTyped);
    
    //为飞起的动物能被点击做的功能组
    //两个逻辑，第一个this.input.checkPointerDown(game.input.mousePointer，写的是对跳起动物所做的动作——鼠标点击
    //game.input.mousePointer.position.y < 600是划定鼠标点击有效范围，游戏中下半区域不能被鼠标点击得分，所以限定鼠标轴小于600
    function onClickFlyingAnimal () {
      if (this.input.checkPointerDown(game.input.mousePointer) &&
        game.input.mousePointer.position.y < 600) {
        //播放该单词音频
        var wordIndex = 0;
        for (wordIndex = 0; wordIndex < arrayOfWords.length; wordIndex++)
          if (lastWord == arrayOfWords[wordIndex]){
            break;
          } 
        wordAudio[wordIndex].play();
        //鼠标执行上一行的动作后，运行addscore功能，从而使得点击加分
        addScore(this);
        //点击后动物消失
        this.kill();
      }
    }

    if (lastThreeLettersTyped == randomWord1){
      lastWord = randomWord1;
      //player typed the word
      console.log("YOU TYPED IT SUCCESS");
      //从事先写好的字母组合数列中随机挑选一个
      var randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
      randomWord1 = arrayOfWords[randomWordIndex];
      //动物里随机抽一个
      random01 = game.rnd.integerInRange(1,5);
      //屏幕显示出生成的字母
      typeText01.setText(randomWord1);
      //判断跳起动物存在，然后执行jump
          if(animals01_isAlive==true)
          {
            animals01.body.velocity.y = -600;
            animals01.animations.play('jump');

            //animals专属update，指定跳跃升空的动物能被鼠标点击
            animals01.update = onClickFlyingAnimal;

          }
      randomimage();

      
   }
    else if (lastThreeLettersTyped == randomWord2){
      lastWord = randomWord2;
      console.log("YOU TYPED IT SUCCESS");
      var randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
      randomWord2 = arrayOfWords[randomWordIndex];
      console.log(randomWord2);
      random02 = game.rnd.integerInRange(1,5);
      
      typeText02.setText(randomWord2);


      if(animals02_isAlive==true)
          {
            animals02.body.velocity.y = -700;
            animals02.animations.play('jump');
            
            animals02.update = onClickFlyingAnimal;
          }
      randomimage02();


    }
    else if (lastThreeLettersTyped == randomWord3){
      lastWord = randomWord3;
      var randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
      randomWord3 = arrayOfWords[randomWordIndex];
      console.log(randomWord3);
      random03 = game.rnd.integerInRange(1,5);
      
      typeText03.setText(randomWord3);


      if(animals03_isAlive==true)
          {
            animals03.body.velocity.y = -700;
            animals03.animations.play('jump');
            animals03.update = onClickFlyingAnimal;

          }
      randomimage03();
  
    }
    else if (lastThreeLettersTyped == randomWord4){
      lastWord = randomWord4;
      var randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
      randomWord4 = arrayOfWords[randomWordIndex];
      console.log(randomWord4);
      random04 = game.rnd.integerInRange(1,5);
      
      typeText04.setText(randomWord4);


      if(animals02_isAlive==true)
          {
            animals04.body.velocity.y = -700;
            animals04.animations.play('jump');
            animals04.update = onClickFlyingAnimal;

          }
      randomimage04();

    }
    else if (lastThreeLettersTyped == randomWord5){
      lastWord = randomWord5;
      
      var randomWordIndex = game.rnd.integerInRange(0,arrayOfWords.length-1);
      randomWord5 = arrayOfWords[randomWordIndex];
      console.log(randomWord5);
      random05 = game.rnd.integerInRange(1,5);
      
      typeText05.setText(randomWord5);


      if(animals05_isAlive==true)
          {
            animals05.body.velocity.y = -700;
          animals05.animations.play('jump');
            animals05.update = onClickFlyingAnimal;
          }
       randomimage05();
    }

  }

  function update(){

    //说明切换屏幕
    switch(mode){
        case MODE_START:
        break;
        case MODE_GAME:
        //
        mouse.x = game.input.x;
        mouse.y = game.input.y;
        //给鼠标“自定义图标”限定活动范围，但实际上系统的鼠标图标活动范围没有被限制。
        //为了限制系统鼠标，使其无法点击罐子区域动物得分，
        //在function onClickFlyingAnimal里又做了有效范围限制。整个功能需两者结合
        if (mouse.y > 600) {          
          mouse.y = 600;
          game.input.mousePointer.position.y = 600;
        }
        //加载时间倒计时指示，放在update才能每针读取
        timeText.text = "TIME: " + Math.floor(game.time.events.duration / 1000);
        break;
        case MODE_END:
        break;

        }

  }

  function startScreen(){
    //声明以下是start的内容
    mode = MODE_START;
    //移除之前界面所有东西
    game.world.removeAll();
    endaudio.stop();
    startaudio.play();
    game.add.sprite(0,0,'cutejump');
    game.stage.backgroundColor = '#c42477';
    //game.world.centerX表示x轴坐标，100表示y坐标
    //最后三个数字表示鼠标与图标每次的互动调用的图片序列标号
    //eg:第一个表示用导入序列帧的第一个图像————鼠标移动到图像上的表示，2表示第二个点击，3表示第三个松开鼠标
    button = game.add.button(224, 800, 'startbuttonImg', gameScreen, game, 0, 1, 2);
    //var button = game.add.button(game.world.centerX, 600, 'startbuttonImg', gameScreen, game, 0, 1, 2);
    //startbutton.x = game.world.centerX - startbutton.width/2;
    mouseaudio.play();


  } 
  
  //分数叠加的算法功能
  function addScore (whichanimal) {
  //分值设置，源代码是counter++;(以1分为单位值，现在是100分)
    if (whichanimal.typeName == "monster") {
      counter += whichanimal.score*5;
      aoaudio.play();
    } else {
      counter+=whichanimal.score;
      //scoreaudio.play();
    }
    text02.text = "SCORE: " + counter;      
}



  
  function render () {}

  function randomimage(){
   if (random01 == 1){
    
    animals01 = animalsgroup.add(game.make.sprite(18, 756,"catjump"));
    game.physics.arcade.enable(animals01);
      //鼠标点击相关
     animals01.inputEnabled = true;
      //animal是否存在状况判断
     animals01_isAlive=true;
     animals01.body.setSize(120, 132, 105, 211);
     animals01.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
     animals01.score=10;
     animals01.typeName = "cat";
     animals01.body.collideWorldBounds = false;
     animals01.body.gravity.y = 0;
     jumpaudio01.play();
     
     }

    else if (random01 == 2){
    
      animals01 = animalsgroup.add(game.make.sprite(18, 756,"dogjump"));
      game.physics.arcade.enable(animals01);
      //鼠标点击相关
      animals01.inputEnabled = true;
      animals01_isAlive=true;
      animals01.body.collideWorldBounds = true;
      animals01.body.setSize(120, 132, 105, 211);
      animals01.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals01.score=10;
      animals01.typeName = "dog";
      animals01.body.collideWorldBounds = false;
      animals01.body.gravity.y = 0;
      jumpaudio02.play();
     
     }
    else if (random01 == 3){
      animals01 = animalsgroup.add(game.make.sprite(18, 756,"chickenjump"));
      //animal的物理
      game.physics.arcade.enable(animals01);
      animals01.inputEnabled = true;
      animals01_isAlive=true;
      animals01.body.collideWorldBounds = true;
      animals01.body.setSize(120, 132, 105, 211);
      animals01.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals01.score=10;
      animals01.typeName = "chicken";
      animals01.body.collideWorldBounds = false;
      animals01.body.gravity.y = 0;
      jumpaudio03.play();
    }

     else if (random01 == 4){
      animals01 = animalsgroup.add(game.make.sprite(18, 756,"pigjump"));
      //animal的物理
      game.physics.arcade.enable(animals01);
      animals01.inputEnabled = true;
      animals01_isAlive=true;
      animals01.body.collideWorldBounds = true;
      animals01.body.setSize(120, 132, 105, 211);
      animals01.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals01.score=10;
      animals01.typeName = "pig";
      animals01.body.collideWorldBounds = false;
      animals01.body.gravity.y = 0;
      jumpaudio04.play();

     }
     else if (random01 == 5){
      animals01 = animalsgroup.add(game.make.sprite(18, 756,"monsterjump"));
      //animal的物理
      game.physics.arcade.enable(animals01);
      animals01.inputEnabled = true;
      animals01_isAlive=true;
      animals01.body.collideWorldBounds = true;
      animals01.body.setSize(120, 132, 105, 211);
      animals01.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals01.score=10;
      animals01.typeName = "monster";
      animals01.body.collideWorldBounds = false;
      animals01.body.gravity.y = 0;
      jumpaudio05.play();
      }

   }


  function randomimage02(){
    console.log("第二个");
  //第二个罐子
    if (random02 == 1){
  
    animals02 = animalsgroup02.add(game.make.sprite(168, 756,"catjump"));
    game.physics.arcade.enable(animals02);
      //鼠标点击相关
    animals02.inputEnabled = true;
      animals02_isAlive=true;
      animals02.body.collideWorldBounds = true;
      animals02.body.setSize(120, 132, 105, 211);
      animals02.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals02.score=10;
      animals02.typeName = "cat";
      animals02.body.collideWorldBounds = false;
      animals02.body.gravity.y = 0;
      jumpaudio01.play();
     
     }

    else if (random02 == 2){
      console.log("game ddddw22222");
    
    animals02 = animalsgroup02.add(game.make.sprite(168, 756,"dogjump"));
    game.physics.arcade.enable(animals02);
      //鼠标点击相关
    animals02.inputEnabled = true;
      animals02_isAlive=true;
      animals02.body.collideWorldBounds = true;
      animals02.body.setSize(120, 132, 105, 211);
      animals02.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
     
      //它的分值
      animals02.score=10;
      animals02.typeName = "dog";
       animals02.body.collideWorldBounds = false;
       animals02.body.gravity.y = 0;
       jumpaudio02.play();
     
     }
    else if (random02 == 3){
      console.log("game 222222111133333");
      animals02 = animalsgroup02.add(game.make.sprite(168, 756,"chickenjump"));
      //animal的物理
      game.physics.arcade.enable(animals02);
      animals02.inputEnabled = true;

      animals02_isAlive=true;
      animals02.body.collideWorldBounds = true;
      animals02.body.setSize(120, 132, 105, 211);
      animals02.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      
      //它的分值
      animals02.score=10;
      animals02.typeName = "chicken";
      animals02.body.collideWorldBounds = false;
      animals02.body.gravity.y = 0;
      jumpaudio03.play();
    }

     else if (random02 == 4){
      console.log("game 222222111144444");
      animals02 = animalsgroup02.add(game.make.sprite(168, 756,"pigjump"));
      //animal的物理
      game.physics.arcade.enable(animals02);
      animals02.inputEnabled = true;

      animals02_isAlive=true;
      animals02.body.collideWorldBounds = true;
      animals02.body.setSize(120, 132, 105, 211);
      animals02.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      
      //它的分值
      animals02.score=10;
      animals02.typeName = "pig";
       animals02.body.collideWorldBounds = false;
       animals02.body.gravity.y = 0;
       jumpaudio04.play();

     }
     else if (random02 == 5){
      console.log("game 222222111155555");
      animals02 = animalsgroup02.add(game.make.sprite(168, 756,"monsterjump"));
      //animal的物理
      game.physics.arcade.enable(animals02);
      animals02.inputEnabled = true;

      animals02_isAlive=true;
      animals02.body.collideWorldBounds = true;
      animals02.body.setSize(120, 132, 105, 211);
      animals02.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
     
      //它的分值
      animals02.score=10;
      animals02.typeName = "monster";
       animals02.body.collideWorldBounds = false;
       animals02.body.gravity.y = 0;
       jumpaudio05.play();
      }
      
   }


   function randomimage03(){
    console.log("第二个");
  //第二个罐子
    if (random03 == 1){
  
    animals03 = animalsgroup03.add(game.make.sprite(324, 756,"catjump"));
    game.physics.arcade.enable(animals03);
      //鼠标点击相关
    animals03.inputEnabled = true;
      animals03_isAlive=true;
      animals03.body.collideWorldBounds = true;
      animals03.body.setSize(120, 132, 105, 211);
      animals03.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals03.score=10;
      animals03.typeName = "cat";
       animals03.body.collideWorldBounds = false;
       animals03.body.gravity.y = 0;
       jumpaudio01.play();
     
     }

    else if (random03 == 2){
      console.log("game ddddw22222");
    
    animals03 = animalsgroup03.add(game.make.sprite(324, 756,"dogjump"));
    game.physics.arcade.enable(animals03);
      //鼠标点击相关
    animals03.inputEnabled = true;
      animals03_isAlive=true;
      animals03.body.collideWorldBounds = true;
      animals03.body.setSize(120, 132, 105, 211);
      animals03.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
     
      //它的分值
      animals03.score=10;
      animals03.typeName = "dog";
      animals03.body.collideWorldBounds = false;
      animals03.body.gravity.y = 0;
      jumpaudio02.play();
     
     }
    else if (random03 == 3){
      console.log("game 222222111133333");
      animals03 = animalsgroup03.add(game.make.sprite(324, 756,"chickenjump"));
      game.physics.arcade.enable(animals03);
      animals03.inputEnabled = true;
      animals03_isAlive=true;
      animals03.body.collideWorldBounds = true;
      animals03.body.setSize(120, 132, 105, 211);
      animals03.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals03.score=10;
      animals03.typeName = "chicken";
      animals03.body.collideWorldBounds = false;
      animals03.body.gravity.y = 0;
      jumpaudio03.play();
    }

     else if (random03 == 4){
      console.log("game 222222111144444");
      animals03 = animalsgroup03.add(game.make.sprite(324, 756,"pigjump"));
      game.physics.arcade.enable(animals03);
      animals03.inputEnabled = true;
      animals03_isAlive=true;
      animals03.body.collideWorldBounds = true;
      animals03.body.setSize(120, 132, 105, 211);
      animals03.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals03.score=10;
      animals03.typeName = "pig";
      animals03.body.collideWorldBounds = false;
      animals03.body.gravity.y = 0;
      jumpaudio04.play();

     }
     else if (random03 == 5){
      console.log("game 222222111155555");
      animals03 = animalsgroup03.add(game.make.sprite(324, 756,"monsterjump"));
      game.physics.arcade.enable(animals03);
      animals03.inputEnabled = true;
      animals03_isAlive=true;
      animals03.body.collideWorldBounds = true;
      animals03.body.setSize(120, 132, 105, 211);
      animals03.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals03.score=10;
      animals03.typeName = "monster";
      animals03.body.collideWorldBounds = false;
      animals03.body.gravity.y = 0;
      jumpaudio05.play();
      }
      
   }


   //*********************************************************$%^*^(*)(*&&^^$#$%%^&*
    function randomimage04(){
    console.log("第二个");
    if (random04 == 1){
    animals04 = animalsgroup04.add(game.make.sprite(475, 756,"catjump"));
    game.physics.arcade.enable(animals04);
    animals04.inputEnabled = true;
      animals04_isAlive=true;
      animals04.body.collideWorldBounds = true;
      animals04.body.setSize(120, 132, 105, 211);
      animals04.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals04.score=10;
      animals04.typeName = "cat";
      animals04.body.collideWorldBounds = false;
      animals04.body.gravity.y = 0;
      jumpaudio01.play();
     
     }

    else if (random04 == 2){
      console.log("game ddddw22222");
    
      animals04 = animalsgroup04.add(game.make.sprite(475, 756,"dogjump"));
      game.physics.arcade.enable(animals04);
      animals04.inputEnabled = true;
      animals04_isAlive=true;
      animals04.body.collideWorldBounds = true;
      animals04.body.setSize(120, 132, 105, 211);
      animals04.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals04.score=10;
      animals04.typeName = "dog";
      animals04.body.collideWorldBounds = false;
      animals04.body.gravity.y = 0;
      jumpaudio02.play();
     
     }
    else if (random04 == 3){
      console.log("game 222222111133333");
      animals04 = animalsgroup04.add(game.make.sprite(475, 756,"chickenjump"));
      game.physics.arcade.enable(animals04);
      animals04.inputEnabled = true;
      animals04_isAlive=true;
      animals04.body.collideWorldBounds = true;
      animals04.body.setSize(120, 132, 105, 211);
      animals04.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals04.score=10;
      animals04.typeName = "chicken";
      animals04.body.collideWorldBounds = false;
      animals04.body.gravity.y = 0;
      jumpaudio03.play();
    }

     else if (random04 == 4){
      console.log("game 222222111144444");
      animals04 = animalsgroup04.add(game.make.sprite(475, 756,"pigjump"));
      game.physics.arcade.enable(animals04);
      animals04.inputEnabled = true;

      animals04_isAlive=true;
      animals04.body.collideWorldBounds = true;
      animals04.body.setSize(120, 132, 105, 211);
      animals04.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals04.score=10;
      animals04.typeName = "pig";
      animals04.body.collideWorldBounds = false;
      animals04.body.gravity.y = 0;
      jumpaudio04.play();

     }
     else if (random04 == 5){
      console.log("game 222222111155555");
      animals04 = animalsgroup04.add(game.make.sprite(475, 756,"monsterjump"));
      game.physics.arcade.enable(animals04);
      animals04.inputEnabled = true;
      animals04_isAlive=true;
      animals04.body.collideWorldBounds = true;
      animals04.body.setSize(120, 132, 105, 211);
      animals04.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals04.score=10;
      animals04.typeName = "monster";
      animals04.body.collideWorldBounds = false;
      animals04.body.gravity.y = 0;
      jumpaudio05.play();
      }
      
   }

   //&*^&%^$&%*&^*()*_(_)(*&^%^%&*^(&*)_+)(((()_+)))
     function randomimage05(){
    console.log("第5个");
    if (random05 == 1){
      animals05 = animalsgroup05.add(game.make.sprite(624, 756,"catjump"));
      game.physics.arcade.enable(animals05);
      animals05.inputEnabled = true;
      animals05_isAlive=true;
      animals05.body.collideWorldBounds = true;
      animals05.body.setSize(120, 132, 105, 211);
      animals05.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals05.score=10;
      animals05.typeName = "cat";
      animals05.body.collideWorldBounds = false;
      animals05.body.gravity.y = 0;
      jumpaudio01.play();
     
     }

    else if (random05 == 2){
      console.log("5game ddddw22222");
    
      animals05 = animalsgroup05.add(game.make.sprite(624, 756,"dogjump"));
      game.physics.arcade.enable(animals05);
      animals05.inputEnabled = true;
      animals05_isAlive=true;
      animals05.body.collideWorldBounds = true;
      animals05.body.setSize(120, 132, 105, 211);
      animals05.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals05.score=10;
      animals05.typeName = "dog";
      animals05.body.collideWorldBounds = false;
      animals05.body.gravity.y = 0;
      jumpaudio02.play();
     
     }
    else if (random05 == 3){
      console.log("5game 222222111133333");
      animals05 = animalsgroup05.add(game.make.sprite(624, 756,"chickenjump"));
      game.physics.arcade.enable(animals05);
      animals05.inputEnabled = true;
      animals05_isAlive=true;
      animals05.body.collideWorldBounds = true;
      animals05.body.setSize(120, 132, 105, 211);
      animals05.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals05.score=100;
      animals05.typeName = "chicken";
      animals05.body.collideWorldBounds = false;
      animals05.body.gravity.y = 0;
      jumpaudio03.play();
    }

     else if (random05 == 4){
      console.log("g5ame 222222111144444");
      animals05 = animalsgroup05.add(game.make.sprite(624, 756,"pigjump"));
      game.physics.arcade.enable(animals05);
      animals05.inputEnabled = true;

      animals05_isAlive=true;
      animals05.body.collideWorldBounds = true;
      animals05.body.setSize(120, 132, 105, 211);
      animals05.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals05.score=10;
      animals05.typeName = "pig";
      animals05.body.collideWorldBounds = false;
      animals05.body.gravity.y = 0;
      jumpaudio04.play();

     }
     else if (random05 == 5){
      console.log("5game 222222111155555");
      animals05 = animalsgroup05.add(game.make.sprite(624, 756,"monsterjump"));
      game.physics.arcade.enable(animals05);
      animals05.inputEnabled = true;
      animals05_isAlive=true;
      animals05.body.collideWorldBounds = true;
      animals05.body.setSize(120, 132, 105, 211);
      animals05.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, true);
      animals05.score=10;
      animals05.typeName = "monster";
      animals05.body.collideWorldBounds = false;
      animals05.body.gravity.y = 0;
      jumpaudio05.play();
      }
      
   }



  function gameScreen(){
    mode = MODE_GAME;
    //移除之前界面所有东西
    game.world.removeAll();
    startaudio.stop();
    //点击start后game界面的屏幕颜色
    //game.stage.backgroundColor = '#FF0000';
   //游戏屏幕的持续时间
    game.time.events.add(Phaser.Timer.SECOND * 30, endScreen);
    gamestart = true;
  //游戏控制部分功能要写在这里


    //游戏物理系统
      game.physics.startSystem(Phaser.Physics.ARCADE); 
      //动画帧数设置？
      game.time.deltaCap = 1/60.;
      //游戏初始分数
      counter = 0

      game.add.sprite(0, 0, 'background');
      game.add.sprite(0, 540, 'block');
      

      animalsgroup = game.add.group();
      animalsgroup02 = game.add.group();
      animalsgroup03 = game.add.group();
      animalsgroup04 = game.add.group();
      animalsgroup05 = game.add.group();


      //调用function
      randomimage();
      randomimage02();
      randomimage03();
      randomimage04();
      randomimage05();


      game.add.sprite(0, 880, 'pot');



     typeText01 = game.add.text(30, 949, randomWord1, {
        font: "47px Arial",
        fill: "#461b05",
        align: "center"
        });

     typeText02 = game.add.text(183, 949, randomWord2, {
        font: "47px Arial",
        fill: "#461b05",
        align: "center"
        });

     typeText03= game.add.text(335, 949, randomWord3, {
        font: "47px Arial",
        fill: "#461b05",
        align: "center"
        });

     typeText04 = game.add.text(489, 949, randomWord4, {
        font: "47px Arial",
        fill: "#461b05",
        align: "center"
        });

     typeText05 = game.add.text(637, 949, randomWord5, {
        font: "47px Arial",
        fill: "#461b05",
        align: "center"
        });

     mouse = game.add.image(game.world.centerX,game.world.centerY,'mouse');
     mouse.anchor.setTo(0.5,0.5);
     deadclick = game.input.keyboard.createCursorKeys();

     //记分显示，放在动物图层前边，防止动物图层遮住分数
      text02 = game.add.text(510, 20, 'SCORE: 0', { 
        font: "40px Arial",
        fill: '#ffffff' ,
        align: "center"
     });
      //倒计时间显示
     timeText = game.add.text(20, 20, "TIME: " + game.time.events.duration, {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
      });

     //backgroundaudio.play();
  }




  function endScreen(){


    mode = MODE_END;
    //移除之前界面所有东西
    game.world.removeAll();
    endaudio.play();
    game.add.sprite(0,0,'cutejumpend');

    game.stage.backgroundColor = '#6551a4';

    var endbutton = game.add.button(224, 800, 'endbuttonImg', startScreen, game, 1, 0, 2, 1);
    //为了保证图标在屏幕正中央，需要测量屏幕中央位置，然后减去图标本身一半的尺寸，就能得到中心点
    endbutton.x = game.world.centerX - endbutton.width/2;
    //结分界面分数显示，需要另建一个text，＋counter是之前的得分，是个变量
    text03 = game.add.text(220, 420, 'SCORE: ' + counter, { 
        font: "70px Arial",
        fill: '#ffffff' ,
        align: "center"
     });


  }



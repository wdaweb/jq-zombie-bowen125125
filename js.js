let score = 0
 let timeleft  = 30
 let progress  = 30
 let zbid = 0
 let alid = 0
 let skid = 0
 let dkid = 0
 let bgmusic = document.getElementById('bgmusic')
 let wow = new Audio()
 wow.src='./sound/yeah.mp3'
 let bow = new Audio()
 bow.src = './sound/bow.mp3'
 let thriller = new Audio()
 thriller.src = './sound/thriller.mp3'
 let spooky = new Audio()
 spooky.src= './sound/spooky.mp3'
 let oh = new Audio()
 oh.src= './sound/oh.mp3'
//  儲存紀錄
const topname = document.getElementById("topname")
const topscore= document.getElementById("topscore")
    let highscore = { name: '', score: 0 }
    let highscoreStorage = JSON.parse(localStorage.getItem('highscore'))
    if(highscoreStorage !== null) {
      highscore = highscoreStorage
      topname.innerText = highscore.name
      topscore.innerText = highscore.score
    }

// 規則
$('#rulebtn').click(function(){
  window.open(`readme.html`,`newwindow`,"height = 550,width = 890, top =250px, left =500px")
})

//  隨機參數
 const rand= (num)=>{
  return Math.floor(Math.random()*num)
 }
//  殭屍移動
const movezombieid = (zbid)=>{
  $(`#zombie${zbid}`).animate({
    left: rand(70)+"%",
    top:  rand(70)+"%"
  },3000,function(){
    movezombieid(zbid)
  })
}
// 外星人移動
const movealienid = (alid)=>{
  $(`#alien${alid}`).animate({
    left: rand(70)+"%",
    top:  rand(70)+"%"
  },3000,function(){
    movealienid(alid)
  })
}
// 骷髏移動
const moveskullid = (skid)=>{
  $(`#skull${skid}`).animate({
    left: rand(70)+"%",
    top:  rand(70)+"%"
  },3000,function(){
    moveskullid(skid)
  })
}
// 鴨子移動
const moveduckid = (dkid)=>{
  $(`#duck${dkid}`).animate({
    left: rand(70)+"%",
    top:  rand(70)+"%"
  },3000,function(){
    moveduckid(dkid)
  })
}


// 遊戲開始
 $('#startbtn').click(function(){
   spooky.pause()
   spooky.load()
   bgmusic.pause()
   thriller.play()
   $('#intro').hide()
   $('#rulebtn').hide()
   $(this).hide()
   $('#game').css('cursor','url(./image/cursor_black.png)')
   //  重設
   progress = 30
   $('#progressbar').val(progress)
   score = 0
   $('#scoretext').text(score)
   timeleft = 30
   $('#timetext').text(timeleft)

   let timer = setInterval(function(){
    // 修改秒數
    timeleft--
    $('#timetext').text(timeleft)
    progress--
    $('#progressbar').val(progress)

    if(timeleft===0){
      clearInterval(timer)
      thriller.pause()
      thriller.load()
      $('#rulebtn').show()
      $('#intro').show()
      $('#startbtn').show()
      progress = 30
      $('#progressbar').val(progress)
      $('#startbtn').attr('disabled',false)
      $('#game img').remove()
      setTimeout(()=>{
        alert(`時間到\n你得到的分數是${score}分`)
      },50)
      // 是否為最高分
      if(highscoreStorage === null || highscore.score < score) {
      
      setTimeout(()=>{
        oh.play()
        setTimeout(()=>{
          const name = prompt('Top Score! Please tell me your name')
          highscore.score = score

          highscore.name = name || 'Player'
    
          localStorage.setItem('highscore', JSON.stringify(highscore))
          topname.innerText = highscore.name
          topscore.innerText = highscore.score
        },50)       
      },1000)             
      }
      spooky.play()
    }
    else{
      // 殭屍
      if(rand(10)>5){
        $('#game').append(`<img src='./image/zombie.gif' id='zombie${zbid}' class='monsterbig'>`)
        $(`#zombie${zbid}`).css({
          left: rand(70)+"%",
          top:  rand(70)+"%"
        })
        movezombieid(zbid)
        zbid++
       
      }
      // 外星人
      if(rand(9)>5){
        $('#game').append(`<img src='./image/alien.gif' id='alien${alid}' class='monstermid'>`)
        $(`#alien${alid}`).css({
          left: rand(70)+"%",
          top:  rand(70)+"%"
        })
        movealienid(alid)
        alid++
    }     
      // 骷髏
      if(rand(7)>5){
          $('#game').append(`<img src='./image/skeleton.gif' id='skull${skid}' class='monstersmall'>`)
          $(`#skull${skid}`).css({
            left: rand(100)+"%",
            top:  rand(100)+"%"
          })
          moveskullid(skid)
          skid++
      }
      // 鴨子
      if(rand(8)>5){
          $('#game').append(`<img src='./image/jack.gif' id='duck${dkid}' class='monstermid'>`)
          $(`#duck${dkid}`).css({
            left: rand(100)+"%",
            top:  rand(100)+"%"
          })
          moveduckid(dkid)
          dkid++
      }  
    }
   },1000)
   })

  // 得分
   $('#game').on("click","img",function(){
    //  殭屍一分
     if($(this).attr("src")==`./image/zombie.gif`){
     
      wow.cloneNode().play()
      $(this).attr('src',`./image/nice.png`)
      $(this).stop(true,false)
      $(this).fadeOut(3000);
      $(this).css({'pointer-events':'none','height':'150px'})
      score++
    
     }
    // 外星人二分
     if($(this).attr("src")==`./image/alien.gif`){
      
      wow.cloneNode().play()
      $(this).attr('src',`./image/nice.png`)
      $(this).stop(true,false)
      $(this).fadeOut(3000);
      $(this).css({'pointer-events':'none','height':'150px'})
      score+=2     
     }
    //  骷髏五分
     if($(this).attr("src")==`./image/skeleton.gif`){
      
      wow.cloneNode().play()
      $(this).attr('src',`./image/nice.png`)
      $(this).stop(true,false)
      $(this).fadeOut(3000);
      $(this).css({'pointer-events':'none','height':'150px'})
      score+=5       
     }
    //  鴨子扣兩分
     if($(this).attr("src")==`./image/jack.gif`){
      bow.cloneNode().play()
      $(this).attr('src',`./image/sad.png`)
      $(this).stop(true,false)
      $(this).fadeOut(3000);
      $(this).css({'pointer-events':'none','height':'150px'})
      score-=2  
      
     }
     $("#scoretext").text(score); 
   })
   


import ddf.minim.*;
import processing.video.*;

PImage screen; 

Minim minim;
Movie myMovie;

AudioPlayer [] song = new AudioPlayer[3];
AudioPlayer groove;

int telaAtual = 1;
String artista;

void setup(){
  //Minim
  minim = new Minim(this);
  song[0] = minim.loadFile("ArticMonkeys/Musica.mp3",2048);
  song[1] = minim.loadFile("Legiao/Musica.mp3",2048);
  song[2] = minim.loadFile("ThePolice/Musica.mp3",2048);
  song[0].setGain(-25);
  song[1].setGain(-45);
  song[2].setGain(-40);

  //misc
  size(600,800,P2D);
  screen = loadImage("/data/menu.jpg");
}

void draw(){
  image(screen,0,0);
  if (telaAtual==1) telaInicial(); // principal
  if (telaAtual==2) telaArtista(); // 1º nível
}

void telaInicial(){
  
}

void telaArtista(){
  
  //Imagem e Video do artista
  if(artista == "Legião Urbana"){ screen = loadImage("/data/legiao_urbana.jpg");}
  if(artista == "The Police"){ screen = loadImage("/data/the_police.jpg");}
  if(artista == "Artic Monkeys"){ screen = loadImage("/data/arctic_monkeys.jpg");}
  image(myMovie,40,350,520,280);
  myMovie.volume(0.05);
  stroke(255);
  for(int i = 1400; i < 2027; i++)
  {
    float x1 = map( i, 0, groove.bufferSize(), 0, width );
    float x2 = map( i+1, 0, groove.bufferSize(), 0, width );
    line( 20, x1 + groove.left.get(i)*50, 20 + groove.left.get(i+1)*50,x2);
    line( 580, x1 + groove.right.get(i)*50, 580 + groove.right.get(i+1)*50,x2 );
  }
  stroke(0);
}

void mouseReleased(){
  //Funções mouse Tela inicial
  if(telaAtual == 1){
    if((mouseX > 90) && (mouseX < 510) &&(mouseY > 335) && (mouseY < 405)){
      artista = "Artic Monkeys";
      telaAtual = 2;
      myMovie = new Movie(this, "ArticMonkeys/video.mp4");
      groove = song[0];
    }
    if((mouseX > 90) && (mouseX < 510) &&(mouseY > 455) && (mouseY < 525)){
      artista = "Legião Urbana";
      telaAtual = 2;
      myMovie = new Movie(this, "Legiao/video.mp4");
      groove = song[1];
    }
    if((mouseX > 90) && (mouseX < 510) &&(mouseY > 575) && (mouseY < 645)){
      artista = "The Police";
      telaAtual = 2;
      myMovie = new Movie(this, "ThePolice/video.mp4");
      groove = song[2];
    }
  }
  
  //Funções mouse tela do artista
  if(telaAtual == 2) {
    
    //Player de música
   if((mouseX > 274) && (mouseX < 326) &&(mouseY > 734) && (mouseY < 786)){
     if(artista == "Artic Monkeys"){
       if(song[0].isPlaying() == true) {
         song[0].pause();
       } else { 
         song[0].play();
       }
     }
     if(artista == "Legião Urbana"){
       if(song[1].isPlaying() == true) {
         song[1].pause();
       } else { 
         song[1].play();
       }
     }
     if(artista == "The Police"){
       if(song[2].isPlaying() == true) {
         song[2].pause();
       } else { 
         song[2].play();
       }
     }
   }
   if((mouseX > 40) && (mouseX < 560) &&(mouseY > 650) && (mouseY < 710)){
     if(artista == "Artic Monkeys"){song[0].play();}
     if(artista == "Legião Urbana"){song[1].play();}
     if(artista == "The Police"){song[2].play();}
   }
   
   //Player do Video
   if((mouseX > 40) && (mouseX < 560) && (mouseY > 350) && (mouseY < 630)){
     
       if(myMovie.isPlaying() == true){
         myMovie.pause();
       }else{
         myMovie.play();
       }
   }
   //Botao de voltar ao inicio
   if((mouseX > 10) && (mouseX < 50) &&(mouseY > 15) && (mouseY < 45)){
      song[0].pause();
      song[1].pause();
      song[2].pause();
      song[0].rewind();
      song[1].rewind();
      song[2].rewind();
      myMovie.stop();
      screen = loadImage("/data/menu.jpg");
      telaAtual = 1;
   }
  }
}

void movieEvent(Movie m) {
  m.read();
}

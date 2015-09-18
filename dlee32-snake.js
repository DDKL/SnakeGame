(function(){
    var canvas = $('#playground')[0] || undefined,
        context = canvas.getContext('2d'),
        snake_array,
        //snake_color = "black",
        snake_size = 3,
        direction_arr = ['left','right','up','down'],
        score;
    var cell_width = 5,
        canvas_width = canvas.width,
        canvas_height = canvas.height;
    var tx, ty;
    var direction;// = direction_arr[1];    
    var run;
    var score_board = $("#score_board");
    
    //functions    
        var init = function(){
               // context.fillStyle = "white";
              //context.fillRect();
              score=0;
              direction = direction_arr[1];
              $(".alert").hide();
              score_board.html(score);
              generate_snake();
              generate_target();
              binding_events();
              if(typeof(run)!=='undefined'){
                       clearInterval(run);
               }
              run = setInterval(paint,100);
            
        },
    
        paint = function(){
              var head_cell;
              var head_x, head_y;
              var nx,ny , splice_i;
              var hit;
              //paint canvas
              context.fillStyle = "white";
              context.fillRect(0,0,canvas_width,canvas_height);
              //draw border 
              context.strokeStyle = "black";
              context.strokeRect(0,0,canvas_width, canvas_height);
              
              //paint target
              context.fillStyle = "black";
              context.strokeStyle = "white";
              context.fillRect(tx*cell_width,ty*cell_width,cell_width,cell_width);
              context.strokeRect(tx*cell_width,ty*cell_width,cell_width,cell_width);
              
              head_cell = snake_array[snake_array.length-1];
              
              head_x = head_cell.x;
              head_y = head_cell.y;
              
              switch(direction){
                  case direction_arr[0] : //left
                      nx = head_cell.x-1;
                      ny = head_cell.y;
                      //splice_i = snake_array.length-1;
                      break;
                  case direction_arr[1] : //right
                      nx = head_cell.x+1;
                      ny = head_cell.y;

                      break;
                  case direction_arr[2] : //up
                      nx = head_cell.x;
                      ny = head_cell.y+1;

                      break;
                  case direction_arr[3] : //down
                      nx = head_cell.x;
                      ny = head_cell.y-1;

                      break;
              }
              
              hit = (function(){
                  var is_hit = false;
                  for(var i=0;i<snake_array.length;i++){
                      if(snake_array[i].x===nx && snake_array[i].y===ny){
                          is_hit = true;
                      }
                  }
                  return is_hit;
              }());
              
             // if snake collides with wall or itself, player loses
              if(nx===-1 || ny===-1 || nx === canvas_width/cell_width || ny === (canvas_height)/cell_width || hit===true){
                  //init();
                  $(".alert").show();
                  $(document).unbind("keydown");
                  return;
              }
              
            //  hit target, add score, push to snake body, reallocate target
              if(nx===tx && ny===ty){
                      score++;
                      snake_array.push({
                          x : tx,
                          y : ty
                      });
                      score_board.html(score);
                      generate_target();
              }
              

             snake_array.splice(0,1);
              
              snake_array.push({
                  x: nx,
                  y: ny
              });
              

              context.fillStyle = "black";
              context.strokeStyle = "white";
              for(var i =0; i < snake_array.length; i++){
                   context.fillRect(snake_array[i].x*cell_width, snake_array[i].y*cell_width ,cell_width,cell_width);
                   context.strokeRect(snake_array[i].x*cell_width, snake_array[i].y*cell_width ,cell_width,cell_width);
              }
              
              
              
        },
    
        generate_snake = function(){
            snake_array = [];
            for(var i=0;i<snake_size;i++){
                snake_array.push({
                    x: i,
                    y: 0
                });
            }
        },
        generate_target = function(){
            tx = Math.round(Math.random()*(canvas_width-cell_width)/cell_width);
            ty = Math.round(Math.random()*(canvas_height-cell_width)/cell_width);
            
            
        },
    //event bindings.
       binding_events = function(){
             $(document).bind("keydown",function(e){
                var code = e.which, index;
                //console.log(code)
                switch(code){
                    case 37:  //left
                        if(direction!=='right'){
                            direction = "left";
                        }
                        break; 
                    case 38 : //down
                        if(direction!=="up"){
                            direction = "down";
                            
                        }
                        break;
                    case 39 :  //right
                        if(direction!=='left'){
                            direction = "right";
                        }
                        break;
                    case 40 :  //up
                        if(direction!=='down'){
                            direction = "up";
                        }
                        break;
                    default : 
                         return;
                        break;
                }
                
            });
            
        }    
     
   
            
        $(".start").bind("click",function(){
             init();
        })
    
})();


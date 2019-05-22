function createEnemies() {
    var rows = [1,0,0,2,2]; 
    for( var i = 0, len = rows.length ; i < len; i++) {
        for(var j = 0; j < 10; j++) {
            var a = rows[i];
            enemies.push( {
                sprite: enemySp[a],
                x: 30 +  j*30 + [0, 4, 0][a],
                y: 30 + i*30,
                w: enemySp[a][0].w,
                h: enemySp[a][0].h
            })
        }
    }
}

function enemyHit() {
    for(var i=0, len = bullets.length; i < len; i++) {
        var b = bullets[i];
        b.update();

        if (b.y + b.h  < 0 || b.y  > display.height) {  
            bullets.splice(i,1);
            i--;
            len--;
            continue;
        }
        

        for(var j = 0, len2 = enemies.length; j<len2; j++) { 
            var a = enemies[j];
            if(AABBIntersect(b.x, b.y, b.w, b.h, a.x, a.y, a.w, a.h)) {
                enemies.splice(j,1);
                j--;
                len2--;
                bullets.splice(i,1);
                i--;
                len--;

                score.innerHTML = scoreText + (scoreCount += scoreConst);

                if(enemies == 0 ) {
                    text.innerHTML = winText; 
                    text.style.color = "green";
                    btn.style.visibility= "visible";
                    update() = false;
                }
            break;
            }    
        }
    }
};

function shipHit() {
    for(var i=0, len = eBullets.length; i < len; i++) {
        var b = eBullets[i];
        b.update();
       
        if(AABBIntersect(b.x, b.y, b.w, b.h, myShip.x, myShip.y, myShip.w, myShip.h)) {
            text.innerHTML = gameOver;
            btn.style.visibility= "visible";
            update() = false;
        }
    }
}

function enemyBullets() {

    if(Math.random() < 0.03 && enemies.length > 0) { 
        var a = enemies[Math.round(Math.random() * (enemies.length - 1))];

        for(var i = 0, len = enemies.length; i<len; i++) {
            var b = enemies[i];

            if(AABBIntersect(a.x,a.y,a.w,100,b.x,b.y,b.w,b.h)) {
                a=b;  
            }
        }
    eBullets.push(new Bullets(a.x + a.w*0.5, a.y + a.h, 4,10,10, "#f00"));  
    }
    
}

function enemyDir() {
    if (frames % lvFrame === 0) { 
        spFrame = (spFrame + 1) % 2;

        var _max_x = 0, _min_x = display.width;

        for (var i = 0, len = enemies.length; i < len; i++) {
            var a = enemies[i];
            a.x += 30 * dir;

            _max_x = Math.max(_max_x, a.x + a.w);
            _min_x= Math.min(_min_x, a.x);
        }

        if (_max_x > display.width -30 || _min_x < 30) {
            dir *= -1;
            for (var i= 0, len = enemies.length; i < len; i++) {
                enemies[i].x += 30 * dir;
                enemies[i].y += 30;

                if (enemies[i].y > display.height - 60) {
                    text.innerHTML = gameOver;
                    btn.style.visibility= "visible";
                    update() = false;
                    break;
                } 
            }  
        }
    } 
}


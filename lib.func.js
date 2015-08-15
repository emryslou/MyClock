function getMyTime()
{
	var nowDate = new Date();
	var hours = nowDate.getHours();
	var minutes = nowDate.getMinutes();
	var seconds = nowDate.getSeconds();

	return formatNum(hours) + ':' + formatNum(minutes) + ':' + formatNum(seconds);
}

function formatNum(num) 
{
	return num < 10 ? '0' + '' + num : num; 
}

function drawBall(cxt, x, y, r, color)
{
	cxt.fillStyle = color;
	cxt.beginPath();
	cxt.arc(x, y, r, 0, 2 * Math.PI, true);
	cxt.closePath();
	cxt.fill();
}

function getRand(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function drawNumber(cxt, num, x, y, color, r = 8, d = 2, blnAddBall)
{
	for(var i = 0; i < digit[num].length; i++)
	{
		for(var j = 0; j < digit[num][i].length; j++)
		{
			digit[num][i][j] == 1 && drawBall(cxt, x + j * 2 * (r + d), y + i * 2 * (r + d) , r, color);
			blnAddBall && addBall(x + j * 2 * (r + d), y + i * 2 * (r + d));
		}
	}
}

function drawTime(strTime, startX, startY)
{
	var color = 'rgb(0, 103, 153)';
	var lastNum = parseInt(strTime[strTime.length - 1]) % 2;
	//cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
	for(var i = 0; i < strTime.length; i++)
	{
		drawNumber(cxt, 
			(
				strTime[i] == ':' ? 10 + lastNum : strTime[i]), 
				startX + 2 * 7 * (radius + diff) * i, 
				startY, color, radius, diff, 
				strTime[i] != lTime[i]
			);
	}
	lTime = strTime;
}

function updateBall(balls, dx, dy, mx = 0, my = 0)
{
	balls.vy += dy;
	balls.vx += dx;

	if (cxt.canvas.height < balls.sy + radius) 
	{
		balls.vy = -1 * ( 1 - my) * balls.vy;
	}

	// if (cxt.canvas.width < balls.sx + radius) 
	// {
	// 	balls.vx = -1 * ( 1 - mx) * balls.vx;
	// }

	balls.sy += balls.vy; 
	balls.sx -= balls.vx;
}

function updateBalls()
{
	for(var i = 0; i < allBall.length; i++) 
	{
		drawBall(cxt, allBall[i].sx, allBall[i].sy, radius, allBall[i].color);
		updateBall(allBall[i], allBall[i].dx, allBall[i].dy, 0.3, 0.4);
		if (allBall[i].sx < 0 || allBall[i].sx >= cxt.canvas.innerWidth) 
		{
			allBall.splice(i,1);
		}
	}
}

function addBall(sx, sy)
{
	var ball = { sx : 0, sy : 0, vx: 0, vy: 0, dx : 0, dy : 0, color: '' };
	ball.sx = sx;
	ball.sy = sy;
	ball.vx =  getRand(-10,10);
	ball.dx =  0.4;
	ball.vy = getRand(-10,10);
	ball.dy = 0.9;
	ball.color = myColor[getRand(0, myColor.length - 1)]
	allBall.push(ball);
}

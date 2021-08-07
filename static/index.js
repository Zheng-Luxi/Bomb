const canvas = document.querySelector("canvas"),
	ctx = canvas.getContext("2d"),
	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	G = .08,
	containers = [],
	stars = [],
	colors = ["#f99","rgb( 255, 152, 0 )","rgb( 192, 225, 96 )"];

let bomb = {
	x : undefined,
	y : undefined,
	vx : undefined,
	vy : undefined,
	clr : undefined
}, star = {
	x : undefined,
	y : undefined
}, container = [],
	isUp = false;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function getRandomBetween( min, max ){	
	return Math.random() * ( max - min + 1 ) + min;
}

function getRandomIntegerBetween( min, max ){	
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

function getRandomBetweenNotZero( min, max ){
	const num = Math.random() * ( max - min + 1 ) + min;
	return num === 0 ? getRandomBetweenNotZero( min, max ) : num;
}

function drawStar(){
	ctx.clearRect( 0, 0, WIDTH, HEIGHT );
	for( let item of stars ){
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.arc( item.x, item.y, 1, 0, Math.PI * 2 );
		ctx.fill();
	}
}

function createBomb(){
	for( let i = 0 ; i < 5 ; i ++ ){
		container = [];

		const x = getRandomBetween( 0, WIDTH ),
			vy = getRandomBetweenNotZero( -7, -10 );

		for( let j = 0 ; j < 50 ; j ++ ){
			bomb.x = x;
			bomb.y = HEIGHT;
			bomb.vx = 0;
			bomb.vy = vy;
			bomb.clr = colors[getRandomIntegerBetween(0,colors.length - 1)];

			container.push( { ... bomb } );
		}

		containers.push( [ ... container ] );
	}
}

for( let i = 0 ; i < 100 ; i ++ ){
	star.x = getRandomBetween( 0, WIDTH );
	star.y = getRandomBetween( 0, HEIGHT );

	stars.push( { ... star } );
}

function playBomb(){
	let timer = setInterval( function(){
		drawStar();
		for( let con of containers ){
			let item = con[0];

			ctx.beginPath();
			ctx.fillStyle = item.clr;
			ctx.arc( item.x, item.y, 3, 0, Math.PI * 2 );
			ctx.fill();

			item.y += item.vy;
			item.vy += G;

			if( item.vy >= 0 ) isUp = true;
		}
		if( isUp ){
			clearInterval( timer );
			for( let con of containers ){
				for( let item of con ){
					item.x = con[0].x;
					item.y = con[0].y;
					item.vx = getRandomBetweenNotZero( -5, 5 );
					item.vy = getRandomBetweenNotZero( -8, 2 );
				}
			}
			timer = setInterval( function(){
				drawStar();
				for( let con of containers ){
					for( let item of con ){

						ctx.beginPath();
						ctx.fillStyle = item.clr;
						ctx.arc( item.x, item.y, 2, 0, Math.PI * 2 );
						ctx.fill();

						item.x += item.vx;
						item.y += item.vy;
						item.vy += G;

					}
				}
			}, 10 );
		}
	}, 10 );
}

window.onload = function(){
	createBomb();
	playBomb();	
}
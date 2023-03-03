window.onload = function() {
	var flutterstyle = document.createElement('style');
	flutterstyle.innerHTML = ".fluttertypertransparent{color: transparent;}";
	document.body.appendChild(flutterstyle);
	
	new flutterTyper("IDofCursor", "IDofTextArea", 250, 100, 100, 50, 250, 1500, ["Message 1", "Message 2", "Message 3", "Etc..."]);
}
//
// Flutter Typer V1.2 by Elliot Moore https://ejmoore.co.uk/
// This message may not be removed unless the script is paid for
//
function flutterTyper(bdom, tdom, bint, tspeed, tfslow, tffast, twempty, twfilled, texts) {
	this.blinkerdom = bdom; // DOM ID of cursor
	this.typedom = tdom; // DOM ID of text area
	this.blinkerinterval = bint; // Cursor blink speed (ms)
	this.typespeed = tspeed; // General typing speed (ms)
	this.typespeedflutterslow = tfslow; // Shorted typing gap random (ms)
	this.typespeedflutterfast = tffast; // Lengthen typing gap random (ms)
	this.waitempty = twempty; // Time to wait before next string (ms)
	this.waitfilled = twfilled; // Time to wait before remove string (ms)
	this.featuredtexts = texts; // Array of strings that are to be typed
	const delay = ms => new Promise(res => setTimeout(res, ms));
	
	this.blinkerflashon = true;
	const blinkerflash = async() => {
		await delay(this.blinkerinterval);
		if (this.blinkerflashon == true) {
			this.blinkerflashon = false;
			document.getElementById(this.blinkerdom).classList.add('fluttertypertransparent');
		} else {
			this.blinkerflashon = true;
			document.getElementById(this.blinkerdom).classList.remove('fluttertypertransparent');
		}
		blinkerflash();
	}
	
	this.featuredtextspos = 0;
	this.featuredtextcurrent = this.featuredtexts[this.featuredtextspos];
	this.featuredtextlength = this.featuredtextcurrent.length;
	document.getElementById(this.typedom).innerHTML = this.featuredtextcurrent;
	const featuredtextchange = async () => {
		await delay(this.waitfilled);
		while (this.featuredtextlength > 0) {
			this.featuredtextcurrent = this.featuredtextcurrent.slice(0,-1);
			this.featuredtextlength = this.featuredtextcurrent.length;
			document.getElementById(this.typedom).innerHTML = this.featuredtextcurrent;
			await delay(this.typespeed-Math.floor((Math.random() * this.typespeedflutterfast+1)+0)+Math.floor((Math.random() * this.typespeedflutterslow+1)+0));
		}
		this.featuredtextspos++;
		if (this.featuredtextspos >= this.featuredtexts.length) {
			this.featuredtextspos = 0;
		}
		this.featuredtextlength = 0;
		await delay(this.waitempty);
		while (this.featuredtextlength < this.featuredtexts[this.featuredtextspos].length) {
			this.featuredtextcurrent = this.featuredtextcurrent + this.featuredtexts[this.featuredtextspos][this.featuredtextlength];
			this.featuredtextlength = this.featuredtextcurrent.length;
			document.getElementById(this.typedom).innerHTML = this.featuredtextcurrent;
			await delay(this.typespeed-Math.floor((Math.random() * this.typespeedflutterfast+1)+0)+Math.floor((Math.random() * this.typespeedflutterslow+1)+0));
		}
		featuredtextchange();
	}
	blinkerflash();
	featuredtextchange();
}
//
// Flutter Typer V1.2 by Elliot Moore https://ejmoore.co.uk/
// This message may not be removed unless the script is paid for
//
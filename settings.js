
var window0;

function param(){
	div=document.createElement('div');
	div.setAttribute("class","window");
	window0=document.body.appendChild(div);
	var html ='<h1>Options</h1><br>'+
		d.sfield('Player 1 has the first turn - Black player','player1')+'<br>'+
		d.sfield('Player2 is the white player','player2')+'<br>'+
		//d.label('Human',app.scores.Human.win+' win '+app.scores.Human.lost+' lost')+'<br>'+
		//d.label('Computer',app.scores.Computer.win+' win '+' '+app.scores.Computer.lost+' lost')+
		'<div class="btnbar">'+
		d.button("Cancel",cloze)+
		d.button("Ok",function(){cloze(true);})+
		'</div>';
	window0.innerHTML=html;
	d.addLink();
	d.pushForm(app.params);
}

function cloze(save){
	if(save){
		d.pullForm(app.params);
		localStorage.player1=app.params.player1;
		localStorage.player2=app.params.player2;
	}
	window0.remove();
}

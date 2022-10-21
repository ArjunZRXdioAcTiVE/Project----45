class Player {
    constructor () {
        this.index = 0;
        this.name;
        this.rank = 0;
        this.score = 0;
        this.positionY = 0;
        this.positionX = 0;
       
        this.opponentName;
        this.opponentIndex;

        this.opponentMessage;
        this.messagesRecieved = 0;
        this.opponentMessages = [];

        this.messagingInfo = createElement("h6")
            .position (width/2 - 450, height/2 - 100)
            .class ("greeting")
        ;
        
        this.messagingInput = createInput ("")
            .attribute("placeholder", "Type Your Message Here")
            .position(width/2 - 100, this.messagingInfo.y + 150)
            .class("messagingInput")
            .hide()
        ;
        
        this.messageButton = createButton("Send")
            .position(width/2 - 75, this.messagingInput.y + 75)
            .class("customButton")  
            .hide ()
        ;
        
        this.messageSetupExecuted = false;
        this.opponentMS = 0;
    }

    trackPlayerCount () {
        var playersRef = firebase.ref ("playerCount");
        playersRef.on ("value", (data) => {
            playerCount = data.val ();
        })
    }

    updatePlayerCount () {
        var playerCountRef = firebase.ref ("/").update({
            playerCount: playerCount,
        });
    }       

    newPlayer () {
        this.index = playerCount;
        this.name = form.nameInput.value ();

        if (this.index == 1) {
            this.positionX = Math.round(width/3 - 300);
            this.opponentIndex = 2;
        }   else {
            this.positionX = width - 160;
            this.opponentIndex = 1;
        }

        var playerInfoC = `players/player${this.index}`;

        firebase.ref (playerInfoC).set ({
            name: this.name,
            rank: 0,
            score: 0,
            angle: 0,
            positionX: this.positionX,
        });

        console.log (`${this.index} ${this.positionX} ${this.name} ${playerCount}`);
    }

    async messagingSetup () {
        var messageReference = await firebase.ref (`players/player${this.opponentIndex}/name`).once("value")
        if (messageReference.exists()) {
            this.opponentName = messageReference.val ();
            // console.log (this.messagingSetup());

            form.greeting.hide ();

            this.messagingInfo.html (`You can now chat with ${this.opponentName}, your opponent`);
            this.messagingInput.show ();
            this.messageButton.show ();
            this.messageButtonClicked ();
            this.messageRecieved ();
        }
    }
    
    messageButtonClicked () { 
        this.messageButton.mouseClicked (() => {
            firebase.ref (`messages/player${this.index}`).set ({
                message : this.messagingInput.value(),
            })
        })   
    }
    
    async messageRecieved () {    
        var messageRecievedReference = await firebase.ref (`messages/player${this.opponentIndex}/message`).once("value");
        
        if (messageRecievedReference.exists()) {
            this.opponentMessage = messageRecievedReference.val();

            if (this.messagesRecieved == 0) {
                var posY = this.messageButton.y;
                
                this.opponentMessages.push(this.opponentMessage);
                
                this.messagesRecieved += 1;
            }   else if (this.messagesRecieved == 1) {
                var posY = this.messageButton.y - 2;
                
                this.opponentMessages.push(this.opponentMessage); 
                
                this.messagesRecieved += 1;
            }   else if (this.messagesRecieved == 3) {
                this.opponentMessages = [];

                var posY = this.messageButton.y;

                this.opponentMessages.push(this.opponentMessage);
                
                this.messagesRecieved = 1;
            }

            var displayMessage = createElement ("h6")
                .html(`${this.opponentName} says: ${this.opponentMessage}`)
                .position(50, posY)
                .class("messaging")
            ;
        }
    }

    
    hideMessage () {
        this.messagingInfo.hide();
        this.messageButton.hide();
        this.messagingInput.hide
    }
}
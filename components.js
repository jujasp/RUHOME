AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
        console.log('CURSOR LISTENER: ', evt.detail.intersection.point)
    })}
})
AFRAME.registerComponent("move",{
    schema : {
      target : { type : "selector"}
    },
    init: function() {
        this.el.addEventListener("click", () => {
            this.data.target.setAttribute("position",  Math.floor(Math.random() * 5) + " " + Math.floor(Math.random() * 5) + " " + Math.floor(Math.random() * 5));
        })
    }
})

AFRAME.registerComponent("respawn",{
    schema : {},
    tick: function () {
        var cameraEl = this.el.sceneEl.camera.el;
        cameraEl.getAttribute('position');
        cameraEl.getAttribute('rotation');
        if(cameraEl.getAttribute('position').y <= -10) {
            cameraEl.setAttribute('position', "0 1.6 0")
        }       
    },
})

AFRAME.registerComponent("foundhome",{
    schema: {},
    init: function () {
        var playerEl = document.querySelector('#camera')
        playerEl.addEventListener('collide', function (e) {
            let collidedObj = e.detail.body.el
            if(collidedObj.id === "yard" || collidedObj.id=== "home") {
                let youWon = document.createElement("a-entity")
                    youWon.setAttribute("text", "value: U R HOME;color:white;width: 300;opacity:0.80")
                    youWon.setAttribute("position", "0 70 -100")
                    document.querySelector('a-scene').appendChild(youWon)  
            }
        })     
    }
})

AFRAME.registerComponent("randommovement",{
    schema: {},
    update: function() {
        this.el.addEventListener("mouseenter", () => {
        let originalPosition = this.el.getAttribute("position")
        let randomAdditions = Math.floor(Math.random()*5) + 1
        randomAdditions *= Math.floor(Math.random()*2) == 1 ? 1 : -1
        let randomNewPosition = {
            x: originalPosition.x + randomAdditions,
            y: originalPosition.y + randomAdditions,
            z: originalPosition.z + randomAdditions
        }

        let newPositionString = randomNewPosition.x + " " + randomNewPosition.y + " " + randomNewPosition.z

        let animation = document.createElement("a-animation")
        animation.setAttribute("attribute", "position")
        animation.setAttribute("direction", "alternate")
        animation.setAttribute("repeat", "indefinite")
        animation.setAttribute("easing", "ease")
        animation.setAttribute("to", newPositionString)
        this.el.appendChild(animation)  
        })
    },
})
AFRAME.registerComponent("collision-register", {
    init: function(){
        var playerEl = document.querySelector('#camera');
        playerEl.addEventListener('collide', function (e) {
        console.log(e.detail.contact.ni);
        })
    }
})

AFRAME.registerComponent("collisionfall", {
    init: function(){
        var playerEl = document.querySelector('#camera');
        playerEl.addEventListener('collide', function (e) {
        
        let collidedObj = e.detail.body.el

        let originalPosition = e.detail.body.el.getAttribute("position")
        let randomNewPosition = {
            x: originalPosition.x,
            y: originalPosition.y,
            z: originalPosition.z
        }

        let newPositionString = randomNewPosition.x + " " + -10 + " " + randomNewPosition.z

        let dropAni = document.createElement("a-animation")
        dropAni.setAttribute("attribute", "position")
        dropAni.setAttribute("direction", "normal")
        dropAni.setAttribute("repeat", "0")
        dropAni.setAttribute("easing", "ease")
        dropAni.setAttribute("to", newPositionString)

        let renewPosStr = randomNewPosition.x + " " + originalPosition.y + " " + randomNewPosition.z

        let renewPos = document.createElement("a-animation")
        renewPos.setAttribute("attribute", "position")
        renewPos.setAttribute("direction", "normal")
        renewPos.setAttribute("repeat", "0")
        renewPos.setAttribute("easing", "ease")
        renewPos.setAttribute("to", renewPosStr)
        
        if(e.detail.contact.ni.y === -1 && (collidedObj.id !== "ground" && collidedObj.id !== "home" && collidedObj.id !== "yard")) {
            setTimeout(function() {
                collidedObj.appendChild(dropAni)
            }, 3000)
        }

        setTimeout(function() {
                collidedObj.appendChild(renewPos)
            }, 10000)


         //   fog="type: linear; color: #e63462; far: 30; near: 0"
        //   e.detail.target.el;  // Original entity (playerEl).
        //   e.detail.body.el;    // Other entity, which playerEl touched.
        //   e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
        //   e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
        })
    }
})


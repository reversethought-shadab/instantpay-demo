function locomotive(){

    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        inertia: .6,
        getDirection: true,
        mobile: {
            breakpoint: 0,  
            smooth: true,
            inertia: .9,
            getDirection: true,
        },
        tablet: {
            breakpoint: 0,  
            smooth: true,
            inertia: 0.9,
            getDirection: true,
        },
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, true) : locoScroll.scroll.instance.scroll.y;
    }, 
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

}
locomotive();

let width = window.innerWidth;

function matter(){

    const matterContainer = document.querySelector("#matter-container");
    const THICCNESS = 60;

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    background: "transparent",
    wireframes: false,
    showAngleIndicator: false
  }
});

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);

if(width>550){
    for (let i = 0; i < 100; i++) {
        let circle = Bodies.circle(i, 10, 30, {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 0.8
        });
        Composite.add(engine.world, circle);
      }
}
if(width<550){
    for (let i = 0; i < 100; i++) {
        let circle = Bodies.circle(i, 10, 17, {
          friction: 0.1,
          frictionAir: 0.00001,
          restitution: .9
        });
        Composite.add(engine.world, circle);
      }
}

var ground = Bodies.rectangle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight + THICCNESS / 2,
  27184,
  THICCNESS,
  { isStatic: true }
);

let leftWall = Bodies.rectangle(
  0 - THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  {
    isStatic: true
  }
);

let rightWall = Bodies.rectangle(
  matterContainer.clientWidth + THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

Composite.add(engine.world, mouseConstraint);


// allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(matterContainer) {
  // set canvas size to new values
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  // reposition ground
  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICCNESS / 2
    )
  );

  // reposition right wall
  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      matterContainer.clientWidth + THICCNESS / 2,
      matterContainer.clientHeight / 2
    )
  );
}

window.addEventListener("resize", () => handleResize(matterContainer));
}
matter();

function rippleEffect(){
    $('#home').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04
      });
    $('#menu').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: .04
      });
    $('#matter-container').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: .04
      });
}

if(width>1200){
    rippleEffect();
}

gsap.from("#matter-container canvas",{
    duration: 3,
    delay: 1.5,
    // rotateX: -100,
    opacity: 0,
    stagger: .2,
    ease: "elastic.out(1, 0.7)",
})
gsap.from("#matter-container>p",{
    duration: 3,
    delay: 2.5,
    rotateX: -100,
    opacity: 0,
    ease: "elastic.out(1, 0.7)",
})
gsap.from("#matter-container>#instantpay>img",{
    duration: 5,
    delay: 3,
    rotateX: -10,
    opacity: 0,
    scale: .8,
    stagger: .2,
    ease: "elastic.out(1, 0.7)",
})
gsap.from("#matter-container>#instantpay>button",{
    duration: 5,
    delay: 3,
    rotateX: -10,
    opacity: 0,
    stagger: .2,
    ease: "elastic.out(1, 0.7)",
})



function loading(){
    gsap.to("#matter-container",{
        duration: 1,
        delay: .5,
        y: "-100vh",
        opacity: 0,
        ease: "power3",
        onCompelete: heroAnimation()
    })
}

if(width>550){
    Shery.mouseFollower({
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        skew: true,
        duration: 1,
    });
    
    Shery.makeMagnet(".hero>.right>.text>a", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
}

function textAnime(){
    Shery.textAnimate(".hero>.left>.bottom>h4", {
        style: 1,
        y: 1,
        delay: 0.05,
        duration: .2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.5,
      });
}
let flag = true;

function lockScroll() {
}

function menu(){
    let menu = document.getElementById("menu");
    let line = document.getElementById("line");
    let line1 = document.getElementById("line1");


    if(flag == true){
        if(width>700){
            menu.style.right = "-150%";
        }
        if(width<700){
            menu.style.right = "-30%";
        }
        line.style.stroke = "#fff";
        line1.style.stroke = "#fff";
        flag = false;
        gsap.to("nav>.right>.menu a, nav>.right>.menu>button",{
            opacity: 1,
            duration: 1.5,
            stagger: .2,
            delay: .7,
            rotateX: 0,
            // x: 50,
            y: -20,
            // scale: 2,
            ease: "power2"
        })
    }
    else{
        menu.style.right = "-2500%";
        line.style.stroke = "#000";
        line1.style.stroke = "#000";
        flag = true;
        gsap.to("nav>.right>.menu a, nav>.right>.menu>button",{
            opacity: 0,
            duration: 1, 
            stagger: .2,
            rotateX: 100,
            // x: 50,
            y: 20,
            delay: .2,
            // scale: 2,
            ease: "power2"
        })
    }
}


let tl = gsap.timeline();

function heroAnimation(){
    tl.from("nav>.logo>img, nav>.right>.hamburger",{
        opacity: 0,
        duration: 2, 
        // y: -50,
        delay: .2,
        stagger: .3,
        scale: 0,
        ease: "expo.out"
    },"hero")
    // .from("nav>.right a, nav>.right>button",{
    //     opacity: 0,
    //     duration: 2, 
    //     stagger: .2,
    //     // x: 50,
    //     y: -50,
    //     delay: .2,
    //     // scale: 2,
    //     ease: "elastic.out(1, 0.8)"
    // },"hero")
    .from(".hero>video",{
        opacity: 0,
        duration: 2, 
        stagger: .2,
        // x: 50,
        y: -50,
        scale: 1.5,
        ease: "elastic.out(1, 0.6)",
        delay: 1.2
    },"hero")
    .from(".hero>.left>.top",{
        opacity: 0,
        duration: 1, 
        stagger: .2,
        delay: .8,
        // x: 50,
        y: 50,
    },"hero")
    .from(".hero>.left>.bottom>h4",{
        opacity: 0,
        onStart: ()=> textAnime(),
        duration: 1, 
        delay: 1.4
    },"hero")
    .from(".hero>.left>.bottom>h1",{
        opacity: 0,
        duration: 2, 
        stagger: .2,
        rotateX: 100,
        delay: 2,
        scale: .9,
        y: 15,
        ease: "elastic.out(1, 0.6)"
    },"hero")
    .from(".hero>.left>.bottom>a",{
        opacity: 0,
        delay: 1,
        duration: 1, 
        // x: 50,
        scale: 0.5,
        ease: "elastic.out(1, 0.8)",
        delay: 2.8
    },"hero")
    .from(".hero>.right>.text",{
        opacity: 0,
        duration: 2, 
        // x: 50,
        stagger: .3,
        y: -50,
        ease: "elastic.out(1, 0.8)",
        delay: 2.8
    },"hero")
}



gsap.from(".scroller ",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".scroller",
        start: "top 70%",
        end: "bottom bottom",
        // markers: true
    },

    opacity: 0,
    scale: 2,
    duration: 2,
    ease: "elastic.out(1, 1.2)"
})

gsap.from(".section2>.container>.text",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section2>.container>.text",
        start: "top 90%",
        end: "bottom bottom",
        // markers: true
    },

    opacity: 0,
    y: 100,
    duration: 2,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section2>.container>.left>video",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section2>.container>.left",
        start: "top 60%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    scale: 2,
    rotate: -125,
    duration: 2,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section2>.container>.right h3",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section2>.container>.left",
        start: "top 60%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    // scale: 1.5,
    rotateX: 10,
    y: 50,
    duration: 2,
    stagger: .1,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section2>.container>.right>button",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section2>.container>.right>button",
        start: "top 85%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    scale: 0.5,
    y: 50,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section3>.left p",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section3>.left p",
        start: "top 75%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    // scale: 0.5,
    stagger: .3,
    y: 50,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section3>.left>button",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section3>.left>p",
        start: "top 65%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    scale: 0.5,
    y: 50,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

function section3TextAnime(){
    Shery.textAnimate(".section3>.right>h4", {
        style: 1,
        y: 1,
        delay: 0.1,
        duration: .2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.5,
      });
}

gsap.from(".section3>.right>h4",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section3>.right>h4",
        start: "top 75%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    onStart: ()=> section3TextAnime(),
    // y: 50,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section3>.right>h1",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section3>.right>h1",
        start: "top 75%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    y: 50,
    delay: .4,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section4>.box",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section4>.box",
        start: "top 75%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    y: 50,
    scale: .8,
    stagger: .2,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section4>.box>button",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section4>.box>button",
        start: "top 85%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    x: 40,
    duration: 1,
    stagger: .2,
    ease: "power3"
})

gsap.from(".section4>.box>video",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section4>.box>video",
        start: "top 90%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    scale: 0,
    duration: 2,
    stagger: .2,
    ease: "elastic.out(1, 0.7)"
})

gsap.from(".section4>.box>h2",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section4>.box>h2",
        start: "top 100%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    x: 50, 
    duration: 2,
    stagger: .2,
    ease: "elastic.out(1, 0.7)"
})

function counter(){
    $(".counter").counterUp({
        delay: 5,
        time: 300,
    });
}

gsap.from(".section5>.box",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section5>.box",
        start: "top 85%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    y: 50, 
    duration: 2,
    stagger: .2,
    ease: "elastic.out(1, 0.7)",
    onStart: ()=> counter(),
})


function section9TextAnime(){
    Shery.textAnimate(".section9>.top>.left>h3", {
        style: 1,
        y: 1,
        delay: 0.1,
        duration: .2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.5,
      });
}

gsap.from(".section9>.top>.left>h3",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section9>.top>.left>h3",
        start: "top 75%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    onStart: ()=> section9TextAnime(),
    // y: 50,
    duration: 1.5,
    ease: "elastic.out(1, 0.8)"
})

gsap.from(".section9>.top>.right>button",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section9>.top>.right>button",
        start: "top 75%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .2,
    y: 25,
    scale: .5,
    duration: 2,
    ease: "elastic.out(1, 0.7)"
})

gsap.from(".section9>.bottom",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section9>.bottom",
        start: "top 80%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    scale: .5,
    duration: 2,
    ease: "elastic.out(1, 0.7)"
})

gsap.to(".section10",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section10",
        start: "top 0%",
        end: "+=100%",
        // markers: true,
        pin: true,
        pinSpacing: false, 
        scrub: 1
    },

    scale: 1.3,
})

gsap.to(".section11>.one",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section11>.one",
        start: "top 0%",
        end: "+=400%",
        // markers: true,
        pin: true,
        pinSpacing: false, 
        scrub: 1
    },

})

gsap.to(".section11>.two",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section11>.two",
        start: "top 0%",
        end: "+=300%",
        // markers: true,
        pin: true,
        pinSpacing: false, 
    },

})
gsap.to(".section11>.three",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section11>.three",
        start: "top 0%",
        end: "+=200%",
        // markers: true,
        pin: true,
        pinSpacing: false, 
    },

})
gsap.to(".section11>.four",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section11>.four",
        start: "top 0%",
        end: "+=100%",
        // markers: true,
        pin: true,
        pinSpacing: false, 
    },

})


const buttons = document.querySelectorAll(".line2>button");

buttons.forEach(button => {
  button.addEventListener("click", function() {
    buttons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
  });
});


gsap.from(".section12>.top h1",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section12>.top h1",
        start: "top 80%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .2,
    y: 50,
    duration: 3,
    ease: "elastic.out(1, 0.7)"
})


gsap.from(".section12>.mid span, .section12>.mid input, .section12>.mid>.line2 button, .section12>.mid>.line5>button",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section12>.mid ",
        start: "top 80%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .1,
    rotateX: 100,
    // y: 50,
    stagger: .1,
    duration: 2,
    ease: "elastic.out(1, 0.7)"
})


gsap.from(".section13>.top>.toBorder>.border",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section13>.top>.toBorder>.border",
        start: "top 70%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .1,
    width: "0%",
    duration: 2,
    ease: "slow(0.7,0.7,false)"
})


gsap.from(".section13>.top>.left img",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section13>.top>.toBorder>.border",
        start: "top 70%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .1,
    scale: .7,
    x: -50,
    stager: .3,
    duration: 3,
    ease: "elastic.out(1, 0.7)"
})


gsap.from(".section13>.top>.right h3, .section13>.top>.right a",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section13>.top>.toBorder>.border",
        start: "top 70%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .1,
    rotateX: 100,
    stager: .3,
    duration: 3,
    ease: "elastic.out(1, 0.7)"
})


gsap.from(".section13>.bottom h3",{
    scrollTrigger: {
        scroller: ".main",
        trigger: ".section13>.top>.toBorder>.border",
        start: "top 70%",
        end: "bottom bottom",
        // markers: true,
    },

    opacity: 0,
    delay: .1,
    rotateX: 100,
    y: 50,
    stager: .3,
    duration: 3,
    ease: "elastic.out(1, 0.7)"
})


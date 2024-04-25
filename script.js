document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var fullHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight >= fullHeight) {
            document.getElementById('footer').classList.add('show');
        } else {
            document.getElementById('footer').classList.remove('show');
        }
    });
});

// JavaScript to highlight transcript text when corresponding video is playing
       document.addEventListener('DOMContentLoaded', function () {
            const video = document.getElementById('video');
            const transcript = document.getElementById('transcript');

            video.addEventListener('timeupdate', function () {
                const currentTime = video.currentTime;
                const paragraphs = transcript.querySelectorAll('p');
                for (let i = 0; i < paragraphs.length; i++) {
                    const startTime = parseFloat(paragraphs[i].getAttribute('data-start'));
                    const endTime = parseFloat(paragraphs[i].getAttribute('data-end'));
                    if (currentTime >= startTime && currentTime <= endTime) {
                        paragraphs[i].classList.add('highlight');
                    } else {
                        paragraphs[i].classList.remove('highlight');
                    }
                }
            });
        });
		
	document.getElementById('navBurger').addEventListener('click', function() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});

/**
 * We'll use a class to control tabbed boxes
 * This way we can have multiple tabbed boxes controlled
 * by multiple instances
 */
class ProcessTabbedBox {
    constructor(divId) {
        console.log(`Initializing tabbed box for ${divId}`);
        this.init(divId);
    }

    init(divId) {
        //get element refs
        this.containerElement = document.getElementById(divId);
        this.tabbedBoxElements = Array.from(
            this.containerElement.querySelectorAll(".process-tabbed-box")
        );

        //create tab objects
        const tabRow = document.createElement('div');
        tabRow.classList.add("process-tabbed-container-tab-row");

        this.tabElements = [];

        //for each tabbed box, create the tab element and add to the tabs row
        this.tabbedBoxElements.forEach((tab, index) => {
            const tabDiv = document.createElement("div");
            tabDiv.classList.add("process-tabbed-box-tab");
            tabDiv.innerText = tab.dataset.title;
            tabRow.appendChild(tabDiv);

            //listen to click to select tab
            tabDiv.addEventListener("click", () => {
                this.selectBox(index);
            });

            this.tabElements.push(tabDiv);
        });

        //add row and process container
        this.containerElement.insertBefore(
            tabRow,
            this.containerElement.firstElementChild
        );
        //mark that we've processed this box and let css rules take over
        this.containerElement.classList.remove("process-tabbed-box-container");
        this.containerElement.classList.add("process-tabbed-box-container-processed");

        //set default to first box
        this.selectBox(0);
    }

    /**
     * Update css classes for the boxes based on new selection
     */
    selectBox(index) {
        console.log(`Selecting box with index ${index}`);

        //for each tab element, use classes to mark it as not selected, except for the newly selected one
        this.tabbedBoxElements.forEach((el, forIndex) => {
            if (forIndex === index) {
                el.classList.add("process-tabbed-box-selected");
                el.classList.remove("process-tabbed-box");
            } else {
                el.classList.remove("process-tabbed-box-selected");
                el.classList.add("process-tabbed-box");
            }
        });

        this.tabElements.forEach((el, forIndex) => {
            if (forIndex === index) {
                el.classList.add("process-tabbed-box-tab-selected");
            } else {
                el.classList.remove("process-tabbed-box-tab-selected");
            }
        });
    }
}

//process the example tabbed box on document load
document.addEventListener("DOMContentLoaded", () => {
    const exampleBox = new ProcessTabbedBox("process-example-box");
    console.log("Example box class instance: ", exampleBox);
});
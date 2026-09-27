// Time

function fetchTime(){
    document.getElementById("local-time").textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).replace(/AM|PM/,"").trim()
    document.getElementById("local-date").textContent = new Date().toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
    })
}

fetchTime()
setInterval(fetchTime,1000)

// Search Engine

const engines = {
    google: {
        query: "https://google.com/search?q=",
        icon: "icons/google-icon.svg",
    },
    bing: {
        query: "https://bing.com/search?q=",
        icon: "icons/bing-icon.svg",
    },
    duckduckgo: {
        query: "https://duckduckgo.com/?q=",
        icon: "icons/duckduckgo-icon.svg",
    },
    brave: {
        query: "https://search.brave.com/search?q=",
        icon: "icons/brave-icon.svg",
    },
    yahoo: {
        query: "https://search.yahoo.com/search?q=",
        icon: "icons/yahoo-icon.svg",
    }
}
const engineButton = document.getElementById("dropdown-button")
const engineButtonIcon = document.getElementById("engine-image")
const searchBar = document.getElementById("search-bar")
const dropdownContent = document.getElementById("dropdown-content")
var curEngine = localStorage.getItem("engine") || "google"

engineButton.addEventListener("click", function(){
    dropdownContent.classList.toggle("transparent")
})

function setEngine(engine){
    engineButtonIcon.src = engines[engine].icon
    searchBar.action = engines[engine].query
    localStorage.setItem("engine",engine)
}

document.querySelectorAll(".engine-selector").forEach(function(selector){
    selector.addEventListener("click", function(){
        curEngine = selector.name
        setEngine(curEngine)
        dropdownContent.classList.toggle("transparent")
    })
})

setEngine(curEngine)

// Pexels Photos

const pexelsAPI = import.meta.env.VITE_PEXELS_API_KEY
const pageNumber = Math.floor(Math.random() * 10) + 1

var curBackgroundImage = localStorage.getItem("backgroundImage") || "url(https://images.pexels.com/photos/13248795/pexels-photo-13248795.jpeg)"
document.body.style.backgroundImage = curBackgroundImage

var lastHour = Number(localStorage.getItem("lastHour")) || new Date().getMinutes() // random images every hour
setInterval(async function(){
    var curHour = new Date().getMinutes()
    if (curHour !== lastHour) {
        lastHour = curHour
        localStorage.setItem("lastHour", toString(curHour))
        
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=green%20nature&per_page=25&page=${pageNumber}`, {
                method: "GET",
                headers: {
                    Authorization: pexelsAPI,
                    Accept: "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP ERROR: status: ${response.status}`)
            }

            const data = await response.json()
            const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)]

            curBackgroundImage = `url(${randomPhoto.src.original})`
            localStorage.setItem("backgroundImage",`url(${randomPhoto.src.original})`)
        } catch(error) {
            console.error("Error getting images from Pexels: ", error)
        }

        document.body.style.backgroundImage = curBackgroundImage
    }
},1000)

// Settings

const settingsButton = document.getElementById("settings-button")
const settingsPage = document.getElementById("settings-page")

settingsButton.addEventListener("click", function(){
    settingsPage.classList.toggle("transparent")
})
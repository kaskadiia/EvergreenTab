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

import { createClient } from "pexels"

const pexelsAPI = import.meta.env.VITE_PEXELS_API_KEY
const client = createClient(pexelsAPI)

client.photos.search({ query: "nature", per_page: 5 }).then(function(response){
  console.log('fetched photos:', response.photos)
})
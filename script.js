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
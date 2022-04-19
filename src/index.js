const getColorBtn = document.getElementById('get-color-btn')
const selectMode = document.getElementById('select-mode')
const colorScheme = document.getElementById("color-scheme")
const colorNames = document.getElementById('color-names')
const colorsCount = document.getElementById('colors-count')
const pickColor = document.getElementById('pick-color')
const darkModeToggle = document.getElementById('gg-dark-mode')

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme")
})

function renderColorSchemes(data) {
    console.log(data.colors)
    for (let i of data.colors) {
        let colorContainer = document.createElement("div")
        let colorEl = document.createElement("div")
        let hexColorName = document.createElement("p")
    
        colorEl.style.backgroundColor = i.hex.value
        hexColorName.innerHTML = i.hex.value
        
        colorScheme.appendChild(colorContainer).classList.add('color-container')
        colorContainer.appendChild(colorEl).classList.add('color-el')
        colorContainer.appendChild(hexColorName).classList.add('hex-names')
        
        colorContainer.addEventListener("click", ()=>{
            let text = document.createElement('input')
            let copiedMessage = document.createElement("span")
            
            copiedMessage.textContent = "Copied to clipboard"
            colorScheme.appendChild(copiedMessage)
            
            document.body.appendChild(text)
            text.value = hexColorName.textContent
            text.select()
            document.execCommand('copy', false)
            text.remove()
            
            setTimeout(() => {
                copiedMessage.remove()
            }, 2000)
        })
    }
}


fetch("https://www.thecolorapi.com/scheme?hex=F55A5A&mode=analogic")
    .then(res => res.json())
    .then(data => renderColorSchemes(data))


getColorBtn.addEventListener("click", () => {
    colorScheme.textContent = ""
    const getColorMode = selectMode.value.toLowerCase()
    const getColorValue = pickColor.value.substring(1)
    const getCount = colorsCount.value
    
    fetch("https://www.thecolorapi.com/scheme?hex="+getColorValue+"&mode="+getColorMode+"&count="+getCount)
        .then(res => res.json())
        .then(data => renderColorSchemes(data))

})